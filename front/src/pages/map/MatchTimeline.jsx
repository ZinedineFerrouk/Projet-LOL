import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchService from "../../services/MatchService";
import "./MatchTimeline.scss";
import { useQuery } from "react-query";
import UtilsService from "../../services/Utils";
import MapService from "../../services/MapService";
import Map from "../../components/map/Map.jsx";

const MatchTimeline = () => {
  const [matchTimeline, setMatchTimeline] = useState({});
  const [killInfos, setkillInfos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [totalGameTime, setTotalGameTime] = useState(0);
  const params = useParams();
  const MATCH_SERVICE = new MatchService();
  const UTILS_SERVICE = new UtilsService();

  let killInfosFormat = [];
  useQuery(["match"], async () => {
    /// Call to API to get timeline of a match
    const response = await MATCH_SERVICE.getOneTimeline(params.match_id);

    if (response.data) {
      setIsLoaded(true);
      setMatchTimeline(response.data[0].frames);
      
      for (let i = 0; i < matchTimeline.length; i++) {
        setTotalGameTime(
          UTILS_SERVICE.millisToSeconds(matchTimeline[i].timestamp - 1)
        );
      }
    }
      console.log(totalGameTime);
      // for (let i = 0; i < matchTimeline.length; i++) {
      //   for (let j = 0; j < matchTimeline[i].events.length; j++) {
      //     if (matchTimeline[i].events[j].type === "CHAMPION_KILL") {
      //       killInfosFormat.push({
      //         type: matchTimeline[i].events[j].type,
      //         timestamp: matchTimeline[i].events[j].timestamp,
      //         killerId: matchTimeline[i].events[j].killerId,
      //         victimId: matchTimeline[i].events[j].victimId,
      //         position: matchTimeline[i].events[j].position,
      //       });
      //     }
      //   }
      // }

      // if(killInfos.length === 0){
      //   setkillInfos(killInfosFormat);
      // }
  });

  useEffect(() => {
    document.title = "Résumé | Mapol : Map Of Legends";
  }, []);

  return (
    <div className="page page-timeline">
      { 
        isLoaded && <Map gameDuration={totalGameTime} /> 
      }
    </div>
  );
};

export default MatchTimeline;
