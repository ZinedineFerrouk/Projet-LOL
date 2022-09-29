<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\JsonResponse;

class ApiService
{
    // Return Account by Id
    public function callToApi(string $url, array $optionnal = []): JsonResponse
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FAILONERROR, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $optionnal);
        $result = curl_exec($ch);

        $error_msg = "";
        if (curl_errno($ch)) {
            $error_msg = curl_error($ch);
            return new JsonResponse($error_msg);
        }
        curl_close($ch);

        return new JsonResponse(json_decode($result));
    }

}
