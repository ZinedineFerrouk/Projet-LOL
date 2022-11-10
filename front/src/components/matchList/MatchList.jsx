import React from "react";
import { Link } from "react-router-dom";
import TeamList from "../teamList/TeamList";
import './MatchList.scss';

const MatchList = (props) => {

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
                                <TeamList champions={ match.general_data[0].champions } />
                            </li>
                        </Link>
                    );
                })
            }
        </ul>
    </>;
};

export default MatchList;
