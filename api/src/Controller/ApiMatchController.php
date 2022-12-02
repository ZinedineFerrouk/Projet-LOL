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
class ApiMatchController extends AbstractController
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

    #[Route('/get-matchs/summoner/{name}/{region}', name: 'get-matchs-user')]
    public function getMatchsUser(String $name, String $region)
    {
        $summoner = $this->summonerRepository->findOneBy(['name' => $name, 'region' => $region]);
        $formatMatchs = [];
        if ($summoner) {
            $matchs = $summoner->getMatchs();
            foreach ($matchs as $match) {
                $formatMatchs[] = [
                    "id" => $match->getId(),
                    "match_id" => $match->getMatchId(),
                    "general_data" => $match->getGeneralData()
                ];
            }
        }
        return new JsonResponse($formatMatchs);
    }
}