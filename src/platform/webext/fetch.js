export function fetchJSON(url) {
  return fetch(url)
    .then(response => response.json())
}

export function fetchDOM(url) {
  return fetch(url, {
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    }
  })
    .then(response => {
      if (response.status === 503) {
        throw {type: 'maintenance'}
      } else {
        return response.text();
      }
    }).then(text => new DOMParser().parseFromString(text, 'text/html'))
}

export async function fetchLogin(url, data) {
  const queryString = Object.entries(data)
    .map(pair => `${pair[0]}=${encodeURIComponent(pair[1])}`)
    .join('&');

  return fetch(url + '&' + queryString, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml',
    },
    redirect: 'manual',
  })
    .then(response => {
      if (response.status === 503) {
        throw {type: 'maintenance'}
      } else {
        return response.status === 0;
      }
    })
}
