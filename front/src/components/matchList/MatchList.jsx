import React from "react";
import { Link, useParams } from "react-router-dom";
import separator from '../../assets/img/teams-separator.svg';
import './MatchList.scss';

const MatchList = (props) => {
    const params = useParams();

	return <>
        <ul className="matchs">
            {
                props.matchs.map((match, index) => {
                    return (
                        <Link
                            key={index}
                            to={`/match-timeline/${match.match_id}`}
                        >
                            <li className="match" key={index}>
                                <div className="match-info">
                                    <h3 className="gametype">
                                        {match.general_data[0].game_type ===
                                        "MATCHED_GAME"
                                            ? "Match classé solo"
                                            : "undefined"}
                                    </h3>
                                    <p className="duration">
                                        Le match a durée{" "}
                                        <span>
                                            {Math.round(
                                                match.general_data[0]
                                                    .game_duration / 60
                                            )}{" "}
                                            minute(s)
                                        </span>
                                    </p>
                                </div>
                                <div className="teams">
                                    <div className="team team-winner">
                                        {match.general_data[0].champions.map(
                                            (champion, index) => {
                                                if (champion.win === true) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={
                                                                champion.summonerName ===
                                                                params.summonerName
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
                                        {match.general_data[0].champions.map(
                                            (champion, index) => {
                                                if (champion.win === false) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={
                                                                champion.summonerName ===
                                                                params.summonerName
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
                            </li>
                        </Link>
                    );
                })
            }
        </ul>
    </>;
};

export default MatchList;
