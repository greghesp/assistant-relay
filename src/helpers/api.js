import axios from 'axios';
import { Cookies } from 'react-cookie';

export function post(url, data) {
  const cookies = new Cookies();
  return axios({
    method: 'post',
    url,
    data,
    headers: {
      Authorization: cookies.get('token') || null,
    },
  });
}
