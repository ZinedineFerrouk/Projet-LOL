import React, { useEffect, useRef } from "react";
import match_map from "../../assets/img/match-map.webp";

const Map = () => {
  const playBtn = document.getElementById("play");
  const stopBtn = document.getElementById("stop");
  const map = useRef(null);
  const mapmoment = document.getElementById("mapmoment");
  const progressbar = document.getElementById("progressbar");
  const timestamp = document.getElementById("timestamp");

  useEffect(() => {
    // console.log(map.className);
  }, [])

  //------------------------------------------------------------------------
  const t = setInterval(() => {
    let progressbar = document.getElementById("progressbar");
    let time = document.getElementById("progressbar").value;
    progressbar.setAttribute("value", time++);

    // this.updateProgressbar(time);
    if (time > progressbar.getAttribute("max")) {
      clearInterval(t);
    }
  }, 1000);

  const toggleMapStatus = () => {
    if (map.current) {
      if (map.current.classList.contains("map-active")) {
        // clearInterval(t);
      } else {
        let time = progressbar.value;
        progressingbar(time);
      }
      map.current.classList.toggle("map-active");
    }
  };

  const progressingbar = (time) => {
    setInterval(() => {
      progressbar.setAttribute('value', time++);
      // updateProgressbar(time);
      if (time > progressbar.getAttribute('max')) {
        clearInterval(t);
      }
    }, 1000)
  }

  const updatePlayIcon = () => {
      if (!map.current.classList.contains("map-active")) {
          playBtn.innerHTML = '<i class="fas fa-play"></i>';
      } else {
          playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      }
  }

  // stopMap = () => {
  //     if (map.classList.contains("map-active")) {
  //         map.classList.toggle("map-active");
  //     }
  //     clearInterval(t);
  //     progressbar.setAttribute('value', "0");
  //     updateProgressbar(0);
  // }

  // updateProgressbar = (time) => {
  //     // AFFICHAGE TIME
  //     let min = Math.floor(time / 60);
  //     let sec = Math.floor(time - min * 60);

  //     if (min < 10) {
  //         min = '0' + String(min);
  //     }
  //     if (sec < 10) {
  //         sec = '0' + String(sec);
  //     }
  //     timestamp.innerText = `${min}:${sec}`;
  //     // FIN AFFICHAGE
  // }

  // dragProgressbar = () => {
  //     // console.log('hello');
  //     console.log(progressbar.value);
  // }

  return (
    <div className="container">
      {/* TIMELINE MAP */}
      <div className="map">
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

        <img ref={map} id="map" className="lol_map" src={match_map} />

        <div className="controls">
          <button onClick={toggleMapStatus} className="btn" id="play">
            <i className="ri-play-line"></i>
          </button>
          <button className="btn" id="stop">
            <i className="ri-stop-line"></i>
          </button>
          <input
            type="range"
            className="progressbar"
            id="progressbar"
            min="0"
            max="120"
            value="0"
          />

          <span className="timestamp" id="timestamp">
            00:00
          </span>
        </div>
      </div>
    </div>
  );
};

export default Map;
