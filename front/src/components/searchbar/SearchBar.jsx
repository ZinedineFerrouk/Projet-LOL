import { useEffect, useState } from 'react';
import './SearchBar.scss';
import searchLine from '../../assets/img/icons/search-line.svg';
import { Link } from 'react-router-dom';

const SearchBar = (props) => {

    const [hideResults, setHideResults] = useState(true);
    const [inputText, setInputText] = useState('');
    const [playerIsEmpty, setPlayerIsEmpty] = useState(false);
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
        },
        {
            id: 3,
            name: 'Skyrreez',
            iconId: 4587,
            level: 256,
            region: 'EUW'
        },
        {
            id: 3,
            name: 'Skyrreez',
            iconId: 4587,
            level: 256,
            region: 'EUW'
        },
        {
            id: 3,
            name: 'Skyrreez',
            iconId: 4587,
            level: 256,
            region: 'EUW'
        }
    ];
    
    useEffect(() => {
        if(PLAYERS.length === 0) {
            setPlayerIsEmpty(true);
        }
    });

    const triggerInput = (e) => {
        if(e.target.value.length >= 3) {
            // Get input value and show results
            setInputText(e.target.value);
            setHideResults(false);
            
            // call api

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
                PLAYERS.map((player, index) => {
                    return <Link to="/" key={ index }>
                        <li className="result">
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
        )}
        
        <button title="Rechercher" className="btn btn-icon-only"><img className="icon" src={ searchLine } alt="search icon" /></button>
    </div>
  )
}

export default SearchBar;