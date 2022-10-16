const group_member_count = parseInt(/group_member_profiles":{"count":([^"]+),/g.exec(document.body.innerHTML)[1]);

chrome.runtime.onMessage.addListener((response, callback) => {
    if (response.message == "start_membre_groupe") {
        console.log(
            "%cStart Membre-Groupe",
            "color: white; font-weight: 900; font-size: 25px; background-color: blue;padding: 2px"
        );
        if (group_member_count < 12500) {
            console.log("%cYou need to wait approximatively 10min or less for the extraction to finish.", "font-weight: 900; font-size: 20px")
        } else {
            console.log(`%cYou need to wait approximatively ${(Math.round(group_member_count / 10000) * 10) + ((Math.round(group_member_count / 10000) - 1) * 30)}min or less for the extraction to finish.`, "font-weight: 900; font-size: 20px");
        };
        get_first_uid_and_cursor();
    }
});

function* range(start = 0, end = null, step = 1) {
    if (end == null) {
        end = start;
        start = 0;
    }

    for (let i = start; i < end; i += step) {
        yield i;
    }
}

var numbers = Array.from(range(10000, 1010000, 10000));

async function user_get_request_waiter(firsts_users_uid, cursor, group_id_and_id, doc_id, lsd, __spin_t, __spin_b, __rev_and__spin_r, fb_dtsg, __hsi, jazoest, __comet_req, __user, __a) {
    console.clear();
    console.log(
        "%cWaiting 30 minutes to continue extraction",
        "color: white; font-weight: 900; font-size: 25px; background-color: blue;padding: 2px"
    );

    const asyncUppercase = item =>
        new Promise(resolve =>
            setTimeout(
                () => resolve(item.toUpperCase())
                , 1800000)
        );

    if (Object.keys(firsts_users_uid).length < numbers.slice(-1)[0] && numbers[0] <= group_member_count + 41000) {
        const uppercaseItem = await asyncUppercase('a');
        console.clear();
        get_uid(progressCallback, firsts_users_uid, cursor, group_id_and_id, doc_id, lsd, __spin_t, __spin_b, __rev_and__spin_r, fb_dtsg, __hsi, jazoest, __comet_req, __user, __a, Object.keys(firsts_users_uid).length + 10000)
            .then(result => {
                if (result.cursor != undefined) {
                    var cursor_res = result.cursor;
                    var firsts_users_uid_res = result.first_user_list;
                    numbers.shift();
                    user_get_request_waiter(firsts_users_uid_res, cursor_res, group_id_and_id, doc_id, lsd, __spin_t, __spin_b, __rev_and__spin_r, fb_dtsg, __hsi, jazoest, __comet_req, __user, __a, Object.keys(firsts_users_uid_res).length + 10000);
                } else if (result.error != undefined) {
                    chrome.runtime.sendMessage(
                        { message: "partial_error", error_msg: result.error, first_user_list: result.first_user_list },
                        function (response) {
                            console.log(
                                `%c${result.error.toUpperCase()}. RETRY WHEN THIS FEATURE WILL BE UNLOCKED`,
                                "color: red; font-weight: 900; font-size: 25px;padding: 2px"
                            );
                        }
                    );
                } else {
                    chrome.runtime.sendMessage(
                        { message: "first_users_uid_and_cursor", first_user_list: result },
                        function (response) { }
                    );
                }
            })
            .catch(console.error);
    } else {
        chrome.runtime.sendMessage(
            { message: "error", error_msg: "ERROR TRYING TO GET THE DATAS" },
            function (response) {
                console.log(
                    "%cERROR!!! PLEASE RETRY OR CONTACT ME",
                    "color: red; font-weight: 900; font-size: 25px;padding: 2px"
                );
            }
        );
    };
}

