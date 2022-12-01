import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Link } from "react-router-dom";
import logo from "../../assets/img/mapol-logo-white.svg";
import {
  background1,
  background3,
  background4,
  background5,
} from "../../assets/img/background.js";
import SearchBar from "../../components/searchbar/SearchBar";

const Home = () => {

  const BACKGROUNDS = [
    background1,
    background3,
    background4,
    background5,
  ];

  useEffect(() => {
    document.title = 'Mapol : Map Of Legends';
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
          <SearchBar />
        </div>
        <div className="introduction">
          <p>
            <span>Mapol</span> est une application web dédié aux fans du MOBA League of Legends.
            L'application permet de rechercher un joueur est d'accéder aux statistiques de ses quatre dernières parties jouées.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
