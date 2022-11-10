import React from "react";
import './PlayerDetails.scss';

/**
 * HOW TO USE ---
 * 
 * <PlayerDetails player={ player } />
 * 
 * OPTIONS ---
 * player:
 *      type: object
 *      require: yes
 */
export const PlayerDetails = (props) => {

	return <>
        <div className="player-details">
            <div className="avatar">
                <img src={ `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${props.player.icon_id}.jpg` } loading="lazy" alt="player icon" />
            </div>
            <div className="info">
                <h3 className="name">{ props.player.name }</h3>
                <div className="tags">
                    <span className="tag tag-info region">{ props.player.region }</span>
                    <span className="tag tag-primary level">LVL { props.player.summoner_level }</span>
                </div>
            </div>
        </div>
    </>;
};
