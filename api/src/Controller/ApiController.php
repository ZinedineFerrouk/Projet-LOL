<?php

namespace App\Controller;

use App\Entity\Matchs;
use App\Entity\Summoner;
use App\Repository\MatchsRepository;
use App\Repository\SummonerRepository;
use App\Service\ApiService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api')]
class ApiController extends AbstractController
{
    private $apiService;
    private $em;
    private $sr;
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
        $response = $this->apiService->callToRiotApi('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/SPKTRA');
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
        $response = $this->apiService->callToRiotApi('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' . $json['puuid'] . '/ids');
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
            $response = $this->apiService->callToRiotApi('https://europe.api.riotgames.com/lol/match/v5/matches/' . $value . '/timeline');
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

}
