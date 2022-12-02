<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiMatchTimeLineControllerTest extends WebTestCase
{

    public function testMatchTimeLine(): void
    {
        $client = static::createClient();

        // Request a specific page
        $client->request('GET', 'http://127.0.0.1:8000/api/get-match-timeline/EUW1_6084581141');
        $match = json_decode($client->getResponse()->getContent());
        $matchExists = false;
        if(count($match) > 0) {
            $matchExists = true;
        }
        $this->assertEquals(200, $matchExists);
    }
}