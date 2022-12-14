import React from "react";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MatchService from "../../services/MatchService";
import "./MatchTimeline.scss";
import { useQuery } from "react-query";
import UtilsService from "../../services/Utils";
import Map from "../../components/map/Map.jsx";
import EventList from "../../components/eventList/EventList";
import EventFaker from '../../fakes/Events.fake.json';
import PlayerList from './../../components/playerList/PlayerList';
import playIcon from '../../assets/img/icons/play-circle-line.svg';
import stopIcon from '../../assets/img/icons/stop-circle-line.svg';
import pauseIcon from '../../assets/img/icons/pause-circle-line.svg';

const MatchTimeline = () => {
    const map = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [velocity, setVelocity] = useState(1000);
    const [isLoaded, setIsLoaded] = useState(false);
    const interval = useRef(null);
    const [max, setMax] = useState(0);
    const [events, setEvents] = useState([]);
    const [playersInfo, setPlayersInfo] = useState([]);
    const params = useParams();
    const MATCH_SERVICE = new MatchService();
    const UTILS_SERVICE = new UtilsService();

    useEffect(() => {
        document.title = "Résumé | Mapol : Map Of Legends";
        // setMax(document.getElementById("progressbar").getAttribute("max"));
    }, []);

    useQuery(["match"], async () => {
        /// Call to API to get timeline of a match
        const response = await MATCH_SERVICE.getAllDataFromOneGame(params.match_id);

        if (response) {
        setIsLoaded(true);
        setEvents(() => {
            setMax(response.data.timeline.frames.at(-1).timestamp);
            return response.data.timeline.frames;
        });
        setPlayersInfo(response.data.playersInfo);
        }
    });

    const toggleMapStatus = () => {
        const BUTTON = document.getElementById('play');

        if(map.current.classList.contains("map-active")) {
            BUTTON.title = "Lecture"
            map.current.classList.remove("map-active");
            updatePlayIcon();
            clearInterval(interval.current);
        } else {
            BUTTON.title = "Pause"
            map.current.classList.add("map-active");
            updatePlayIcon();
            interval.current = setInterval(() => {
                setCurrentTime((prev) => {
                    if (+prev >= +max) {
                        map.current.classList.remove("map-active");
                        clearInterval(interval.current);

                        return +prev;
                    }

                    return +prev + 1000;
                });
            }, velocity);
        }
    };

    const stopMap = () => {
        map.current.classList.remove("map-active");
        clearInterval(interval.current);
        setCurrentTime(0);
        updatePlayIcon();
    };
  
    const updatePlayIcon = () => {
        const ICON = document.getElementById("play-icon");

        if (!map.current.classList.contains("map-active")) {
            ICON.src = playIcon;
        } else {
            ICON.src = pauseIcon;
        }
    };

    const dragProgressbar = (e) => {
        const PROGRESS = e.target;

        if (map.current.classList.contains("map-active")) {
            map.current.classList.remove("map-active");
            clearInterval(interval.current);
            updatePlayIcon();
        }
        setCurrentTime(PROGRESS.value);
    };

    const getVelocity = (e) => {
        const BUTTON = document.getElementById('play');
        let value = e.target.value;

        // Pause the timeline
        BUTTON.title = "Lecture"
        map.current.classList.remove("map-active");
        updatePlayIcon();
        clearInterval(interval.current);

        setVelocity(1000 / value);
    };

    return (
        <div className="page page-timeline">
            <div className="container page-timeline__grid">
                <div className="map-box box">
                    <h2 className="box-title">Résumé du match</h2>
                    {
                        isLoaded && <Map 
                            toggleMapStatus={ toggleMapStatus } 
                            stopMap={ stopMap } 
                            dragProgressbar={ dragProgressbar }
                            events={ events } 
                            map={ map }
                            current={ currentTime }
                            getVelocity={ getVelocity }
                        />
                    }
                </div>
                <div className="events-box box">
                    <h2 className="box-title">Évènements</h2>
                    <EventList isLoaded={isLoaded} events={ events } current={ currentTime } playersInfo={ playersInfo } />
                </div>
                <div className="teams-box box">
                    <h2 className="box-title">Participants</h2>
                    <PlayerList players={ playersInfo } isLoaded={ isLoaded } />
                </div>
            </div>
        </div>
    );
};

export default MatchTimeline;
