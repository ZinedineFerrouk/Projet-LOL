import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Player.scss";
import SummonerService from "../../services/SummonerService";
import MatchService from "../../services/MatchService";
import { useQuery } from "react-query";
import PlayerSkeleton from "../../components/skeletons/PlayerSkeleton";
import MatchesSkeleton from "../../components/skeletons/MatchesSkeleton";
import { PlayerDetails } from "../../components/playerDetails/PlayerDetails";
import MatchList from "../../components/matchList/MatchList";

const Player = () => {
    const SUMMONER_SERVICE = new SummonerService(); 
    const MATCH_SERVICE = new MatchService();
    const params = useParams();
    const [loadingPlayer, setLoadingPlayer] = useState(true);
    const [loadingMatches, setLoadingMatches] = useState(true);
    const [player, setPlayer] = useState({});
    const [matchs, setMatchs] = useState([]);
    
    
    useEffect(() => {
        document.title = `${params.summonerName} | Mapol: Map Of Legends`;
    }, []);

    let playersByMatch = [];

    // Get player data
    useQuery(["player"], async () => {
        const response = await SUMMONER_SERVICE.getOneByName(params.summonerName);

        if(response.data.length > 0) {
            setLoadingPlayer(false);
            setPlayer(response.data[0]);
        }
    })

    // Get matchs data
    useQuery(["matchs"], async () => {
        const response = await MATCH_SERVICE.getAllBySummoner(params.summonerName, 'EUW');

        if (response.data.length > 0) {
            setLoadingMatches(false);
            setMatchs(response.data);
        }
    })

    for (let i = 0; i < matchs.length; i++) {
        const playerData = matchs[i].general_data[0].champions;

        playersByMatch.push({
            playersData: playerData
        });
    }

    return (
        <div data-testid="page-player" className="page page-player" style={{
            backgroundImage: `linear-gradient(45deg, var(--c-secondary), var(--c-secondary-darker))`,
            backgroundPosition: 'center center',
            backgroundSize: '100% 100%',
          }}>
            {/* <div className="overlay overlay-white"></div> */}
            <div className="container grid-box">
                <div className="box player-info">
                    <h2 className="info-title box-title">Informations</h2>
                    {
                        loadingPlayer ?
                            <PlayerSkeleton />
                        :
                            <PlayerDetails player={ player } />
                    }
                </div>
                <div className="box matchs-list">
                    <h2 className="box-title">Liste des matchs</h2>
                    {
                        loadingMatches ?
                            <MatchesSkeleton />
                        :
                            <MatchList matchs={ matchs } summonerName={ params.summonerName } />
                    }
                </div>
            </div>
        </div>
    );
};

export default Player;
