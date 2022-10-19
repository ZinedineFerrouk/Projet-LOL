import React from "react";
import { useEffect, useState } from "react";  
import { useParams } from "react-router-dom";
import MatchService from "../../services/MatchService";
import "./MatchTimeline.scss";
import match_map from "../../assets/img/match-map.webp";

const MatchTimeline = () => {
  const [matchTimeline, setMatchTimeline] = useState({}); 
  const [killInfos, setkillInfos] = useState([]);
  const params = useParams();
  const matchService = new MatchService();

  useEffect(() => {
    document.title = 'Résumé | Mapol : Map Of Legends';
    let killInfosFormat = [];
    // Appeler la route API pour récupèrer les champions et le nom des invocateurs

    matchService.getOneTimeline(params.match_id).then((res) => {   
      console.log(res.data);
      setMatchTimeline(res["data"][0]["frames"]);

      for (let i = 0; i < matchTimeline.length; i++) {
        for (let j = 0; j < matchTimeline[i].events.length; j++) { 
          if (matchTimeline[i].events[j].type === "CHAMPION_KILL") {     
            killInfosFormat.push({
              type: matchTimeline[i].events[j].type,
              timestamp: matchTimeline[i].events[j].timestamp,
              killerId: matchTimeline[i].events[j].killerId,
              victimId: matchTimeline[i].events[j].victimId,
              position: matchTimeline[i].events[j].position
            });
          }
        }
      }

      if (killInfos.length === 0) {
        setkillInfos(killInfosFormat); 
      }
    });
  }, []);

  console.log(killInfos);

  return (
    <div className="page page-timeline">
      <div className="container"> 
        <div className="blue-team"></div>

        {/* TIMELINE MAP */}
        <div className="map">
          {killInfos.map((info, index) => {
            return (
              <div
                key={index}
                className="point"
                style={{
                  left: (info.position.x * 100) / 15000 + "%", 
                  bottom: (info.position.y * 100) / 15000 + "%",
                }}
              ></div>
            );
          })}

          <img className="lol_map" src={match_map} />
        </div>
        <div className="red-team"></div>
      </div>
    </div>
  );
};

export default MatchTimeline;