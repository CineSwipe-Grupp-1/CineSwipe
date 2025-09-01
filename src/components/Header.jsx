import React from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.png'; // adjust path if needed

const Header = () => {
    return (
        <header>
            <img src={logo} alt="CineSwipe Logo" />
        </header>
    );
};

export default Header;
