import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import match_map from "../../assets/img/normal.jpg";
import "./Map.scss";
import playIcon from '../../assets/img/icons/play-circle-line.svg';
import stopIcon from '../../assets/img/icons/stop-circle-line.svg';
import pauseIcon from '../../assets/img/icons/pause-circle-line.svg';
import Button from "../button/Button";

const Map = () => {
    const map = useRef(null);
    const progressbar = document.getElementById("progressbar");
    const [currentTime, setCurrentTime] = useState(0);
    const interval = useRef(null);
    const [timeline, setTimeline] = useState({});
    const [max, setMax] = useState(0);

    useEffect(() => {
        setMax(document.getElementById("progressbar").getAttribute("max"));
    }, []);

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
                    if (prev >= +max) {
                        map.current.classList.remove("map-active");
                        clearInterval(interval.current);

                        return prev;
                    }

                    return prev + 1;
                });
            }, 1000);
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

    //FIXME: Au drag, il ajoute le max à la valeur currentTime
  const dragProgressbar = (e) => {
    const PROGRESS = e.target;

    if (map.current.classList.contains("map-active")) {
        map.current.classList.remove("map-active");
        clearInterval(interval.current);
        updatePlayIcon();
    }
    setCurrentTime(PROGRESS.value);
  };

  return (
    <div className="map__container">
        <div className="map__image">
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
            </div>
            <input
            type="range"
            className="progressbar"
            id="progressbar"
            min="0"
            max="10"
            value={currentTime}
            onChange={ dragProgressbar }
            />
            <span className="timestamp" id="timestamp">
            {
            Math.floor(currentTime / 60) +
                ":" +
                (currentTime % 60
                ? currentTime % 60 <= 9
                    ? "0" + (currentTime % 60)
                    : currentTime % 60
                : "00")
            }
            { 
            ' - ' + Math.floor(max / 60) +
                ":" +
                (max % 60
                ? max % 60 <= 9
                    ? `0${max % 60}`
                    : `${max % 60}`
                : "00")
            }
            </span>
        </div>
    </div>
  );
};

export default Map;
