import React, {useEffect} from "react";
import { useParams } from 'react-router'
import qs from 'query-string'
import {post} from '~/helpers/api'

function Auth({location}) {
    useEffect(() => {
        console.log(qs.parse(location.search))
    })

    async function authenticate() {
        // await post({
        //     name: name,
        //     oauthCode: values.oauthCode
        // }, 'processOAuth');
    }

    return (
        <div>Authenticating, please wait</div>
    )
}


export default Auth;
