import React, { useState } from 'react';

import './styles.scss';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export function Header() {
  const [active, setActive] = useState(false);
  function toggleMenu() {
    setActive(!active);
  }

  return (
    <header>
      <img src={logo} alt="Logo Plant Manager" />
      <nav>
        <button type="button" onClick={() => toggleMenu()}>
          <span className={active ? 'hamburguer active' : 'hamburguer'} />
        </button>
        <ul className={active ? 'active' : ''}>
          <Link to="/myplants">
            <li>Minhas plantinhas</li>
          </Link>
          <Link to="/newplant">
            <li>Nova planta</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