async function get_first_uid_and_cursor() {
    const firsts_users_raw_datas = document.body.innerHTML.matchAll(/":{"__typename":"User","id":"([^"]+)","__isProfile":"User","name":"([^"]+)"/g);
    const analyze = /\?__a=([^"]+)&__user=([^"]+)&__comet_req=([^"]+)&jazoest=([^"]+)","e":"([^"]+)","s":"([^"]+)","w":([^"]+),"f":"([^"]+)","l":null}/.exec(document.head.innerHTML);
    const __a = analyze[1];
    const __user = analyze[2];
    const __comet_req = analyze[3];
    const jazoest = analyze[4];
    const __hsi = analyze[5];
    const fb_dtsg = analyze[8].replaceAll(":", "%3A");

    const analyze1 = /"__spin_r":([^"]+),"__spin_b":"([^"]+)","__spin_t":([^"]+),"vip"/.exec(document.body.innerHTML);
    const __rev_and__spin_r = analyze1[1];
    const __spin_b = analyze1[2];
    const __spin_t = analyze1[3];
    const group_id_and_id = /","group":{"id":"([^"]+)","featurable_title"/g.exec(document.body.innerHTML)[1];

    const lsd = /"LSD",([^"]+),{"token":"([^"]+)"}/.exec(document.body.innerHTML)[2];

    var scripts_ = [];
    var doc_id;
    await fetch(window.location.href)
        .then((response) => {
            return response.text();
        })
        .then(async (data) => {
            const all = data.matchAll(/([^"]+rsrc\.php\/[^"]+\.js[^"]+)/g);
            for (const elmt of all) {
                scripts_.push(elmt)
            };
            for (const url of scripts_) {
                await fetch(url[1])
                    .then((response) => {
                        return response.text();
                    })
                    .then((text) => {
                        let doc_id_regex_test = /__d\("GroupsCometMembersPageNewForumMembersSectionRefetchQuery_facebookRelayOperation",\[],\(function\(a,b,c,d,e,f\)\{e\.exports="([A-Za-z0-9]+)"\}\),null\);/.exec(text);
                        if (doc_id_regex_test != undefined) {
                            doc_id = doc_id_regex_test[1];
                        }
                    })
            };
        })

    var firsts_users_uid = {};
    for (const datas of firsts_users_raw_datas) {
        firsts_users_uid[datas[2]] = datas[1];
    }
    var cursor = /{"has_next_page":true,"end_cursor":"([^"]+)"}}/.exec(document.body.innerHTML);

    if (Object.keys(firsts_users_uid).length != 0 && cursor != null) {
        console.clear();
        console.log(
            "%cExtracting",
            "color: white; font-weight: 900; font-size: 25px; background-color: blue;padding: 2px"
        );
        get_uid(progressCallback, firsts_users_uid, cursor[1], group_id_and_id, doc_id, lsd, __spin_t, __spin_b, __rev_and__spin_r, fb_dtsg, __hsi, jazoest, __comet_req, __user, __a, 10000)
            .then(result => {
                if (result.cursor != undefined) {
                    cursor = result.cursor;
                    firsts_users_uid = result.first_user_list;
                    user_get_request_waiter(firsts_users_uid, cursor, group_id_and_id, doc_id, lsd, __spin_t, __spin_b, __rev_and__spin_r, fb_dtsg, __hsi, jazoest, __comet_req, __user, __a);
                } else if (result.error != undefined) {
                    chrome.runtime.sendMessage(
                        { message: "partial_error", error_msg: result.error, first_user_list: result.first_user_list },
                        function (response) {
                            console.log(
                                `%c${result.error.toUpperCase()}. RETRY WHEN THIS FEATURE WILL BE UNLOCKED`,
                                "color: red; font-weight: 900; font-size: 25px;padding: 2px"
                            );
                        }
                    );
                } else {
                    chrome.runtime.sendMessage(
                        { message: "first_users_uid_and_cursor", first_user_list: result },
                        function (response) { }
                    );
                }
            })
            .catch(console.error);
    } else {
        chrome.runtime.sendMessage(
            { message: "error", error_msg: "ERROR TRYING TO GET THE DATAS" },
            function (response) {
                console.log(
                    "%cERROR!!! PLEASE RETRY OR CONTACT ME",
                    "color: red; font-weight: 900; font-size: 25px;padding: 2px"
                );
            }
        );
    };
}

function getElementsByXPath(xpath, parent) {
    let results = [];
    let query = document.evaluate(
        xpath,
        parent || document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}

function get_uid(progress, first_user_list, cursor, group_id_and_id, doc_id, lsd, __spin_t, __spin_b, __rev_and__spin_r, fb_dtsg, __hsi, jazoest, __comet_req, __user, __a, length_check) {

    const payload = `av=${__user}&__user=${__user}&__a=${__a}&__dyn=&__csr=&__req=&__hs=19276.HYP%3Acomet_pkg.2.1.0.2.1&dpr=1.5&__ccg=EXCELLENT&__rev=${__rev_and__spin_r}&__s=&__hsi=${__hsi}&__comet_req=${__comet_req}&fb_dtsg=${fb_dtsg}&jazoest=${jazoest}&lsd=${lsd}&__spin_r=${__rev_and__spin_r}&__spin_b=${__spin_b}&__spin_t=${__spin_t}&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=GroupsCometMembersPageNewForumMembersSectionRefetchQuery&variables=%7B%22count%22%3A10%2C%22cursor%22%3A%22${cursor}%22%2C%22groupID%22%3A%22${group_id_and_id}%22%2C%22scale%22%3A1.5%2C%22id%22%3A%22${group_id_and_id}%22%7D&server_timestamps=true&doc_id=${doc_id}`;
    const myHeaders = new Headers({
        'scheme': 'https',
        'accept': '*/*',
        'content-type': 'application/x-www-form-urlencoded',
        'referer': window.location.href,
    });
    const myOptions = {
        method: "POST",
        headers: myHeaders,
        body: payload,
        mode: "cors",
    };
    const myRequest = new Request('https://www.facebook.com/api/graphql/');
    return new Promise((resolve, reject) => fetch(myRequest, myOptions)
        .then(response => {
            if (response.status !== 200) {
                throw `${response.status}: ${response.statusText}`;
            }
            response.json().then(json => {
                console.log(json);
                try {
                    var new_forum_members = json.data.node.new_forum_members;
                    var user_list = new_forum_members.edges;
                    for (var i = 0; i < user_list.length; i++) {
                        first_user_list[user_list[i].node.name] = user_list[i].node.id;
                    };
                } catch(err) {};
                if (new_forum_members != undefined && new_forum_members.page_info.has_next_page == true && Object.keys(first_user_list).length < length_check) {
                    cursor = new_forum_members.page_info.end_cursor
                    progress && progress(first_user_list);
                    get_uid(progress, first_user_list, cursor, group_id_and_id, doc_id, lsd, __spin_t, __spin_b, __rev_and__spin_r, fb_dtsg, __hsi, jazoest, __comet_req, __user, __a, length_check)
                        .then(resolve)
                        .catch(reject)
                } else if (new_forum_members != undefined && new_forum_members.page_info.has_next_page == true && Object.keys(first_user_list).length >= length_check) {
                    const new_etat = {};
                    new_etat['cursor'] = new_forum_members.page_info.end_cursor;
                    new_etat['first_user_list'] = first_user_list;
                    progress && progress(first_user_list);
                    resolve(new_etat);
                } else if (json.errors != undefined) {
                    const new_etat = {};
                    new_etat['error'] = json.errors[0].message;
                    new_etat['first_user_list'] = first_user_list;
                    progress && progress(first_user_list);
                    resolve(new_etat);
                } else {
                    resolve(first_user_list);
                }
            }).catch(reject);
        }).catch(reject));
}

function progressCallback(first_user_list) {
    // render progress
    console.log(`${Object.keys(first_user_list).length} loaded`);
}