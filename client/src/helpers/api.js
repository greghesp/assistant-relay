import axios from 'axios';

export const post = async function(data, url) {
    const p = await localStorage.getItem('port');
    const port = p ? p : '3000';

    return axios({
        method: "post",
        url: `http://localhost:${port}/server/${url}`,
        data
    });
};

export const sandbox = async function(data) {
    const p = await localStorage.getItem('port');
    const port = p ? p : '3000';

    return axios({
        method: "post",
        url: `http://localhost:${port}/assistant`,
        data
    });
};