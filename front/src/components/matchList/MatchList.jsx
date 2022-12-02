import React from "react";
import { Link } from "react-router-dom";
import TeamList from "../teamList/TeamList";
import { useParams } from "react-router-dom";
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
                            to={`/match-timeline/${match.match_id}?summonerName=${props.summonerName}`}
                        >
                            <li className="match" key={index}>
                                <div className="match-info">
                                    <h3 className="gametype">
                                        {match.general_data[0].game_type ===
                                        "MATCHED_GAME"
                                            ? "Match classé solo"
                                            : "Match classique"}
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
                                <TeamList champions={ match.general_data[0].champions } summonerName={ params.summonerName } />
                            </li>
                        </Link>
                    );
                })
            }
        </ul>
    </>;
};

export default MatchList;
