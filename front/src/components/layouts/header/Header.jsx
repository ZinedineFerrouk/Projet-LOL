import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../../assets/img/mapol-logo.svg';
import arrowLeftLine from '../../../assets/img/icons/arrow-left-line.svg';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='layout layout-header'>
            <div className="back">
                <button title='Retour' onClick={ () => navigate(-1) } className="btn btn-icon-only">
                    <img src={ arrowLeftLine } alt="back icon" className="icon" />
                </button>
            </div>
            <div className="logo">
                <Link to="/" >
                    <img src={ logo } alt="Logo Mapol" />
                </Link>
            </div>
        </div>
    )
}

export default Header;
