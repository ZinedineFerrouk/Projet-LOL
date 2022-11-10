import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchService from "../../services/MatchService";
import "./MatchTimeline.scss";
import { useQuery } from "react-query";
import UtilsService from "../../services/Utils";
import MapService from "../../services/MapService";
import Map from "../../components/map/Map.jsx";
import EventList from "../../components/eventList/EventList";
import EventFaker from '../../fakes/Events.fake.json';

const MatchTimeline = () => {
    const [matchTimeline, setMatchTimeline] = useState({});
    const [killInfos, setkillInfos] = useState([]);
    const [events, setEvents] = useState([]);
    const params = useParams();
    const MATCH_SERVICE = new MatchService();
    const UTILS_SERVICE = new UtilsService();

    let killInfosFormat = [];
    let totalGameTime = '';
    
    useQuery(["match"], async () => {
        /// Call to API to get timeline of a match
        const response = await MATCH_SERVICE.getOneTimeline(params.match_id);
        setMatchTimeline(response.data[0].frames);

        if (totalGameTime === '') {
            for (let i = 0; i < matchTimeline.length; i++) {
                totalGameTime = UTILS_SERVICE.millisToSeconds(matchTimeline[i].timestamp - 1);
            }
        }
    });

    useEffect(() => {
        setEvents(EventFaker.events);
        
        document.title = "Résumé | Mapol : Map Of Legends";
    }, []);

    return (
        <div className="page page-timeline">
            <div className="container page-timeline__grid">
                <div className="map-box box">
                    <h2 className="box-title">Résumé du match</h2>
                    <Map />
                </div>
                <div className="events-box box">
                    <h2 className="box-title">Évènements</h2>
                    <EventList events={ events } />
                </div>
                <div className="teams-box box">
                    <h2 className="box-title">Participants</h2>
                </div>
            </div>
        </div>
    );
};

export default MatchTimeline;
