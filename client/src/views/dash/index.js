import React from 'react';
import { Switch, Redirect, Route } from "react-router";

import Menu from './Menu';
import Home from './Home';

function Dash() {
    return (
        <div>
            <Menu/>
            <Switch>
                <Route path="/home"  component={Home}/>
                <Route path="/configuration"  component={Home}/>
                <Redirect to="/home" />
            </Switch>
        </div>
    )
};

export default Dash