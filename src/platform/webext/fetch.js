export function fetchJSON(url) {
    return fetch(url)
        .then(response => response.json())
}

export function fetchDOM(url) {
    return fetch(url, {
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        }
    })
        .then(response => response.text())
        .then(text => new DOMParser().parseFromString(text, "text/html"))
}

export async function fetchLogin(url, data) {
    const req = new XMLHttpRequest();
    const promise = new Promise(resolve => {
        req.onload = () => resolve(req.responseURL.indexOf("auth") === -1)
    });

    req.open("GET", url + "&" + Object.entries(data).map(pair => pair[0] + "=" + encodeURIComponent(pair[1])).join("&"));
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.overrideMimeType("text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8");
    req.send(Object.entries(data).map(pair => pair[0] + "=" + encodeURIComponent(pair[1])).join("&"));

    return promise;
}
