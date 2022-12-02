<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiMatchControllerTest extends WebTestCase
{

    public function testMatch(): void
    {
        $client = static::createClient();

        // Request a specific page
        $client->request('GET', 'http://127.0.0.1:8000/api/get-matchs/summoner/SPKTRA/EUW');
        $matchs = json_decode($client->getResponse()->getContent());
        $matchsExists = false;
        if(count($matchs) > 0) {
            $matchsExists = true;
        }

        $this->assertEquals(200, $matchsExists);
    }
}