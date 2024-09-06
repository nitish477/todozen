import React from 'react';
import logo from './../../asset/Black White Yellow Simple Initial Name Logo.png';
import './Navbar.css';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SiAboutdotme } from "react-icons/si";
import { MdContactMail } from "react-icons/md";
function Navbar() {
  const list = [
    { name: 'Home', link: '/', icon: <FaHome /> },
    { name: 'About', link: '/about' ,icon: <SiAboutdotme />},
    { name: 'Contact', link: '/contact' ,icon: <MdContactMail />},
  ];

  return (
    <nav className='nav-bar'>
      <div className='list-container'>
      <div>
     <Link to={"/"}> <img src={logo} className='logo' alt='Logo' /></Link>
      </div>
       <div>
       <ul className='list'>
          {list.map((item, index) => (
            <li key={index} className='list-item'>
              <Link to={item.link} className='nav-link'>
                {item.icon && <span className='nav-icon'>{item.icon}</span>}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
       </div>
      </div>
    </nav>
  );
}

export default Navbar;
