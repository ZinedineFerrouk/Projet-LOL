import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Player.scss";
import SummonerService from "../../services/SummonerService";
import MatchService from "../../services/MatchService";
import { useQuery } from "react-query";
import PlayerSkeleton from "../../components/skeletons/PlayerSkeleton";
import MatchesSkeleton from "../../components/skeletons/MatchesSkeleton";
import separator from '../../assets/img/teams-separator.svg';

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
        <div className="page page-player" style={{
            backgroundImage: `linear-gradient(45deg, var(--c-secondary), var(--c-secondary-darker))`,
            backgroundPosition: 'center center',
            backgroundSize: '100% 100%',
          }}>
            {/* <div className="overlay overlay-white"></div> */}
            <div className="container grid-box">
                <div className="box player-info">
                    <h2 className="box-title">Informations</h2>
                    {
                        loadingPlayer ? (
                            
                            <PlayerSkeleton />

                        ) : (

                            <div className="player-details">
                                <div className="avatar">
                                    <img src={ `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${player.icon_id}.jpg` } loading="lazy" alt="player icon" />
                                </div>
                                <div className="info">
                                    <h3 className="name">{ player.name }</h3>
                                    <div className="tags">
                                        <span className="tag tag-info region">{ player.region }</span>
                                        <span className="tag tag-primary level">LVL { player.summoner_level }</span>
                                    </div>
                                </div>
                            </div>

                        )  
                    }
                </div>
                <div className="box matchs-list">
                    <h2 className="box-title">Liste des matchs</h2>

                    {
                        loadingMatches ? (

                            <MatchesSkeleton />

                        ) : (

                            <ul className="matchs">
                                {
                                    matchs.map((match, index) => {
                                        return (
                                            <Link key={index} to={ `/match-timeline/${match.match_id}` }>
                                                <li className="match" key={ index }>
                                                    <div className="match-info">
                                                        <h3 className="gametype">{ match.general_data[0].game_type === 'MATCHED_GAME' ? 'Match classé solo' : 'undefined' }</h3>
                                                        <p className="duration">Le match a durée <span>{ Math.round(match.general_data[0].game_duration / 60) } minute(s)</span></p>
                                                    </div>
                                                    <div className="teams">
                                                        <div className="team team-winner">
                                                            {
                                                                match.general_data[0].champions.map((champion, index) => {
                                                                    if(champion.win === true) {
                                                                        return (
                                                                            <div key={ index } className={champion.summonerName === params.summonerName ? "player player-winner this-player" : "player player-winner"}>
                                                                                <div className="champion-icon">
                                                                                    <img src={`https://opgg-static.akamaized.net/images/lol/champion/${champion.championName}.png`} loading="lazy" alt="champion icon" />
                                                                                </div>
                                                                                <div className="player-info">
                                                                                    <p className="name">{ champion.summonerName }</p>
                                                                                    <p className="champion-name">à jouer avec <span>{ champion.championName }</span></p>
                                                                                    <span className="tag tag-info kda">{ Math.round(champion.kda * 100) / 100 } KDA</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </div>

                                                        <div className="separator versus"><img src={ separator } alt="separator" /></div>

                                                        <div className="team team-loser">
                                                            {
                                                                match.general_data[0].champions.map((champion, index) => {
                                                                    if(champion.win === false) {
                                                                        return (
                                                                            <div key={ index } className={champion.summonerName === params.summonerName ? "player player-loser this-player" : "player player-winner"}>
                                                                                <div className="champion-icon">
                                                                                    <img src={`https://opgg-static.akamaized.net/images/lol/champion/${champion.championName}.png`} alt="champion icon" />
                                                                                </div>
                                                                                <div className="player-info">
                                                                                    <p className="name">{ champion.summonerName }</p>
                                                                                    <p className="champion-name">à jouer avec <span>{ champion.championName }</span></p>
                                                                                    <span className="tag tag-info kda">{ Math.round(champion.kda * 100) / 100 } KDA</span>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                            </Link>
                                        )
                                    })
                                }
                            </ul>

                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Player;
