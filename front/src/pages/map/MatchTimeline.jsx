import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchService from "../../services/MatchService";
import "./MatchTimeline.scss";
import { useQuery } from "react-query";
import UtilsService from "../../services/Utils";
import Map from "../../components/map/Map.jsx";
import EventList from "../../components/eventList/EventList";
import EventFaker from '../../fakes/Events.fake.json';

const MatchTimeline = () => {
  const [matchTimeline, setMatchTimeline] = useState({});
  const [killInfos, setkillInfos] = useState([]);
  const [wardInfos, setWardInfos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalGameTime, setTotalGameTime] = useState(0);
  const params = useParams();
  const MATCH_SERVICE = new MatchService();
  const UTILS_SERVICE = new UtilsService();

  let killInfosFormat = [];
  let wardInfosFormat = [];
  useQuery(["match"], async () => {
    /// Call to API to get timeline of a match
    const response = await MATCH_SERVICE.getAllDataFromOneGame(params.match_id);

    if (response) {
      setIsLoaded(true);
      console.log(response.data.timeline);
      setMatchTimeline(response.data.timeline);
      
      for (let i = 0; i < matchTimeline.length; i++) {
        setTotalGameTime(
          UTILS_SERVICE.millisToSeconds(matchTimeline[i].timestamp - 1)
        );
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
