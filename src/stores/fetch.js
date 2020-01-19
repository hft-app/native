export function fetchJSON(url) {
    if (window.cordova) {
        return new Promise((resolve, reject) => {
            cordova.plugin.http.get(url, {}, {}, response => resolve(JSON.parse(response.data)), reject)
        })
    } else {
        //XXX DEV ONLY
        return fetch(url)
            .then(response => response.json())
    }
}

export function fetchDOM(url) {
    if (window.cordova) {
        return new Promise((resolve, reject) => {
            cordova.plugin.http.get(url, {}, {}, response =>
                    resolve(new DOMParser().parseFromString(response.data, "text/html"))
                , reject)
        })
    } else {
        //XXX DEV ONLY
        return fetch(url)
            .then(response => response.text())
            .then(text => new DOMParser().parseFromString(text, "text/html"))
    }
}

export function parseDate(date) {
    let parts = date.trim().split(".");
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
}
