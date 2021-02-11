import React from 'react';
import { NavLink } from 'react-router-dom';
import MainHeader from './MainHeader';

import './NavLinks.css';

const NavLinks = props => {
   
      return (
            // <ul >
            //     <a className="nav-links button" href="/test">
            //         <li  >MERGI MAI DEPARTE</li>
            //     </a>
                
            //     <a className="nav-links button"  href="/altul">
            //         <li>MERGI MAI DEPARTE</li>
            //     </a>
            // </ul>

           <ul className="nav-links">
                <li>
                    <NavLink to="/acasa">
                        ACASA
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/editeaza_diesel">
                        EDITEAZA DIESEL
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/editeaza_benzina">
                        EDITEAZA BENZINA
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/finalizeaza">
                        FINALIZEAZA
                    </NavLink>
                </li>
           </ul>
        );
};

export default NavLinks;