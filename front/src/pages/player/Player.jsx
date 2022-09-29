import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Player.scss";
import { background1, background2, background3, background4, background5 } from '../../assets/img/background.js';

const Player = () => {

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

    const fakePlayer = {
        id: 1,
        name: params.summonerName,
        icon: 1621,
        level: 152,
        region: 'EUW'
    }
    const fakeMatchs = [
        {
            id: 1,
            gameDuration: 1235,
            gameType: 'MATCHED_GAME',
            participants: [
                {
                    puuid: 1,
                    summonerName: 'Elikopter',
                    championName: 'Renekton', // Irelia
                    teamId: 100,
                    kda: 2.3333333333355,
                    win: true
                },
                {
                    puuid: 2,
                    summonerName: 'Bulldozer54',
                    championName: 'Irelia', // Irelia
                    teamId: 100,
                    kda: 2.3333333333355,
                    win: true
                },
                {
                    puuid: 3,
                    summonerName: 'Ary_bot',
                    championName: 'Irelia', // Irelia
                    teamId: 100,
                    kda: 2.3333333333355,
                    win: true
                },
                {
                    puuid: 4,
                    summonerName: params.summonerName,
                    championName: 'Renekton', // Irelia
                    teamId: 100,
                    kda: 2.3333333333355,
                    win: true
                },
                {
                    puuid: 5,
                    summonerName: 'Eivor',
                    championName: 'Renekton', // Irelia
                    teamId: 100,
                    kda: 2.3333333333355,
                    win: true
                },
                {
                    puuid: 6,
                    summonerName: 'Ezio',
                    championName: 'Irelia', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: false
                },
                {
                    puuid: 7,
                    summonerName: 'Connor',
                    championName: 'Renekton', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: false
                },
                {
                    puuid: 8,
                    summonerName: 'Desmond',
                    championName: 'Renekton', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: false
                },
                {
                    puuid: 9,
                    summonerName: 'Altair',
                    championName: 'Irelia', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: false
                },
                {
                    puuid: 10,
                    summonerName: 'Bayek',
                    championName: 'Renekton', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: false
                }
            ]
        },
        {
            id: 2,
            gameDuration: 1262,
            gameType: 'MATCHED_GAME',
            participants: [
                {
                    puuid: 1,
                    summonerName: 'Elikopter',
                    championName: 'Renekton', // Irelia
                    teamId: 100,
                    kda: 2.3333333333355,
                    win: false
                },
                {
                    puuid: 2,
                    summonerName: params.summonerName,
                    championName: 'Renekton', // Irelia
                    teamId: 100,
                    kda: 2.3333333333355,
                    win: false
                },
                {
                    puuid: 3,
                    summonerName: 'Elikopter',
                    championName: 'Irelia', // Irelia
                    teamId: 100,
                    kda: 2.3333333333355,
                    win: false
                },
                {
                    puuid: 4,
                    summonerName: 'Elikopter',
                    championName: 'Renekton', // Irelia
                    teamId: 100,
                    kda: 2.3333333333355,
                    win: false
                },
                {
                    puuid: 5,
                    summonerName: 'Elikopter',
                    championName: 'Irelia', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: false
                },
                {
                    puuid: 6,
                    summonerName: 'Elikopter',
                    championName: 'Renekton', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: true
                },
                {
                    puuid: 7,
                    summonerName: 'Elikopter',
                    championName: 'Renekton', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: true
                },
                {
                    puuid: 8,
                    summonerName: 'Elikopter',
                    championName: 'Renekton', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: true
                },
                {
                    puuid: 9,
                    summonerName: 'Elikopter',
                    championName: 'Irelia', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: true
                },
                {
                    puuid: 10,
                    summonerName: 'Elikopter',
                    championName: 'Irelia', // Irelia
                    teamId: 200,
                    kda: 2.3333333333355,
                    win: true
                }
            ]
        }
    ]

    useEffect(() => {
        // Call to API

        // Set Player to State
        if(Object.keys(player).length === 0) {
            setPlayer(fakePlayer);
        }
        // Set Matchs to State
        if(Object.keys(matchs).length === 0) {
            setMatchs(fakeMatchs);
        }
    });

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
                            <img src={ `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${player.icon}.jpg` } alt="player icon" />
                        </div>
                        <div className="info">
                            <h3 className="name">{ player.name }</h3>
                            <div className="tags">
                                <span className="tag tag-info region">{ player.region }</span>
                                <span className="tag tag-primary level">LVL { player.level }</span>
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
                                            <h3 className="gametype">{ match.gameType === 'MATCHED_GAME' ? 'Match classé solo' : 'undefined' }</h3>
                                            <p className="duration">Le match a durée <span>{ Math.round(match.gameDuration / 60) } minute(s)</span></p>
                                        </div>
                                        <div className="teams">
                                            <div className="team team-winner">
                                                {
                                                    match.participants.map((participant, index) => {
                                                        if(participant.win === true) {
                                                            return (
                                                                <div key={ index } className={participant.summonerName === params.summonerName ? "player player-winner this-player" : "player player-winner"}>
                                                                    <div className="champion-icon">
                                                                        <img src={`https://opgg-static.akamaized.net/images/lol/champion/${participant.championName}.png`} alt="champion icon" />
                                                                    </div>
                                                                    <div className="player-info">
                                                                        <p className="name">{ participant.summonerName }</p>
                                                                        <p className="champion-name">à jouer avec <span>{ participant.championName }</span></p>
                                                                        <span className="tag tag-info kda">{ Math.round(participant.kda * 100) / 100 } KDA</span>
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
                                                    match.participants.map((participant, index) => {
                                                        if(participant.win === false) {
                                                            return (
                                                                <div key={ index } className={participant.summonerName === params.summonerName ? "player player-loser this-player" : "player player-winner"}>
                                                                    <div className="champion-icon">
                                                                        <img src={`https://opgg-static.akamaized.net/images/lol/champion/${participant.championName}.png`} alt="champion icon" />
                                                                    </div>
                                                                    <div className="player-info">
                                                                        <p className="name">{ participant.summonerName }</p>
                                                                        <p className="champion-name">à jouer avec <span>{ participant.championName }</span></p>
                                                                        <span className="tag tag-info kda">{ Math.round(participant.kda * 100) / 100 } KDA</span>
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
