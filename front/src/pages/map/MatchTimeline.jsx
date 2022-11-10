import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MatchService from "../../services/MatchService";
import "./MatchTimeline.scss";
import { useQuery } from "react-query";
import UtilsService from "../../services/Utils";
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
    document.title = "Résumé | Mapol : Map Of Legends";
  }, []);

  return (
    <div className="page page-timeline">
      { 
        isLoaded && <Map killInfos={killInfos} gameDuration={totalGameTime} /> 
      }
    </div>
  );
};

export default MatchTimeline;
