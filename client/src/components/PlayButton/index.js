import React, {useEffect, useState} from "react";
import Sound from "react-sound";
import {Button, Icon} from "antd";

function PlayButton({timestamp, url}) {
    const [status, setStatus] = useState("STOPPED");
    const [port, setPort] = useState("STOPPED");


    useEffect(() => {
        getPort()
    },[]);

    async function getPort() {
        const p = await localStorage.getItem('port');
        setPort(p)
    }

    function PlayStop() {
        if(status === "STOPPED") return setStatus("PLAYING")
        return setStatus("STOPPED")
    }

    return (
        <div>
            <Sound
                url={url ? url : `http://localhost:${port}/server/audio?v=${timestamp}`}
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