import React from "react";
import separator from '../../assets/img/teams-separator.svg';
import './TeamList.scss';

const TeamList = (props) => {

	return <>
        <div className="teams">
            <div className="team team-winner">
                {props.champions.map(
                    (champion, index) => {
                        if (champion.win === true) {
                            return (
                                <div
                                    key={index}
                                    className={
                                        champion.summonerName ===
                                        props.summonerName
                                            ? "player player-winner this-player"
                                            : "player player-winner"
                                    }
                                >
                                    <div className="champion-icon">
                                        <img
                                            src={`https://opgg-static.akamaized.net/images/lol/champion/${champion.championName}.png`}
                                            loading="lazy"
                                            alt="champion icon"
                                        />
                                    </div>
                                    <div className="player-info">
                                        <p className="name">
                                            {
                                                champion.summonerName
                                            }
                                        </p>
                                        <p className="champion-name">
                                            à jouer avec{" "}
                                            <span>
                                                {
                                                    champion.championName
                                                }
                                            </span>
                                        </p>
                                        <span className="tag tag-info kda">
                                            {Math.round(
                                                champion.kda *
                                                    100
                                            ) /
                                                100}{" "}
                                            KDA
                                        </span>
                                    </div>
                                </div>
                            );
                        }
                    }
                )}
            </div>

            <div className="separator versus">
                <img src={separator} alt="separator" />
            </div>

            <div className="team team-loser">
                {props.champions.map(
                    (champion, index) => {
                        if (champion.win === false) {
                            return (
                                <div
                                    key={index}
                                    className={
                                        champion.summonerName ===
                                        props.summonerName
                                            ? "player player-loser this-player"
                                            : "player player-winner"
                                    }
                                >
                                    <div className="champion-icon">
                                        <img
                                            src={`https://opgg-static.akamaized.net/images/lol/champion/${champion.championName}.png`}
                                            alt="champion icon"
                                        />
                                    </div>
                                    <div className="player-info">
                                        <p className="name">
                                            {
                                                champion.summonerName
                                            }
                                        </p>
                                        <p className="champion-name">
                                            à jouer avec{" "}
                                            <span>
                                                {
                                                    champion.championName
                                                }
                                            </span>
                                        </p>
                                        <span className="tag tag-info kda">
                                            {Math.round(
                                                champion.kda *
                                                    100
                                            ) /
                                                100}{" "}
                                            KDA
                                        </span>
                                    </div>
                                </div>
                            );
                        }
                    }
                )}
            </div>
        </div>
    </>;
};

export default TeamList;
