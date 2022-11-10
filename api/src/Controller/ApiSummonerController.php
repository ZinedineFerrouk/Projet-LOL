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
class ApiSummonerController extends AbstractController
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

    #[Route('/get-summoner/{name}', name: 'get-summoner')]
    public function getSummonerByName($name)
    {
        $summoners = $this->summonerRepository->findByName($name);
        $formatSummoner = [];
        if ($summoners) {
            foreach ($summoners as $summoner) {
                $formatSummoner[] = [
                    'puuid' => $summoner->getPuuid(),
                    'name' => $summoner->getName(),
                    'summoner_level' => $summoner->getSumonnerLevel(),
                    'summoner_id' => $summoner->getSummonerId(),
                    'region' => $summoner->getRegion(),
                    'icon_id' => $summoner->getProfileIconId()
                ];
            }
        }

        return new JsonResponse($formatSummoner);
    }
}
