import React, { useState } from 'react';
import './SearchBar.scss';
import searchLine from '../../assets/img/icons/search-line.svg';
import { Link } from 'react-router-dom';
import SummonerService from '../../services/SummonerService';

const SearchBar = (props) => {

    const SUMMONER_SERVICE = new SummonerService();
    const [hideResults, setHideResults] = useState(true);
    const [players, setPlayers] = useState([]);
    const [inputText, setInputText] = useState('');
    const [playerIsEmpty, setPlayerIsEmpty] = useState(false);

    const triggerInput = (e) => {
        if(e.target.value.length >= 3) {
            // Get input value and show results
            setInputText(e.target.value);
            setHideResults(false);
            
            // call api
            // FIXME: Get all summoners by name. NOT get one summoner by name
            SUMMONER_SERVICE.getOneByName(e.target.value).then((res) => {
                if (res.data.length > 0) {
                    setPlayers(res.data);
                    setPlayerIsEmpty(false)
                } else {
                    setPlayerIsEmpty(true);
                }
            });

            // if no response
        } else {
            setHideResults(true);
        }
    }

    return (
        <div className="searchbar">
            <div className="region select-container">
                <select className="input select" name="region" id="region">
                    <option value="">Choix de la région</option>
                    { 
                        props.regions.map((region, index) => {
                            return <option key={ index } value={ region.value }>{ region.name }</option>
                        })
                    }
                </select>
            </div>
            <div className="input-container">
                <input id="search" className="input input-no-radius" placeholder="Qui cherchez-vous ?" type="search" name="search" onInput={ triggerInput } />
            </div>
            {playerIsEmpty ? (
                <ul className="results" aria-hidden={ hideResults }>
                    <li className="result">
                        <div className="is-empty">
                            <span className="notice notice-info">Aucun joueur trouvé pour "{ inputText }".</span>
                        </div>
                    </li>
                </ul>
            ) : (
                <ul className="results" aria-hidden={ hideResults }>
                {
                    players.map((player, index) => {
                        return <Link to={ `/joueur/${player.name}` } key={ index }>
                            <li className="result">
                                <div className="player-icon">
                                    <img src={ `https://opgg-static.akamaized.net/images/profile_icons/profileIcon${player.icon_id}.jpg` } alt="player icon" />
                                </div>
                                <div className="player-content">
                                    <span className="tag tag-info region">{ player.region }</span>
                                    <p className="name">{ player.name }</p>
                                    <span className="separator">•</span>
                                    <p className="level">Niveau { player.summoner_level }</p>
                                </div>
                            </li>
                        </Link>
                    })
                }
                </ul>
            )}
            
            <button title="Rechercher" className="btn btn-icon-only"><img className="icon" src={ searchLine } alt="search icon" /></button>
        </div>
      )
    }
    
    export default SearchBar;