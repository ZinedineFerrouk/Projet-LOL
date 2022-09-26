<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\JsonResponse;

class ApiService
{
    private $api_key = 'RGAPI-4f87d86f-2ab4-4e3a-9c98-fd74fe1b78a9';

    public function __construct($api_key) {
        $this->api_key = $api_key;
    }

    // Return Account by Id
    public function getMatchesByPuuid(): JsonResponse
    {
        $url = 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/bos688JIFj4BC75UaqiNKwr2ybYT3scGuL2A9EeIYktT7gq1HQUbQ0FiUeHRBNxYliT5QIiyxze5iA/ids';

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-Riot-Token: ' . $this->api_key));
        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result);
    }
}
