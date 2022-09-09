console.log(`Developed by Yevhen Lebedenko @ 2022.`);

chrome.runtime.onInstalled.addListener(function (object) {
    let externalUrl = "https://ex.emojivibe.com/";

    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: externalUrl }).then().catch();
    }
});