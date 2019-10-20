import React from 'react';
import { Switch, Redirect, Route } from "react-router";

import Menu from './Menu';
import Home from './Home';

function Dash() {
    return (
        <div>
            <Menu/>
            <Switch>
                <Route path="/dashboard" exact component={Home}/>
                <Redirect to="/dashboard" />
            </Switch>
        </div>
    )
};

export default Dash