import React from 'react';
import './SearchBar.scss';
import searchLine from '../../assets/img/icons/search-line.svg';
import chevronDownLine from '../../assets/img/icons/chevron-down-line.svg';
import { Link } from 'react-router-dom';

const SearchBar = (props) => {

    const PLAYERS = [
        {
            id: 1,
            name: 'Skyyinfinity',
            iconId: 5489,
            level: 256,
            region: 'EUW'
        },
        {
            id: 2,
            name: 'Orlando38',
            iconId: 1564,
            level: 256,
            region: 'NA'
        },
        {
            id: 3,
            name: 'Skyrreez',
            iconId: 4587,
            level: 256,
            region: 'EUW'
        }
    ]

  return (
    <div className="searchbar">
        <div className="region select-container">
            <select className="input select" name="region" id="region">
                <option value="">-- Région --</option>
                { 
                    props.regions.map((region, index) => {
                        return <option key={ index } value={ region.value }>{ region.name }</option>
                    })
                }
            </select>
            <img className="icon" src={ chevronDownLine } alt="chevron icon" />
        </div>
        <div className="input-container">
            <input id="search" className="input input-no-radius" placeholder="Qui cherchez-vous ?" type="search" name="search" />
        </div>
        <ul className="results">
            {
                PLAYERS.map((player, index) => {
                    return <Link to="/">
                        <li key={ index } className="result">
                            <div className="player-icon">
                                <img src={ `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${player.iconId}.jpg` } alt="player icon" />
                            </div>
                            <div className="player-content">
                                <span className="tag tag-info region">{ player.region }</span>
                                <p className="name">{ player.name }</p>
                                <span className="separator">•</span>
                                <p className="level">Niveau { player.level }</p>
                            </div>
                        </li>
                    </Link>
                })
            }
        </ul>
        <button title="Rechercher" className="btn btn-icon-only"><img className="icon" src={ searchLine } alt="search icon" /></button>
    </div>
  )
}

export default SearchBar;