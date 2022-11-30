import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import './EventList.scss';
import UtilsService from "../../services/Utils";

const EventList = ({ events, current }) => {
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
    const SELECTED_TYPES = [
        'WARD_PLACED',
        'WARD_KILL',
        'LEVEL_UP',
        'SKILL_LEVEL_UP',
        'CHAMPION_KILL',
        'BUILDING_KILL',
        'CHAMPION_SPECIAL_KILL',
        'ELITE_MONSTER_KILL',
        'PAUSE_END',
        'GAME_END'
    ]
    const [currentEvents, setCurrentEvents] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setCurrentEvents([]);
        events.forEach(item => {
            item.events.forEach(event => {
                if(+UTILS_SERVICE.millisToSeconds(+event.timestamp).toFixed(2) <= +UTILS_SERVICE.millisToSeconds(+current).toFixed(2)) {
                    if(SELECTED_TYPES.includes(event.type)) {
                        setCurrentEvents(prev => [event, ...prev]);
                    }
                }
            })
            setIsLoaded(true);
        });
    }, [current]);

    const eventSentence = (item) => {
        let sentence = '';

        switch (item.type) {
            case 'PAUSE_END':
                return sentence = 'Début du match.';

            case 'GAME_END': 
                return sentence = 'Fin du match.';

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
            (currentEvents.length > 0) && (isLoaded) ? (
                currentEvents.map((event, index) => {

                    return (
                        <div key={ index } className="event">
                            <span className="event-time">{ UTILS_SERVICE.millisToMinutesAndSeconds(event.timestamp) }</span>
                            <p className="event-sentence" dangerouslySetInnerHTML={ {__html: eventSentence(event)} }></p>
                        </div>
                    );
                })
            ) : 'no data'
        }
        </div>
    </>;
};

export default EventList;
