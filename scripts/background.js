chrome.runtime.onMessage.addListener(async (response, callback) => {
    if (response.message === "start Membre-Groupe") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { message: "start_membre_groupe" },
            );
        });
    }
});

chrome.runtime.onMessage.addListener((response, callback) => {
    if (response.message == "first_users_uid_and_cursor") {
        download(response.url);
    }
});

function onStartedDownload(id) {
    console.log(`Started downloading: ${id}`);
}

function onFailed(error) {
    console.log(`Download failed: ${error}`);
}

function download(url) {
    const now = new Date();
    console.log(url);
    chrome.downloads
        .download({
            url: url,
            filename:
                "Membre-Groupe/" +
                "Report-" +
                now.getFullYear() +
                "-" +
                now.getMonth() +
                "-" +
                now.getDate() +
                " at " +
                now.getHours() +
                "_" +
                now.getMinutes() +
                "_" +
                now.getMilliseconds() +
                ".txt",
            conflictAction: "uniquify",
        })
        .then(onStartedDownload, onFailed);
}