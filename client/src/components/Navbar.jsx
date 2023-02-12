import React from 'react'
import {Link} from 'react-router-dom'
import Logo from "../img/ford_logo_black.png"
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Navbar = () => {

  const { currentUser,logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to = "/">
            <img src={Logo} alt="ford_logo" />
          </Link>
          
        </div>
        <div className="links">
          <Link className='link' to="/?cat=art">
            <h6>
              ART
            </h6>
          </Link>
          <Link className='link' to="/?cat=science">
            <h6>
              SCIENCE
            </h6>
          </Link>
          <Link className='link' to="/?cat=tech">
            <h6>
              TECH
            </h6>
          </Link>
          <Link className='link' to="/?cat=food">
            <h6>
              FOOD
            </h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}> Logout </span>
          ) : (
            <Link className="Link" to="/login"> 
            Login 
            </Link>
          )}
          <span className="write">
            <Link className="Link" to="/write"> Write </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar