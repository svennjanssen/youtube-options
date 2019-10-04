let active = true;

const supportedDomains =  [
    {
        domainRegex: new RegExp('https:\/\/www\.youtube\.com\/watch?.*'),
        hideCssPath: "css/hide-elements-youtube.css",
        showCssPath: "css/show-elements-animefreak.css"
    },
    {
        domainRegex: new RegExp('https:\/\/www\.animefreak\.tv\/watch\/.*'),
        hideCssPath: "css/hide-elements-animefreak.css",
        showCssPath: "css/show-elements-animefreak.css"
    }
];

chrome.tabs.onReplaced.addListener(function()  {
 console.log("onReplaced ");

})

chrome.tabs.onUpdated.addListener(function(tabId, _, tab) {
    if (!active)
        return;

    const cssPath = getCssPath(tab.url, true);

    if (cssPath)
        chrome.tabs.insertCSS(tabId, {
            "file": cssPath
        });
});

chrome.browserAction.onClicked.addListener(function(tab) {
    active = !active;

    chrome.browserAction.setIcon({
        path: `images/${active ? 'iconActive' : 'iconInactive'}.png`
    });
        
    const cssPath = getCssPath(tab.url, active);

    if (cssPath)
        chrome.tabs.insertCSS(tab.id, {
            "file": cssPath
        });
});

function getCssPath(url, hide) {
    for (var i = 0; i < supportedDomains.length; i++)
        if (supportedDomains[i].domainRegex.test(url))
            return hide 
            ? supportedDomains[i].hideCssPath
            : supportedDomains[i].showCssPath;

    return null;
};