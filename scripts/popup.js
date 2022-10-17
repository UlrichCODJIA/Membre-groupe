const get_uid_btn = document.getElementById("get_uid");
const loader = document.getElementById("load");

function start() {
    loader.style.display = "block";
    chrome.runtime.sendMessage(
        { message: "start Membre-Groupe" },
        function (response) {
            console.log("start Membre-Groupe");
        }
    );
}

get_uid_btn.addEventListener("click", start);
