<?php

namespace App\Controller;

use App\Service\ApiService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api')]
class ApiController extends AbstractController
{
    private $apiService;

    public function __construct(ApiService $apiService)
    {
        $this->apiService = $apiService;
    }

    #[Route('/get-matches-by-puuid', name: 'get-matches-by-puuid')]
    public function getAccountById(): JsonResponse
    {
        return $this->apiService->callToRiotApi('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/bos688JIFj4BC75UaqiNKwr2ybYT3scGuL2A9EeIYktT7gq1HQUbQ0FiUeHRBNxYliT5QIiyxze5iA/ids');
    }

    #[Route('/get-summoner-by-name', name: 'get-summoner-by-name')]
    public function getSummonerByName(): JsonResponse
    {
        return $this->apiService->callToRiotApi('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/SPKTRA');
    }

    #[Route('/get-matches-by-puuid', name: 'get-matchs-by-puuid')]
    public function getMatchsByPuuid(): JsonResponse
    {
        return $this->apiService->callToRiotApi('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/bos688JIFj4BC75UaqiNKwr2ybYT3scGuL2A9EeIYktT7gq1HQUbQ0FiUeHRBNxYliT5QIiyxze5iA');
    }
}
