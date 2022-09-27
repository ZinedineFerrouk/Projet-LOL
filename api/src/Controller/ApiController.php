<?php

namespace App\Controller;

use App\Entity\Champions;
use App\Entity\Items;
use App\Entity\Matchs;
use App\Entity\Summoner;
use App\Service\ApiService;
use App\Repository\MatchsRepository;
use App\Repository\SummonerRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api', name: 'api')]
class ApiController extends AbstractController
{
    private $apiService;
    private $em;
    private $summonerRepository;
    private $matchsRepository;
    private $api_key;

    public function __construct(ApiService $apiService, ManagerRegistry $em, SummonerRepository $summonerRepository, MatchsRepository $matchsRepository, $api_key = 'RGAPI-b0e55021-0587-4f4a-91a0-2772a031cddd')
    {
        $this->apiService = $apiService;
        $this->em = $em;
        $this->summonerRepository = $summonerRepository;
        $this->matchsRepository = $matchsRepository;
        $this->api_key = $api_key;
    }

    #[Route('/get-all-data', name: 'get-all-data')]
    public function getAllDataFromRiot()
    {
        // Récupère toutes les infos d'un invocateur par NOM
        $response = $this->apiService->callToApi('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/SPKTRA', array('X-Riot-Token: ' . $this->api_key));
        $json = json_decode($response->getContent(), true);
        $puuid = $json['puuid'];

        $summoner = new Summoner();
        $summoner->setSummonerId($json['id']);
        $summoner->setPuuid($puuid);
        $summoner->setName($json['name']);
        $summoner->setProfileIconId($json['profileIconId']);
        $summoner->setSumonnerLevel($json['summonerLevel']);

        $this->em->getManager()->persist($summoner);
        $this->em->getManager()->flush();


        // Récupère les matches par le PUUID
        $response = $this->apiService->callToApi('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' . $json['puuid'] . '/ids', array('X-Riot-Token: ' . $this->api_key));
        $json = json_decode($response->getContent(), true);
        $summoner = $this->summonerRepository->findOneBy(['puuid' => $puuid]);

        for ($i = 0; $i <= 3; $i++) {
            $match[$i] = new Matchs();
            $match[$i]->setMatchId($json[$i]);
            $match[$i]->addSummoner($summoner);
            $summoner->addMatch($match[$i]);

            $this->em->getManager()->persist($match[$i]);
            $this->em->getManager()->persist($summoner);
        }

        $this->em->getManager()->flush();

        foreach ($json as $value) {
            // dd($value);
            $response = $this->apiService->callToApi('https://europe.api.riotgames.com/lol/match/v5/matches/' . $value . '/timeline', array('X-Riot-Token: ' . $this->api_key));
            $json = json_decode($response->getContent(), true);

            $match = $this->matchsRepository->findOneBy(['match_id' => $value]);
            // dd($match);
            if ($match) {
                $match->setData(array($json['info']));
                $this->em->getManager()->persist($match);
            }
        }
        $this->em->getManager()->flush();

        return $response;
    }

    #[Route('/get-items-data', name: 'get-items-data')]
    public function getDataForItems()
    {
        // Récupère les données pour les ITEMS
        $response = $this->apiService->callToApi('https://ddragon.leagueoflegends.com/cdn/12.18.1/data/fr_FR/item.json');
        $json = json_decode($response->getContent(), true);

        foreach ($json['data'] as $key => $value) {
            $item = new Items();
            $item->setItemId($key);
            $item->setName($value['name']);
            $item->setDescription($value['plaintext']);
            $item->setIcon('https://opgg-static.akamaized.net/images/lol/item/' . $key . '.png');

            $this->em->getManager()->persist($item);
            $this->em->getManager()->flush();
        }

        // Récupère les données pour les CHAMPIONS
        $response = $this->apiService->callToApi('https://ddragon.leagueoflegends.com/cdn/12.18.1/data/fr_FR/champion.json');
        $json = json_decode($response->getContent(), true);

        foreach ($json['data'] as $key => $value) {
            $champion = new Champions();
            $champion->setChampionId($key);
            $champion->setIcon('https://opgg-static.akamaized.net/images/lol/champion/' . $key . '.png');

            $this->em->getManager()->persist($champion);
            $this->em->getManager()->flush();
        }

        return $response;
    }
}
