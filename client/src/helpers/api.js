import axios from 'axios';

export const post = async function(data, url) {
    return axios({
        method: "post",
        url: `http://localhost:3000/server/${url}`,
        data
    });
};