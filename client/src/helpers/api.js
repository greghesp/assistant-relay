import axios from 'axios';

export const post = async function(data, url) {
    const p = await localStorage.getItem('port');
    console.log("storage", p)
    const port = p ? p : '3000';
    console.log(port)

    return axios({
        method: "post",
        url: `http://localhost:${port}/server/${url}`,
        data
    });
};