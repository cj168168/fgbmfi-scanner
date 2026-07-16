const API_URL =
"https://script.google.com/macros/s/AKfycbyMRyk-hHScu_j1d5xggDu_jY-xd70e5SHcqiBztwnEAfr0WzSHynQ2vvi5k-9YeCmM/exec?page=api";

async function previewMember(memberId){

    try{

        console.log("Preview :", memberId);

        const res = await fetch(

            API_URL +
            "&action=preview" +
            "&memberId=" +
            encodeURIComponent(memberId)

        );

        console.log("Status :", res.status);

        const data = await res.json();

        console.log(data);

        showGuest(data);

    }catch(err){

        console.error(err);

        alert(err);

    }

}

async function checkInMember(memberId){

    const res = await fetch(

        API_URL +
        "&action=checkin" +
        "&memberId=" +
        encodeURIComponent(memberId)

    );

    return await res.json();

}
