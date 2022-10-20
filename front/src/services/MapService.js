/**
 * Map Service
 */
export default class MapService {
  constructor() {
    this.stopBtn = document.getElementById("stop");
    this.playBtn = document.getElementById("play");
    this.progressbar = document.getElementById("progressbar");
    this.timestamp = document.getElementById("timestamp");
    this.map = document.getElementById("map");
    console.log(this.map);
  }

  //   barTiming = () =>
  //     setInterval((time) => {
  //       this.progressbar.setAttribute("value", time++);
  //       this.updateProgressbar(time);
  //       if (time > this.progressbar.getAttribute("max")) {
  //         // clearInterval();
  //       }
  //     }, 1000);

  toggleMapStatus = (t) => {
    if (this.map.classList.contains("map-active")) {
      clearInterval(t);
    } else {
      //   this.progressingbar(this.currentTime);
    }
    this.map.classList.toggle("map-active");
  };

  //   updatePlayIcon(e) {
  //       if (!e.target.classList.contains("map-active")) {
  //           this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
  //       } else {
  //           this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  //       }
  //   }

//   stopMap(t) {
//     if (this.map.classList.contains("map-active")) {
//       this.map.classList.toggle("map-active");
//     }
//     clearInterval(t);
//     this.progressbar.setAttribute("value", "0");
//     this.updateProgressbar(0);
//   }

//   updateProgressbar = (time) => {
//     // AFFICHAGE TIME
//     let min = Math.floor(time / 60);
//     let sec = Math.floor(time - min * 60);

//     if (min < 10) {
//       min = "0" + String(min);
//     }
//     if (sec < 10) {
//       sec = "0" + String(sec);
//     }
//     this.timestamp.innerText = `${min}:${sec}`;
//     // FIN AFFICHAGE
//   };

  //   dragProgressbar = () => {
  //     // console.log('hello');
  //     console.log(this.progressbar.value);
  //   };
}

// playBtn.addEventListener('click', this.toggleMapStatus);
// playBtn.addEventListener('click', this.updatePlayIcon);

// stopBtn.addEventListener('click', this.stopMap);
// stopBtn.addEventListener('click', this.updatePlayIcon);

// // video.addEventListener('timeupdate', updateProgressbar);
// progressbar.addEventListener('change', this.dragProgressbar);
