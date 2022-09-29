import React from "react";
import { useEffect, useState } from "react";
import { getMatchTimeline } from "../../Service/MatchService";
import "./MatchTimeline.scss";

const MatchTimeline = () => {
  const [matchTimeline, setMatchTimeline] = useState({});

  useEffect(() => {
    // Appeler la route API pour récupèrer les champions et le nom des invocateurs
    let formatMatchTimeline = [];

    getMatchTimeline("EUW1_6081980145").then((res) => {
      for (let i = 0; i < res["data"][0]["frames"].length; i++) {
        formatMatchTimeline.push(res["data"][0]["frames"][i]);
      }
      setMatchTimeline(formatMatchTimeline);
    });
  }, []);
  console.log(matchTimeline);

  return (
    <div className="page page-timeline">
      <div className="container">
        <div className="blue-team"></div>

        {/* TIMELINE MAP */}
        <div className="map">
          {/* <img src="../../assets/img/lol_map.webp" alt="" style={'width: 150px'}/> */}
        </div>
        <div className="red-team"></div>
      </div>
    </div>
  );
};

export default MatchTimeline;
