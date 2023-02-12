import React from 'react';
import Logo from '../img/ford_logo_black.png';

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt='ford_logo' />
      <span>
        Made with 💖 and <b>React.js</b>.
      </span>
    </footer>
  );
};

export default Footer;