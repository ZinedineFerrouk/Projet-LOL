import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../../assets/img/mapol-logo-white.svg';
import arrowLeftLine from '../../../assets/img/icons/arrow-left-line.svg';
import searchIcon from '../../../assets/img/icons/search-line.svg';
import Button from '../../button/Button';
import SearchBar from './../../searchbar/SearchBar';
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const expandSearchBar = () => {
        setExpanded(prev => !prev);
    }

    return (
        <div className='layout layout-header'>
            <div className="back">
                <Button iconOnly onClick={ () => navigate(-1) }>
                    <img src={ arrowLeftLine } alt="back icon" className="icon" />
                </Button>
            </div>
            <div className="logo">
                <Link to="/">
                    <img src={ logo } alt="Logo Mapol" />
                </Link>
            </div>
            <div className="search-icon">
                <Button iconOnly onClick={ expandSearchBar } >
                    <img src={ searchIcon } alt="search icon" className='icon' />
                </Button>
            </div>
            <div className={ expanded ? "searchbox expanded" : "searchbox" }>
                <SearchBar />
            </div>
        </div>
    )
}

export default Header;
