export function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        cordova.plugin.http.get(url, {}, {}, response => resolve(JSON.parse(response.data)), reject)
    })
}

export function fetchDOM(url) {
    return new Promise((resolve, reject) => {
            cordova.plugin.http.get(url, {}, {}, response => {
                    resolve(new DOMParser().parseFromString(response.data, "text/html"))
                },
                reject
            )
        }
    )
}

export async function fetchLogin(url, data) {
    cordova.plugin.http.setFollowRedirect(false);
    return new Promise((resolve, reject) => {
        cordova.plugin.http.sendRequest(url, {
            method: "POST",
            data,
            followRedirect: false
        }, response => {
            resolve(false)
        }, response => {
            resolve(true)
        })
    })
}

