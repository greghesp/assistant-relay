import axios from 'axios';

export const post = async function(data, url) {
    const p = await localStorage.getItem('port');
    const i = await localStorage.getItem('ip');

    const port = p ? p : '3000';
    const ip = i ? i : '127.0.0.1';

    return axios({
        method: "post",
        url: `http://${ip}:${port}/server/${url}`,
        data
    });
};

export const sandbox = async function(data) {
    const p = await localStorage.getItem('port');
    const i = await localStorage.getItem('ip');

    const port = p ? p : '3000';
    const ip = i ? i : '127.0.0.1';

    return axios({
        method: "post",
        url: `http://${ip}:${port}/assistant`,
        data
    });
};