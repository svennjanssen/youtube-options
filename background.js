var active = true;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (!active || changeInfo.status !== 'complete')
        return;

    var regex = new RegExp('https:\/\/www\.youtube\.com\/watch?.*');

    if (!regex.test(tab.url))
        return;

    chrome.tabs.insertCSS(tabId, {
        "file": "css/hide-elements.css"
    })
})

chrome.browserAction.onClicked.addListener(function(tab) {
    active = !active;

    chrome.tabs.insertCSS(tab.id, {
        "file": `css/${active ? 'hide-elements' : 'show-elements'}.css`
    })

    chrome.browserAction.setIcon({
        path: `images/${active ? 'iconActive' : 'iconInactive'}.png`
    });
});