<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiSummonerControllerTest extends WebTestCase
{
    public function testSummoner(): void
    {
        $client = static::createClient();

        // Request a specific page
        $client->request('GET', 'http://127.0.0.1:8000/api/get-summoner/SPKTRA');
        $customer = json_decode($client->getResponse()->getContent());
        $customerExists = false;
        if(count($customer) > 0) {
            $customerExists = true;
        }

        $this->assertEquals(200, $customerExists);
    }
}