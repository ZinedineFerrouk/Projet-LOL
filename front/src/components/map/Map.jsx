import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import match_map from "../../assets/img/normal.jpg";
import "./Map.scss";
import playIcon from '../../assets/img/icons/play-circle-line.svg';
import stopIcon from '../../assets/img/icons/stop-circle-line.svg';
import pauseIcon from '../../assets/img/icons/pause-circle-line.svg';
import Button from "../button/Button";
import UtilsService from "../../services/Utils";

const Map = ({ events, current, toggleMapStatus, stopMap, dragProgressbar, map }) => {
    const [totalGameTime, setTotalGameTime] = useState(0);
    const UTILS_SERVICE = new UtilsService;

    useEffect(() => {
        // setTotalGameTime(events.at(-1).timestamp);
    }, []);

  return (
    <div className="map__container">
        <div className="map__image">
        {/* {killInfos.map((info, index) => {
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
          })} */}
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
                max={ totalGameTime }
                value={ current }
                onChange={ dragProgressbar }
            />
            <span className="timestamp" id="timestamp">
                <span className="current">{ UTILS_SERVICE.millisToMinutesAndSeconds(current) }</span>
                -
                <span className="total">{  UTILS_SERVICE.millisToMinutesAndSeconds(totalGameTime) }</span>
            </span>
        </div>
    </div>
  );
};

export default Map;
