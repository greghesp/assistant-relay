import React, {useEffect, useState} from "react";
import * as Styles from './styles';
import {post} from '~/helpers/api';
import LoadingAnimation from "~/components/LoadingAnimation";
import PlayButton from "~/components/PlayButton";
import {message, Button, Icon} from "antd";
import { DashboardOutlined } from '@ant-design/icons';

import Sound from 'react-sound'

function Home(){
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getResponses();
    },[]);

    async function getResponses() {
        try {
            const resp = await post({}, 'getResponses');
            setResponses(resp.data.responses);
            setLoading(false);
        } catch (e) {
            message.error(e.message);
        }
    }

    if(loading) return (
        <Styles.Loading>
            <div>
                <LoadingAnimation/>
            </div>
        </Styles.Loading>
    );
    return (
        <Styles.Container>
            <div>
                <Responses data={responses}/>
            </div>
        </Styles.Container>)
}

function Responses({data}) {
    if(data.length === 0) return <p>No responses yet</p>;
    return (
        data.map(r => {
            return (
                <Styles.ResponseContainer key={r.timestamp}>
                    <Styles.Play>
                        <PlayButton timestamp={r.timestamp}/>
                    </Styles.Play>
                    <Styles.Play>
                        <Button type="primary" shape="circle" icon={<DashboardOutlined />} href={`/server/html?v=${r.timestamp}`}/>
                    </Styles.Play>
                    <Styles.QuoteWrapper>
                        {r.command}
                    </Styles.QuoteWrapper>
                    <Styles.Response>
                        {r.response.length > 0 ?
                            <ResponseText t={r.response}/>
                            : "No text response given, click play to hear the audio" }
                    </Styles.Response>
                </Styles.ResponseContainer>

            )
        })
    )
}

function ResponseText({t}) {
    return t.split('\n').map((text, index) => (
        <React.Fragment key={`${text}-${index}`}>
            {text}
            <br />
        </React.Fragment>
    ))
}


export default Home;