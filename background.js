chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete')
        return;

    var regex = new RegExp('https:\/\/www\.youtube\.com\/watch?.*');

    if (!regex.test(tab.url))
        return;

    chrome.tabs.insertCSS(tabId, {
        "file": "hide-elements.css"
    })
})