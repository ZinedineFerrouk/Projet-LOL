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
      for (let i = 0; i < matchTimeline.length; i++) {
        const element = matchTimeline[i].events;
        for (let j = 0; j < element.length; j++) {
          if (element[j].type === "CHAMPION_KILL") {
            killInfosFormat.push({
              type: element[j].type,
              timestamp: element[j].timestamp,
              killerId: element[j].killerId,
              victimId: element[j].victimId,
              position: element[j].position,
            });
          }

          if (element[j].type === "WARD_PLACED") {
            wardInfosFormat.push({
              type: element[j].type,
              timestamp: element[j].timestamp,
              creatorId: element[j].creatorId,
              wardType: element[j].wardType,
            });
          }
          
        }
      }

      if(killInfos.length === 0){
        setkillInfos(killInfosFormat);
      }

      if(wardInfos.length === 0){
        setWardInfos(wardInfosFormat);
      }

      console.log(wardInfosFormat);
      console.log(killInfosFormat);
  });

  useEffect(() => {
    document.title = "Résumé | Mapol : Map Of Legends";
  }, []);

  return (
    <div className="page page-timeline">
      { 
        isLoaded && <Map killInfos={killInfosFormat} gameDuration={totalGameTime} /> 
      }
    </div>
  );
};

export default MatchTimeline;
