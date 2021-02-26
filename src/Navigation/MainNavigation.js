import React from 'react';
import MainHeader from '../Navigation/MainHeader';
import NavLinks from '../Navigation/NavLinks';

import './MainNavigation.css';

const MainNavigation = () => {
    return (
        <React.Fragment>
            <MainHeader>
                <h1 className="main-navigation__title">DIAGNOZA</h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )
};
  
export default MainNavigation;