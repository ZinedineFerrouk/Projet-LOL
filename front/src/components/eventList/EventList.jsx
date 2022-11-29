import React, { useEffect, useState } from "react";
import './EventList.scss';
import UtilsService from "../../services/Utils";

const EventList = (props) => {
    const UTILS_SERVICE = new UtilsService();
    const WARDS = {
        "CONTROL_WARD": 'Balise de contrôle',
        "SIGHT_WARD": 'Balise de vision',    
        "YELLOW_TRINKET": 'Babiole jaune',
    }
    const LANE_TYPE = {
        "TOP_LANE": 'Top',
        "MID_LANE": 'Mid',
        "BOT_LANE": 'Bot',
        "JUNGLE": 'Jungle',
    }
    const MONSTER_TYPE = {
        "BARON_NASHOR": 'Baron Nashor',
        "DRAGON": 'Dragon',
        "RIFTHERALD": 'Héraut de la Faille',
    }

    useEffect(() => {
        
    }, []);
    

    const eventSentence = (item) => {
        let sentence = '';

        switch (item.type) {
            case 'SKILL_LEVEL_UP':
                return sentence = `
                    <span class="event-sentence__actor">${item.participantId}</span> 
                    a gagné un niveau en 
                    <span class="event-sentence__skill">${item.skillSlot}</span>.
                `;

            case 'CHAMPION_KILL':
                return sentence = `
                    <span class="event-sentence__actor">${item.killerId}</span> 
                    a tué 
                    <span class="event-sentence__victime">${item.victimId}</span>.
                `;

            case 'LEVEL_UP':
                return sentence = `
                    <span class="event-sentence__actor">${item.participantId}</span> 
                    a atteint le niveau ${item.level}.
                `;

            case 'TURRET_PLATE_DESTROYED':
                return sentence = `
                    <span class="event-sentence__actor">${item.killerId}</span> 
                    a détruit une tourelle à 
                    <span>${LANE_TYPE[item.laneType]}</span>.
                `;

            case 'ITEM_PURCHASED':
                return sentence = `
                    <span class="event-sentence__actor">${item.participantId}</span> 
                    a acheté 
                    <img src="https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/${item.itemId}.png"/>.
                `;

            case 'ITEM_DESTROYED':
                return sentence = `
                    <span class="event-sentence__actor">${item.participantId}</span> 
                    a détruit 
                    <img src="https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/${item.itemId}.png"/>.
                `;

            case 'ITEM_UNDO':
                return sentence = `
                    <span class="event-sentence__actor">${item.participantId}</span> 
                    a annulé l'achat de 
                    <img src="https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/${item.itemId}.png"/>.
                `;

            case 'WARD_PLACED':
                return sentence = `
                    <span class="event-sentence__actor">${item.creatorId}</span> 
                    a placé une 
                    <span class="event-sentence__ward">${WARDS[item.wardType]}</span>.
                `;

            case 'WARD_KILL':
                return sentence = `
                    <span class="event-sentence__actor">${item.killerId}</span> 
                    a détruit une 
                    <span class="event-sentence__ward">${WARDS[item.wardType]}</span>.
                `;

            case 'ELITE_MONSTER_KILL':
                return sentence = `
                    <span class="event-sentence__actor">${item.killerId}</span> 
                    a tué un 
                    <span class="event-sentence__monster">${MONSTER_TYPE[item.monsterType]}</span>.
                `;

            default:
                return sentence = 'Aucune information sur cet évènement';
        }
    }

	return <>
        <div className="events-list">
        {
            props.events.map((event, index) => {
                // console.log(event);

                return (
                    event.type !== 'ITEM_UNDO' &&
                    <div key={ index } className="event">
                        <span className="event-time">{ UTILS_SERVICE.millisToMinutesAndSeconds(event.timestamp) }</span>
                        <p className="event-sentence" dangerouslySetInnerHTML={ {__html: eventSentence(event)} }></p>
                    </div>
                );
            })
        }
        </div>
    </>;
};

export default EventList;
