import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';
import './Header.css';
import { UserContext } from '../UserContext';
import { useAuth0 } from '@auth0/auth0-react';

function Header() {
  const { setUser } = useContext(UserContext);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const handleLogout = () => {
    setUser(null);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <header className="header">
      <div className="logoContainer">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">IU-Korrektur</h1>
        {isAuthenticated && (
          <nav className="nav">
            <ul className="navList">
              <li className="navItem">
                <Link to="/ticketlist" className="navLink">Ticketliste</Link>
              </li>
              <li className="navItem">
                <Link to="/create" className="navLink">Ticket erstellen</Link>
              </li>
              <li className="navItem">
                <Link to="/demo" className="navLink">Demo</Link>
              </li>
              <li className="navItem">
                <Link to="/Bedienungsanleitung.pdf" className="navLink" target="_blank">Anleitung</Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <nav className="nav">
        <ul className="navList">
          {isAuthenticated ? (
            <li className="navItem userSection">
              {/* Begrüßung mit dem vollständigen Namen des Benutzers */}
              <span className="user-name">Hallo {user.name}</span>  
              <button onClick={handleLogout} className="button logout-button">Logout</button>
            </li>
          ) : (
            <li className="navItem">
              <button onClick={() => loginWithRedirect()} className="button login-button">Login</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
