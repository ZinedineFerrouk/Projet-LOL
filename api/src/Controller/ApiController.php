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
use Symfony\Component\HttpFoundation\JsonResponse;

#[Route('/api', name: 'api')]
class ApiController extends AbstractController
{
    private $apiService;
    private $em;
    private $summonerRepository;
    private $matchsRepository;

    public function __construct(ApiService $apiService, ManagerRegistry $em, SummonerRepository $summonerRepository, MatchsRepository $matchsRepository)
    {
        $this->apiService = $apiService;
        $this->em = $em;
        $this->summonerRepository = $summonerRepository;
        $this->matchsRepository = $matchsRepository;
    }

    #[Route('/get-all-data', name: 'get-all-data')]
    public function getAllDataFromRiot()
    {
        // Récupère toutes les infos d'un invocateur par NOM
        $response = $this->apiService->callToApi('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/SPKTRA', array('X-Riot-Token: ' . $this->getParameter('app.api_key')));
        $json = json_decode($response->getContent(), true);
        $puuid = $json['puuid'];

        $summoner = new Summoner();
        $summoner->setSummonerId($json['id']);
        $summoner->setPuuid($puuid);
        $summoner->setName($json['name']);
        $summoner->setProfileIconId($json['profileIconId']);
        $summoner->setSumonnerLevel($json['summonerLevel']);

        // Set la region du summoner
        $response = $this->apiService->callToApi('https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/' . $puuid, array('X-Riot-Token: ' . $this->getParameter('app.api_key')));
        $account = json_decode($response->getContent(), true);
        $tagLine = $account['tagLine'];
        $summoner->setRegion($tagLine);

        $this->em->getManager()->persist($summoner);
        $this->em->getManager()->flush();

        // Récupère les matches par le PUUID
        $response = $this->apiService->callToApi('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' . $json['puuid'] . '/ids', array('X-Riot-Token: ' . $this->getParameter('app.api_key')));
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
            $response = $this->apiService->callToApi('https://europe.api.riotgames.com/lol/match/v5/matches/' . $value . '/timeline', array('X-Riot-Token: ' . $this->getParameter('app.api_key')));
            $json = json_decode($response->getContent(), true);
            $match = $this->matchsRepository->findOneBy(['match_id' => $value]);
            
            if ($match) {
                $match->setData(array($json['info']));
                $this->em->getManager()->persist($match);
            }
        }
        $this->em->getManager()->flush();

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

    #[Route('/get-matchs/summoner/{id}/{region}', name: 'get-matchs-user')]
    public function getMatchsUser(Int $id, String $region)
    {
        $summoner = $this->summonerRepository->findOneBy(['id' => $id, 'region' => $region]);
        if ($summoner) {
            $formatMatchs = [];
            $matchs = $summoner->getMatchs();

            foreach ($matchs as $key => $match) {
                $formatMatchs[] = [
                    "id" => $match->getId(),
                    "match_id" => $match->getMatchId(),
                    "match_data" => $match->getData()
                ];
            }
        }

        return new JsonResponse($formatMatchs);
    }
}
