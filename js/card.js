async function get_card_info (card_id) {
    if(localStorage.api_access_allowed !== "true"){
        throw Error("License is not accected");
    };

    let card = await fetch("https://kutahyakartapi.abys-web.com/api/card/usercardinfocore", {
    "credentials": "omit",
    "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "Sec-GPC": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site"
    },
    "body": `{\"queryParam\":\"${card_id}\"}`,
    "method": "POST",
    "mode": "cors"
    });
    return await card.json();
}
