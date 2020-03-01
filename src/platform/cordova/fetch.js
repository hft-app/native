export function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    cordova.plugin.http.get(url, {}, {}, response => resolve(JSON.parse(response.data)), reject)
  })
}

export function fetchDOM(url) {
  return new Promise((resolve, reject) => {
      cordova.plugin.http.get(url, {}, {},
        response => {
          resolve(new DOMParser().parseFromString(response.data, 'text/html'))
        },
        response => {
          if (response.status === 503) {
            reject({type: 'maintenance'})
          } else {
            reject(response)
          }
        }
      )
    }
  )
}

export async function fetchLogin(url, data) {
  cordova.plugin.http.setFollowRedirect(false);
  return new Promise((resolve, reject) => {
    cordova.plugin.http.sendRequest(url, {
        method: 'POST',
        data,
        followRedirect: false
      },
      () => {
        resolve(false)
      },
      response => {
        if (response.status === 503) {
          reject({type: 'maintenance'})
        } else {
          resolve(true) // We get an error on redirect
        }
      })
  })
}

