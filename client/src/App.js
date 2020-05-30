import React, {useEffect, useState} from 'react';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import {message} from "antd";

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
import RemoveUser from '~/views/dash/RemoveUser';
import Sandbox from '~/views/dash/Sandbox';
import CastSandbox from '~/views/dash/CastSandbox';
import About from '~/views/dash/About';

import {post} from '~/helpers/api';

function App({history}) {
    const [userCount, setUserCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserCount();
    }, []);


    async function getUserCount() {
        try {
            const response = await post({}, 'userCount');
            setUserCount(response.data.size);
            setLoading(false)
        } catch (e) {
            message.error(e.message);
        }
    }

    if(loading) return <Loading/>;

    if(userCount >= 1) {
        return (
            <Dashboard>
                <MenuNav/>
                <Switch>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/configuration" exact component={Configuration}/>
                    <Route path="/addUser" exact component={AddUser}/>
                    <Route path="/removeUser" exact component={RemoveUser}/>
                    <Route path="/sandbox" exact component={Sandbox}/>
                    <Route path="/castsandbox" exact component={CastSandbox}/>
                    <Route path="/about" exact component={About}/>
                    <Redirect to="/home" />
                </Switch>
            </Dashboard>
        )
    }

    return (
        <Setup>
            <Switch>
                <Route path="/setup" exact component={() => <SetupWiz getUserCount={() => getUserCount()}/>}/>
                <Redirect to="/setup" />
            </Switch>
        </Setup>
    );
}

export default withRouter(App);
