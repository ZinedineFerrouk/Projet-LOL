<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/api', name: 'api')]
class ApiController extends AbstractController
{
    private $httpClient;

    public function __construct(HttpClientInterface $httpClient) {
        $this->httpClient = $httpClient;
    }

    #[Route('/get-account-by-puuid', name: 'get-account-by-puuid')]
    public function getAccountById(): JsonResponse
    {
        $response = new Response();
        $response->headers->set('X-Riot-Token', 'RGAPI-cd0dfa1f-dddb-473f-8122-53f34da3accb');
        $response->headers->set('Origin', 'https://developer.riotgames.com');
        $response = $this->httpClient->request('GET', 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/bos688JIFj4BC75UaqiNKwr2ybYT3scGuL2A9EeIYktT7gq1HQUbQ0FiUeHRBNxYliT5QIiyxze5iA/ids');
        $responseData = json_decode($response->getContent(), true);
        dd($responseData);

        return $responseData;
    }
}
