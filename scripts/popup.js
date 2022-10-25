const loader = document.getElementById("load");
const get_uid_btn = document.getElementById("get_uid");


function start() {
    loader.style.display = "block";
    let next_cursor_data = document.forms["next_cursor_form"]["next_cursor_name"].value;;
    if (next_cursor_data == "") {
        chrome.runtime.sendMessage(
            { message: "start Membre-Groupe" },
        );
        console.log("start Membre-Groupe");
    } else {
        console.log(`next cursor : ${next_cursor_data}`)
        chrome.runtime.sendMessage(
            { message: "start Membre-Groupe", 'cursor': next_cursor_data },
        );
        console.log("start Membre-Groupe");
    }
}

get_uid_btn.addEventListener("click", start);

chrome.runtime.onMessage.addListener((response, callback) => {
    if (response.message == "continue_msg") {
        loader.style.display = "none";
        var h5 = document.createElement("h5");
        h5.appendChild(document.createTextNode(`Error: ${response.msg}`));
        document.body.children[0].insertBefore(
            h5,
            document.body.children[0].children[3].children[0]
        );
    }
});