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
class ApiMatchTimeLineController extends AbstractController
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

    #[Route('/get-match-timeline/{match_id}', name: 'get-match-timeline')]
    public function getMatchTimeline($match_id)
    {
        $match = $this->matchsRepository->findOneBy(["match_id" => $match_id]);
        $matchTimeline = [];
        if ($match) {
            $matchTimeline = $match->getData();
        }

        return new JsonResponse($matchTimeline);
    }

    #[Route('/get-match-details/{match_id}', name: 'get-match-details')]
    public function getMatchDetails($match_id)
    {
        $match = $this->matchsRepository->findOneBy(["match_id" => $match_id]);

        if ($match) {
            $matchDetails = $match->getData();
            $matchGeneralData = $match->getGeneralData();

            $formattedDataMatch = [];
            for ($i = 0; $i < count($matchGeneralData[0]['champions']); $i++) {
                $formattedDataMatch['playersInfo'][] = [
                    'kda' => $matchGeneralData[0]['champions'][$i]['kda'],
                    'win' => $matchGeneralData[0]['champions'][$i]['win'],
                    'puuid' => $matchGeneralData[0]['champions'][$i]['puuid'],
                    'region' => $matchGeneralData[0]['champions'][$i]['region'],
                    'teamId' => $matchGeneralData[0]['champions'][$i]['teamId'],
                    'championName' => $matchGeneralData[0]['champions'][$i]['championName'],
                    'summonerName' => $matchGeneralData[0]['champions'][$i]['summonerName'],
                    'participantId' => $matchDetails[0]['participants'][$i]['participantId'],
                ];
            }
        }
        $formattedDataMatch['timeline'] = ['frames' => $matchDetails[0]['frames']];

        return new JsonResponse($formattedDataMatch);
    }
}
