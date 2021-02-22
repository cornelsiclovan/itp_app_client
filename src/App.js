import React from 'react';
import MainNavigation from './Navigation/MainNavigation';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import NewDieselForm from './pages/NewDieselForm';
import NewGasForm from './pages/NewGasForm';

const App = () => {
    let routes = (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/editeaza_diesel/:ral_rpm/:reg_rpm/:tbaza_s/:k_m/:filename" exact>
                <NewDieselForm />
            </Route>
            <Route path="/editeaza_benzina/:type/:id/:filename/:tur_rpm_1/:tur_rpm_2/:temp_c_1/:temp_c_2" exact>
                <NewGasForm />
            </Route>
            <Route path="/finalizeaza" exact>
                
            </Route>
        </Switch>
    );

    return (
        <Router>
            <MainNavigation />
            <main>
                {routes}
            </main>
        </Router>
    )   
} 

export default App;
