chrome.browserAction.onClicked.addListener(() => {
    chrome.tabs.create({
        active: true,
        url: "index.html"
    })
});
