import React, {useEffect, useState} from "react";
import Sound from "react-sound";
import {Button, Icon} from "antd";

function PlayButton({timestamp, url}) {
    const [status, setStatus] = useState("STOPPED");
    const [port, setPort] = useState();
    const [ip, setIp] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        getPort()
    },[]);

    async function getPort() {
        const p = await localStorage.getItem('port');
        const i = localStorage.getItem('ip');

        const port = p ? p : '3000';
        const ip = i ? i : '127.0.0.1';
        setPort(port);
        setIp(ip);
        setLoading(false)
    }

    function PlayStop() {
        if(status === "STOPPED") return setStatus("PLAYING");
        return setStatus("STOPPED")
    }

    if(loading) return (<div></div>);

    return (
        <div>
            <Sound
                url={url ? url : `/server/audio?v=${timestamp}`}
                onFinishedPlaying={() => PlayStop()}
                playStatus={status}
            />
            <Button
                shape="circle"
                size="large"
                onClick={() => PlayStop()}>
                {status === "PLAYING" ? <Icon type="pause-circle" theme="filled" /> : <Icon type="play-circle" theme="filled" />}
            </Button>
        </div>
    )
}

export default PlayButton;
