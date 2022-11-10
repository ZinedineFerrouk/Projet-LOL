import React, { useState } from 'react';
import './SearchBar.scss';
// import searchLine from '../../assets/img/icons/search-line.svg';
import { Link } from 'react-router-dom';
import SummonerService from '../../services/SummonerService';
import PlayersSkeleton from '../skeletons/PlayersSkeleton';
import Button from '../button/Button';

const SearchBar = (props) => {

    const SUMMONER_SERVICE = new SummonerService();
    const [hideResults, setHideResults] = useState(true);
    const [players, setPlayers] = useState([]);
    const [inputText, setInputText] = useState('');
    const [playerIsEmpty, setPlayerIsEmpty] = useState(false);
    const [loadingPlayers, setLoadingPlayers] = useState(false);

    const triggerInput = async (e) => {
        setLoadingPlayers(true);

        if(e.target.value.length >= 3) {
            // Get input value and show results
            setInputText(e.target.value);
            
            // call api
            await SUMMONER_SERVICE.getOneByName(e.target.value).then((res) => {
                setHideResults(false);
                
                if (res.data.length > 0) {
                    setLoadingPlayers(false);
                    setPlayers(res.data);
                    setPlayerIsEmpty(false)
                } else {
                    setLoadingPlayers(false);
                    setPlayerIsEmpty(true);
                }
            });

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
                    loadingPlayers ? (

                        <PlayersSkeleton />

                    ) : (

                        players.map((player, index) => {
                            return (
                                <Link to={ `/joueur/${player.name}` } key={ index }>
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
                            )
                        })

                    )
                }
                </ul>
            )}
            
            {/* <Button title="Rechercher" iconOnly><img className="icon" src={ searchLine } alt="search icon" /></Button> */}
        </div>
      )
    }
    
    export default SearchBar;