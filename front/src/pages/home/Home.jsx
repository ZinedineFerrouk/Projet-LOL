import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Link } from "react-router-dom";
import logo from '../../assets/img/mapol-logo.svg';
import { background1, background2, background3, background4, background5 } from '../../assets/img/background.js';
import SearchBar from '../../components/searchbar/SearchBar';

const Home = () => {
  
  const [regions, setRegions] = useState([]);
  const [players, setPlayers] = useState([]);

  const BACKGROUNDS = [
    background1,
    background2,
    background3,
    background4,
    background5
  ];

  const fakeRegions = [
    {
        name: 'Europe Ouest',
        value: 'EUW'
    },
    {
        name: 'Europe Nord / Est',
        value: 'EUNE'
    },
    {
        name: 'Amérique du Nord',
        value: 'NA'
    },
    {
        name: 'Océanie',
        value: 'OCE'
    }
  ];
  const fakePlayers = [
    {
        id: 1,
        name: 'Skyyinfinity',
        iconId: 5489,
        level: 12,
        region: 'EUW'
    },
    {
        id: 2,
        name: 'Orlando58',
        iconId: 1564,
        level: 256,
        region: 'NA'
    },
    {
        id: 3,
        name: 'Skyrreez',
        iconId: 4587,
        level: 52,
        region: 'EUW'
    },
    {
        id: 4,
        name: 'Ychack',
        iconId: 1234,
        level: 541,
        region: 'EUW'
    },
    {
        id: 5,
        name: 'Firefly38',
        iconId: 1425,
        level: 328,
        region: 'EUW'
    },
    {
        id: 6,
        name: 'MichelLeVrai',
        iconId: 4567,
        level: 1,
        region: 'OCE'
    }
  ];

  useEffect(() => {
    if(regions.length === 0) {
      setRegions(fakeRegions);
    }
    if(players.length === 0) {
      setPlayers(fakePlayers);
    }
  }, []);

  let backgroundUrl = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)];

  return (
    <div className="page page-home" style={{
      backgroundImage: `url(${backgroundUrl})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover'
    }}>
      <div className="overlay overlay-white"></div>
      <div className="home-container">
        <div className="logo">
          <Link to='/'>
            <img src={ logo } alt="Mapol Logo" />
          </Link>
        </div>
        <div className="search">
          <SearchBar regions={ regions } players={ players } />
        </div>
        <div className="introduction">
          <p>
            <b>Mapol</b> est une application web capable d’afficher les informations d’un joueurs.
            Dont les grades, le niveau, les statistiques mais aussi la liste des derniers matches joués.
            Selon le matche séléctionné, vous aurez la possibilité grâce à un lecteur de visualiser en temps réelle le dérouler du match.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home;
