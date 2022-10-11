chrome.runtime.onMessage.addListener(async (response, callback) => {
    if (response.message === "start Membre-Groupe") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { message: "start_membre_groupe" },
                function (response) {
                    console.log("message sent");
                }
            );
        });
    }
});