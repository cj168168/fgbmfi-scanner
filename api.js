const API_URL =
"https://script.google.com/macros/s/AKfycbyMRyk-hHScu_j1d5xggDu_jY-xd70e5SHcqiBztwnEAfr0WzSHynQ2vvi5k-9YeCmM/exec?page=api";

async function apiRequest(action, memberId){
    const url = API_URL +
        "&action=" + encodeURIComponent(action) +
        "&memberId=" + encodeURIComponent(memberId);

    const res = await fetch(url, { method:"GET", redirect:"follow" });
    const text = await res.text();

    if(!res.ok){
        throw new Error("API HTTP " + res.status);
    }

    try{
        return JSON.parse(text);
    }catch(e){
        console.error("API response bukan JSON:", text);
        throw new Error("Endpoint Apps Script tidak mengembalikan JSON. Periksa deployment Web App/API.");
    }
}

async function previewMember(memberId){
    try{
        const data = await apiRequest("preview", memberId);
        showGuest(data);
        return data;
    }catch(err){
        console.error(err);
        const status = document.getElementById("status");
        if(status) status.innerText = err.message;
        throw err;
    }
}

async function checkInMember(memberId){
    return await apiRequest("checkin", memberId);
}
