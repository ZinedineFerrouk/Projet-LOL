<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\JsonResponse;

class ApiService
{
    // Return Account by Id
    public function callToRiotApi(string $url): JsonResponse
    {
        $api_key = 'RGAPI-b0e55021-0587-4f4a-91a0-2772a031cddd';

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-Riot-Token: ' . $api_key));
        $result = curl_exec($ch);
        curl_close($ch);

        return new JsonResponse(json_decode($result));
    }
}
