import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import match_map from "../../assets/img/map/map.webp";
import "./Map.scss";
import playIcon from '../../assets/img/icons/play-circle-line.svg';
import stopIcon from '../../assets/img/icons/stop-circle-line.svg';
import pauseIcon from '../../assets/img/icons/pause-circle-line.svg';
import Button from "../button/Button";
import UtilsService from "../../services/Utils";
import MatchService from './../../services/MatchService';
import killIcon from '../../assets/img/map/kill-icon.png';
import dragonIcon from '../../assets/img/map/dragon-icon.png';
import baronIcon from '../../assets/img/map/baron-icon.png';
import riftIcon from '../../assets/img/map/baron-icon.png';
import turretIcon from '../../assets/img/map/turret-icon.png';

const Map = ({ events, current, toggleMapStatus, stopMap, dragProgressbar, map, getVelocity }) => {
    const [totalGameTime, setTotalGameTime] = useState(0);
    const [timeline, setTimeline] = useState([]);
    const MATCH_SERVICE = new MatchService;
    const UTILS_SERVICE = new UtilsService;
    const SELECTED_TYPES = [
        // 'WARD_PLACED',
        // 'WARD_KILL',
        'CHAMPION_KILL',
        'BUILDING_KILL',
        'TURRET_PLATE_DESTROYED',
        'CHAMPION_SPECIAL_KILL',
        'ELITE_MONSTER_KILL',
    ];
    const NOT_SPECIAL_KILL = [
        "KILL_FIRST_BLOOD"
    ];

    useEffect(() => {
        setTotalGameTime(events.at(-1).timestamp);
        setTimeline((prev) => {
            let array = [];

            events.forEach(element => {
                element.events.forEach((event) => {
                    if(+UTILS_SERVICE.millisToSeconds(+event.timestamp).toFixed(2) <= +UTILS_SERVICE.millisToSeconds(+current).toFixed(2)) {
                        if(SELECTED_TYPES.includes(event.type) && !NOT_SPECIAL_KILL.includes(event.killType)) {
                            array.push(event);
                        }
                    }
                });
            });
            return array;
        });
    }, [current]);

    const switchEventType = (el) => {
        switch(el.type) {
            case 'CHAMPION_KILL': 
                return `<img src="${killIcon}" alt="kill" />`;
                
            case 'BUILDING_KILL': 
                return `<img src="${killIcon}" alt="kill" />`;

            case 'TURRET_PLATE_DESTROYED': 
                return `<img src="${turretIcon}" alt="kill" />`;

            case 'CHAMPION_SPECIAL_KILL': 
                return `<img src="${killIcon}" alt="kill" />`;

            case 'ELITE_MONSTER_KILL': 
                if(el.monsterType === "DRAGON") {
                    return `<img src="${dragonIcon}" alt="kill" />`;
                } else if(el.monsterType === "BARON_NASHOR") {
                    return `<img src="${baronIcon}" alt="kill" />`;
                } else if(el.monsterType === "RIFTHERALD") {
                    return `<img src="${riftIcon}" alt="kill" />`;
                } else {
                    return `<img src="${dragonIcon}" alt="kill" />`;
                }
        }
    }

  return (
    <div className="map__container">
        <div className="map__image">
            {
                timeline.map((event, index) => {
                    return (
                        <div
                            key={index}
                            className="point"
                            style={{
                            left: (event.position.x * 100) / 15000 + "%",
                            bottom: (event.position.y * 100) / 15000 + "%",
                            }}
                        >
                            <div dangerouslySetInnerHTML={ {__html: switchEventType(event)} }></div>
                        </div>
                    );
                })
            }
            <img ref={ map } id="map" className="lol_map" src={match_map} />
        </div>
        <div className="map__controls">
            <div className="buttons">
                <Button id="play" title="Lecture" onClick={ toggleMapStatus }>
                    <img id="play-icon" src={ playIcon } alt="play" />
                </Button>
                <Button id="stop" title="Stop" onClick={ stopMap }>
                    <img src={ stopIcon } alt="stop" />
                </Button>
                <select defaultValue={ 1 } onChange={ getVelocity } name="velocity" id="velocity">
                    <option value={ 1 }>x1</option>
                    <option value={ 2 }>x2</option>
                    <option value={ 5 }>x5</option>
                    <option value={ 10 }>x10</option>
                </select>
            </div>
            <input
                type="range"
                className="progressbar"
                id="progressbar"
                min="0"
                max={ totalGameTime }
                value={ current }
                onChange={ dragProgressbar }
            />
            <span className="timestamp" id="timestamp">
                <span className="current">{ UTILS_SERVICE.millisToMinutesAndSeconds(current) }</span>
                -
                <span className="total">{  UTILS_SERVICE.millisToMinutesAndSeconds(totalGameTime) }</span>
            </span>
        </div>
    </div>
  );
};

export default Map;
