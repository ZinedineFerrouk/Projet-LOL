import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Player.scss";

const Player = () => {

    const params = useParams();
    const [player, setPlayer] = useState({});

    const fakePlayer = {
        id: params.id,
        name: 'MichelLeVrai',
        avatar: 1535,
        level: 152,
        region: 'EUW'
    }
    const fakeMatchs = [
        {
            id: 1,
            gameTime: 1235,
            kda: 12.255445,
            result: 'win',
            champions: [
                {
                    id: 1,
                    name: '',
                    avatar: '',
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
    });

    return (
        <div className="page page-player">
            <div className="container">
                <h1>{ player.name }</h1>
                <div className="box player-info">
                    <h2>Informations</h2>
                    <div className="player-details">

                    </div>
                </div>
                <div className="box matchs-list">
                    <h2>Liste des matchs</h2>
                    <div className="listing">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
