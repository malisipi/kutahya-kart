var license_dialog = document.querySelector("md-dialog.license");

license_dialog.querySelector(".accept").addEventListener("click", () => {
    license_dialog.close();
    localStorage.license_accepted = "true";
    document.body.setAttribute("license-accepted", true);
});

license_dialog.querySelector(".deny").addEventListener("click", () => {
    license_dialog.close();
});

if(localStorage.license_accepted === "true") {
    document.body.setAttribute("license-accepted", true);
} else {
    license_dialog.show();
}

var api_access_dialog = document.querySelector("md-dialog.access");
api_access_dialog.querySelector(".accept").addEventListener("click", () => {
    api_access_dialog.close();
    localStorage.api_access_allowed = "true";
});

api_access_dialog.querySelector(".deny").addEventListener("click", () => {
    api_access_dialog.close();
});

var inputs = {
    card_id: document.querySelector(".card-id"),
    save_to_browser: document.querySelector(".save-to-browser")
};

if(localStorage.license_accepted === "true" && localStorage.api_access_allowed === "true" && localStorage?.saved_card?.length >= 4){
    inputs.card_id.value = localStorage.saved_card;
};

var card_info = {
    list: document.querySelector(".card-info")
};

card_info.card_owner_name = card_info.list.querySelector(".card-owner-name");
card_info.card_type = card_info.list.querySelector(".card-type");
card_info.card_available_balance = card_info.list.querySelector(".card-available-balance");
card_info.card_awaiting_balance = card_info.list.querySelector(".card-awaiting-balance");
card_info.card_last_use_date = card_info.list.querySelector(".card-last-use-date");
card_info.card_state = card_info.list.querySelector(".card-state");
card_info.card_visa_end_date = card_info.list.querySelector(".card-visa-end-date");
card_info.card_production_date = card_info.list.querySelector(".card-production-date");
card_info.card_validity_start_date = card_info.list.querySelector(".card-validity-start-date");
card_info.card_validity_end_date = card_info.list.querySelector(".card-validity-end-date");

document.querySelector(".check-card").addEventListener("click", async () => {
    if(localStorage.api_access_allowed === "true") {
        let card_id = inputs.card_id.value;

        if(card_id.length < 4) {
            throw Error("Card ID is too short");
        }

        if(inputs.save_to_browser.checked) {
            localStorage.saved_card = card_id;
        };

        var fetched_card_info = await get_card_info(card_id);

        if(fetched_card_info.statusCode == 200) {
            card_info.list.style.display = "";
            card_info.card_owner_name.innerText = fetched_card_info?.result?.[0]?.adi + " " + fetched_card_info?.result?.[0]?.soyadi;
            card_info.card_type.innerText = fetched_card_info?.result?.[0]?.kartTipiAciklama;
            card_info.card_available_balance.innerText = fetched_card_info?.result?.[0]?.guncelBakiye;
            card_info.card_awaiting_balance.innerText = fetched_card_info?.result?.[0]?.bekleyenBakiye;
            card_info.card_last_use_date.innerText = new Date(fetched_card_info?.result?.[0]?.sonIslemTarihi).toLocaleString();
            card_info.card_state.innerText = fetched_card_info?.result?.[0].kartDurumu;
            card_info.card_visa_end_date.innerText = new Date(fetched_card_info?.result?.[0]?.vizeGecerlilikTarihi).toLocaleString();
            card_info.card_production_date.innerText = new Date(fetched_card_info?.result?.[0]?.uretimTarihi).toLocaleString();
            card_info.card_validity_start_date.innerText = new Date(fetched_card_info?.result?.[0]?.gecerlilikBaslangicTarihi).toLocaleString();
            card_info.card_validity_end_date.innerText = new Date(fetched_card_info?.result?.[0]?.gecerlilikBitisTarihi).toLocaleString();
        } else {
            throw Error(fetched_card_info.message);
        };
    } else {
        api_access_dialog.show();
    }
});
