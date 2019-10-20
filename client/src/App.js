import React, {useEffect, useState} from 'react';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import {message} from "antd";

/* Layouts */
import Setup from '~/layout/Setup';
import Dashboard from "~/layout/Dashboard";
import Loading from "~/layout/Loading";

/* Views */
import SetupWiz from '~/views/setup';
import Dash from '~/views/dash';

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
            console.log(response)
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
                <Switch>
                    <Route path="/dashboard" component={Dash}/>
                    <Redirect to="/dashboard" />
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
