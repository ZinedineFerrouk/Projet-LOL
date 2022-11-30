import React from "react";
import TeamList from "../teamList/TeamList";
import './PlayerList.scss';
import { useLocation } from "react-router-dom";

const PlayerList = ({ players }) => {
    const { search } = useLocation();

    const queryParameters = new URLSearchParams(search);
    let name = queryParameters.get('summonerName');

	return (
        <div className="players-list">
            <TeamList champions={ players } summonerName={ name } />
        </div>
    );
};

export default PlayerList;
