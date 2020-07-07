import fetch from 'isomorphic-fetch';

export default function (url) {
  return fetch(url).then(r => r.json());
}
