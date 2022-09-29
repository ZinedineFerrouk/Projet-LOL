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
class ApiController extends AbstractController
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

    #[Route('/get-all-data', name: 'get-all-data')]
    public function getAllDataFromRiot()
    {
        // Récupère toutes les infos d'un invocateur par NOM
        $response = $this->apiService->callToApi('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/SPKTRA', array('X-Riot-Token: ' . $this->getParameter('app.api_key')));
        $json = json_decode($response->getContent(), true);
        $puuid = $json['puuid'];

        $summoner = new Summoner();
        $summoner->setSummonerId($json['id']);
        $summoner->setPuuid($puuid);
        $summoner->setName($json['name']);
        $summoner->setProfileIconId($json['profileIconId']);
        $summoner->setSumonnerLevel($json['summonerLevel']);

        // Set la region du summoner
        $response = $this->apiService->callToApi('https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/' . $puuid, array('X-Riot-Token: ' . $this->getParameter('app.api_key')));
        $account = json_decode($response->getContent(), true);
        $tagLine = $account['tagLine'];
        $summoner->setRegion($tagLine);

        $this->em->getManager()->persist($summoner);
        $this->em->getManager()->flush();

        // Récupère les matches par le PUUID
        $response = $this->apiService->callToApi('https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' . $json['puuid'] . '/ids', array('X-Riot-Token: ' . $this->getParameter('app.api_key')));
        $json = json_decode($response->getContent(), true);
        $summoner = $this->summonerRepository->findOneBy(['puuid' => $puuid]);

        for ($i = 0; $i <= 3; $i++) {
            $match[$i] = new Matchs();
            $match[$i]->setMatchId($json[$i]);
            $match[$i]->addSummoner($summoner);
            $summoner->addMatch($match[$i]);

            $this->em->getManager()->persist($match[$i]);
            $this->em->getManager()->persist($summoner);
        }

        $this->em->getManager()->flush();
        $formatGeneralMatch = [];
        $matchs = $this->matchsRepository->findAll();
        foreach ($matchs as $key => $match) {
            $matchId = $match->getMatchId();
            $responseGeneralMatch = $this->apiService->callToApi('https://europe.api.riotgames.com/lol/match/v5/matches/' . $matchId, array('X-Riot-Token: ' . $this->getParameter('app.api_key')));
            $responseTimeLine = $this->apiService->callToApi('https://europe.api.riotgames.com/lol/match/v5/matches/' . $matchId . '/timeline', array('X-Riot-Token: ' . $this->getParameter('app.api_key')));
            $jsonTimeLine = json_decode($responseTimeLine->getContent(), true);
            $jsonGeneral = json_decode($responseGeneralMatch->getContent(), true);
            $formatChampions = [];
            $champions = $jsonGeneral['info']['participants'];
            foreach ($champions as $champion) {
                $formatChampions[] = [
                    'puuid' => $champion['puuid'],
                    'summonerName' => $champion['summonerName'],
                    'championName' => $champion['championName'],
                    'teamId' => $champion['teamId'],
                    'kda' => $champion['challenges']['kda'],
                    'win' => $champion['win'],
                    'region' => 'EUW'
                ];
                $summoner = $this->summonerRepository->findOneBy(['name' => $champion['summonerName']]);
                if (!$summoner) {
                    $summoner = new Summoner;
                    $summoner->setPuuid($champion['puuid']);
                    $summoner->setName($champion['summonerName']);
                    $summoner->setProfileIconId($champion['profileIcon']);
                    $summoner->setSumonnerLevel($champion['summonerLevel']);
                    $summoner->setSummonerId($champion['summonerId']);
                    $summoner->setRegion('EUW');
                    $this->em->getManager()->persist($summoner);
                }
                $match = $this->matchsRepository->findOneBy(['match_id' => $matchId]);
                if ($match) {
                    $match->addSummoner($summoner);
                    $summoner->addMatch($match);
                    $this->em->getManager()->persist($summoner);
                    $this->em->getManager()->persist($match);
                }
            }
            $this->em->getManager()->flush();
            $formatGeneralMatch[] = [
                'game_duration' => $jsonGeneral['info']['gameDuration'],
                'game_type' => $jsonGeneral['info']['gameType'],
                'champions' => $formatChampions
            ];
            $match = $this->matchsRepository->findOneBy(['match_id' => $matchId]);
            if ($match) {
                $match->setData(array($jsonTimeLine['info']));
                $match->setGeneralData([json_encode($formatGeneralMatch[$key])]);
                $this->em->getManager()->persist($match);
            }
        }
        $this->em->getManager()->flush();

        // Récupère les données pour les ITEMS
        $response = $this->apiService->callToApi('https://ddragon.leagueoflegends.com/cdn/12.18.1/data/fr_FR/item.json');
        $json = json_decode($response->getContent(), true);

        foreach ($json['data'] as $key => $value) {
            $item = new Items();
            $item->setItemId($key);
            $item->setName($value['name']);
            $item->setDescription($value['plaintext']);
            $item->setIcon('https://opgg-static.akamaized.net/images/lol/item/' . $key . '.png');

            $this->em->getManager()->persist($item);
            $this->em->getManager()->flush();
        }

        // Récupère les données pour les CHAMPIONS
        $response = $this->apiService->callToApi('https://ddragon.leagueoflegends.com/cdn/12.18.1/data/fr_FR/champion.json');
        $json = json_decode($response->getContent(), true);

        foreach ($json['data'] as $key => $value) {
            $champion = new Champions();
            $champion->setChampionId($key);
            $champion->setIcon('https://opgg-static.akamaized.net/images/lol/champion/' . $key . '.png');

            $this->em->getManager()->persist($champion);
            $this->em->getManager()->flush();
        }

        return $response;
    }

    #[Route('/get-matchs/summoner/{name}/{region}', name: 'get-matchs-user')]
    public function getMatchsUser(String $name, String $region)
    {
        $summoner = $this->summonerRepository->findOneBy(['name' => $name, 'region' => $region]);
        if ($summoner) {
            $formatMatchs = [];
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

    #[Route('/get-match-timeline/{match_id}', name: 'get-match-timeline')]
    public function getMatchTimeline($match_id)
    {
        $match = $this->matchsRepository->findOneBy(["match_id" => $match_id]);
        dd($match);

        if ($match) {
            $matchTimeline = $match->getData();
        }

        return new JsonResponse($matchTimeline);
    }
}
