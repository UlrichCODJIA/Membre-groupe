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

// chrome.runtime.onMessage.addListener((response, callback) => {
//     switch (response.message) {
//         case "first_users_uid_and_cursor":
//             download(response.first_user_list, Object.keys(response.first_user_list).length);
//             break;
//         case "error":
//             var h5 = document.createElement("h5");
//             h5.appendChild(document.createTextNode(`Error: ${response.error_msg}`));
//             document.body.children[0].insertBefore(
//                 h5,
//                 document.body.children[0].children[5]
//             );
//             break;
//         case "partial_error":
//             var h5 = document.createElement("h5");
//             h5.appendChild(document.createTextNode(`Error: ${response.error_msg}`));
//             document.body.children[0].insertBefore(
//                 h5,
//                 document.body.children[0].children[5]
//             );
//             download(response.first_user_list, Object.keys(response.first_user_list).length);
//             break;
//     }
// });

// function onStartedDownload(id) {
//     console.log(`Started downloading: ${id}`);
// }

// function onFailed(error) {
//     console.log(`Download failed: ${error}`);
// }

// function download(profiles_hrefs, profiles_href_length) {
//     var time = setInterval(() => {
//         if (profiles_href_length == Object.keys(profiles_hrefs).length) {
//             clearInterval(time);
//             var allEntries = "";
//             for (const i in profiles_hrefs) {
//                 allEntries = allEntries.concat(i + " : " + profiles_hrefs[i] + "\n");
//                 var no = document.createElement("td");
//                 var no_text = document.createTextNode(i);
//                 no.appendChild(no_text);
//                 var uid = document.createElement("td");
//                 var uid_text = document.createTextNode(profiles_hrefs[i]);
//                 uid.appendChild(uid_text);
//                 var tr = document.createElement("tr");
//                 tr.appendChild(no);
//                 tr.appendChild(uid);
//                 var element = document.getElementById("list_of_uid");
//                 element.appendChild(tr);
//             }
//             const now = new Date();
//             loader.style.display = "none";
//             const blob = new Blob([allEntries], {
//                 type: "text/plain",
//             });
//             var url = URL.createObjectURL(blob);
//             chrome.downloads
//                 .download({
//                     url: url,
//                     filename:
//                         "Membre-Groupe/" +
//                         "Report-" +
//                         now.getFullYear() +
//                         "-" +
//                         now.getMonth() +
//                         "-" +
//                         now.getDate() +
//                         " at " +
//                         now.getHours() +
//                         "_" +
//                         now.getMinutes() +
//                         "_" +
//                         now.getMilliseconds() +
//                         ".txt",
//                     conflictAction: "uniquify",
//                 })
//                 .then(onStartedDownload, onFailed);
//             /* Create worksheet from HTML DOM TABLE */
//             var wb = XLSX.utils.table_to_book(document.getElementById("uid_table"));
//             /* Export to file (start a download) */
//             XLSX.writeFile(
//                 wb,
//                 "Membre-Groupe/" +
//                 "Report-" +
//                 now.getFullYear() +
//                 "-" +
//                 now.getMonth() +
//                 "-" +
//                 now.getDate() +
//                 " at " +
//                 now.getHours() +
//                 "_" +
//                 now.getMinutes() +
//                 "_" +
//                 now.getMilliseconds() +
//                 ".xlsx"
//             );
//         }
//     });
// }
