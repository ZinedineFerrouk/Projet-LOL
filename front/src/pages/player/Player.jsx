import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Player.scss";
import { background1, background2, background3, background4, background5 } from '../../assets/img/background.js';
import SummonerService from "../../services/SummonerService";
import MatchService from "../../services/MatchService";

const Player = () => {
    const SUMMONER_SERVICE = new SummonerService();
    const MATCH_SERVICE = new MatchService();
    const params = useParams();
    const [player, setPlayer] = useState({});
    const [matchs, setMatchs] = useState([]);

    const BACKGROUNDS = [
        background1,
        background2,
        background3,
        background4,
        background5
    ];

    // FIXME: Fix call twice !!  

    // const MyComponent = () => {
    //     const [data, setData] = useState({});
    
    //     const loadData = useCallback(() => {
    //         const fetchData = axios.get(`${process.env.REACT_APP_BASE_URL}/get-summoner/SPKTRA`).then(response => {return response.data;});
            
    //         return fetchData;
            
    //     }, []);
        
    //     useEffect(() => {
    //         let dataLoaded = true;
            
    //         const reloadData = () => {
    //             if(dataLoaded) {
    //                 loadData().then(response => setData(response));
    //             }
    //         }
            
    //         reloadData();
            
            
    //         //Clean up function
    //         return () => {
    //             dataLoaded = false;
    //         }
            
    //     }, [loadData]);
    //     return data;
    // }

    // let getData = MyComponent();
    // console.log(getData);

    const fetchSummoner = async () => {

        // Call to API to get one summoner
        await SUMMONER_SERVICE.getOneByName(params.summonerName)
        .then((response) => {
            if(response.data.length > 0) {
                setPlayer(response.data[0]);
            }
        });

    };

    const fetchMatchs = async () => {

        // Call to API to get all matchs
        await MATCH_SERVICE.getAllBySummoner(params.summonerName, player.region)
        .then((response) => {
            if(response.data.length > 0) {
                setMatchs(response.data);
            }
        });

    };

    useEffect(() => {
        document.title = `${params.summonerName} | Mapol: Map Of Legends`;

        fetchSummoner();
        fetchMatchs();
    }, []);

    let backgroundUrl = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

    return (
        <div className="page page-player" style={{
            backgroundImage: `url(${backgroundUrl})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}>
            <div className="overlay overlay-white"></div>
            <div className="container grid-box">
                <div className="box player-info">
                    <h2 className="box-title">Informations</h2>
                    <div className="player-details">
                        <div className="avatar">
                            <img src={ `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${player.icon_id}.jpg` } alt="player icon" />
                        </div>
                        <div className="info">
                            <h3 className="name">{ player.name }</h3>
                            <div className="tags">
                                <span className="tag tag-info region">{ player.region }</span>
                                <span className="tag tag-primary level">LVL { player.summoner_level }</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="box matchs-list">
                    <h2 className="box-title">Liste des matchs</h2>
                    <ul className="matchs">
                        {
                            matchs.map((match, index) => {
                                return (
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

                                            <div className="separator versus">VS</div>

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
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Player;
