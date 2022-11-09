import React, { useEffect, useRef, useState } from "react";
import match_map from "../../assets/img/lol_map.webp";

const Map = (props) => {
  const killInfos = props.killInfos
  const map = useRef(null);
  const progressbar = document.getElementById("progressbar");
  const [currentTime, setCurrentTime] = useState(0);
  const interval = useRef(null);

  const toggleMapStatus = () => {
    const MAX = progressbar.getAttribute('max');
    
    if(map.current.classList.contains("map-active")) {
      map.current.classList.remove("map-active");
      updatePlayIcon();
      clearInterval(interval.current);
    } else {
      map.current.classList.add("map-active");
      updatePlayIcon();
      interval.current = setInterval(() => {
        setCurrentTime((prev) => {
          if(prev >= +MAX) {
            map.current.classList.remove("map-active");
            clearInterval(interval.current);
          }
          return prev + 1;
        });
      }, 1000)
    }
  };

  const stopMap = () => {
    map.current.classList.remove("map-active");
    clearInterval(interval.current);
    setCurrentTime(0);
    updatePlayIcon();
  }

  const updatePlayIcon = () => {
    const ICON = document.getElementById('play-icon');

    if (!map.current.classList.contains("map-active")) {
      ICON.classList.remove("ri-pause-line");
      ICON.classList.add("ri-play-line");
    } else {
      ICON.classList.remove("ri-play-line");
      ICON.classList.add("ri-pause-line");
    }
  }

  const dragProgressbar = (e) => {
    const PROGRESS = e.target;

    if (map.current.classList.contains("map-active")) {
      map.current.classList.remove("map-active");
      clearInterval(interval.current);
      updatePlayIcon();
    }
    setCurrentTime(PROGRESS.value);
  }
  
  return (
    <div className="container">
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

        <img ref={map} id="map" className="lol_map" src={match_map} />

        <div className="controls">
          <button onClick={ toggleMapStatus } className="btn" id="play">
            <i id="play-icon" className="ri-play-line"></i>
          </button>
          <button onClick={ stopMap } className="btn" id="stop">
            <i className="ri-stop-line"></i>
          </button>
          <input
            type="range"
            className="progressbar"
            id="progressbar"
            min="0"
            max="10"
            value={ currentTime }
            onChange={ dragProgressbar }
          />

          <span className="timestamp" id="timestamp">
          { Math.floor(currentTime / 60) + ":" + (currentTime % 60 ? (currentTime % 60 <= 9 ? '0' + currentTime % 60 : currentTime % 60) : '00') }
          </span>
        </div>
      </div>
    </div>
  );
};

export default Map;
