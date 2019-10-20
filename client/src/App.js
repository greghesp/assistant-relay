import React, {useEffect, useState} from 'react';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Menu, {message} from "antd";

/* Layouts */
import Setup from '~/layout/Setup';
import Dashboard from "~/layout/Dashboard";
import Loading from "~/layout/Loading";

/* Views */
import SetupWiz from '~/views/setup';
import MenuNav from '~/views/dash/Menu';
import Home from '~/views/dash/Home';
import Configuration from '~/views/dash/Configuration';
import AddUser from '~/views/dash/AddUser';
import Sandbox from '~/views/dash/Sandbox';

import {post} from '~/helpers/api';

function App() {
    const [userCount, setUserCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserCount();
    }, []);

    async function getUserCount() {
        try {
            const response = await post({}, 'userCount');
            if(response.data.size <= 0) await post({}, 'init');
            setUserCount(response.data.size);
            setLoading(false)
        } catch (e) {
            message.error(e.message);
        }
    }

    if(loading) return <Loading/>;

    if(userCount > 0) {
        return (
            <Dashboard>
                <MenuNav/>
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/configuration" component={Configuration}/>
                    <Route path="/addUser" component={AddUser}/>
                    <Route path="/sandbox" component={Sandbox}/>
                    <Redirect to="/home" />
                </Switch>
            </Dashboard>
        )
    }

    return (
        <Setup>
            <Switch>
                <Route path="/setup" component={SetupWiz}/>
                <Redirect to="/setup" />
            </Switch>
        </Setup>

    );
}

export default withRouter(App);
