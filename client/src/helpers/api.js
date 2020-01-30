import axios from 'axios';

export const post = async function(data, url) {
    if(process.env.REACT_APP_DEV_SERVER) {
        return axios.post(`${process.env.REACT_APP_DEV_SERVER}/server/${url}`, data);
    }
    return axios.post(`/server/${url}`, data);
};

export const get = async function(data, url) {
    if(process.env.REACT_APP_DEV_SERVER) {
        return axios.get(`${process.env.REACT_APP_DEV_SERVER}/server/${url}`, data);
    }
    return axios.get(`/server/${url}`, data);
};

export const sandbox = async function(data) {
    if(process.env.REACT_APP_DEV_SERVER) {
        return axios.post(`${process.env.REACT_APP_DEV_SERVER}/assistant`, data);
    }

    return axios.post('/assistant', data);
};