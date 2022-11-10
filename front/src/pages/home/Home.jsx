import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Link } from "react-router-dom";
import logo from "../../assets/img/mapol-logo.svg";
import {
  background1,
  background2,
  background3,
  background4,
  background5,
} from "../../assets/img/background.js";
import SearchBar from "../../components/searchbar/SearchBar";
import Button from '../../components/button/Button';

const Home = () => {
  
  const [regions, setRegions] = useState([]);

  const BACKGROUNDS = [
    background1,
    background2,
    background3,
    background4,
    background5,
  ];

  const fakeRegions = [
    {
      name: "Europe Ouest",
      value: "EUW",
    },
    {
      name: "Europe Nord / Est",
      value: "EUNE",
    },
    {
      name: "Amérique du Nord",
      value: "NA",
    },
    {
        name: 'Océanie',
        value: 'OCE'
    }
  ];

  useEffect(() => {
    document.title = 'Mapol : Map Of Legends';

    if(regions.length === 0) {
      setRegions(fakeRegions);
    }
  }, []);

  let backgroundUrl =
    BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

  return (
    <div
      className="page page-home"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <div className="overlay overlay-white"></div>
      <div className="home-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Mapol Logo" />
          </Link>
        </div>
        <div className="search">
          <SearchBar regions={ regions } />
        </div>
        <div className="introduction">
          <p>
            <b>Mapol</b> est une application web capable d’afficher les
            informations d’un joueurs. Dont les grades, le niveau, les
            statistiques mais aussi la liste des derniers matches joués. Selon
            le matche séléctionné, vous aurez la possibilité grâce à un lecteur
            de visualiser en temps réelle le dérouler du match.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
