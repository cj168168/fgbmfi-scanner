const API_URL =
"https://script.google.com/macros/s/AKfycbzk78w5BqDWSPOmCsNJe_QfMwVvqhsFD0HLe4ypCb0zt3SEDbF-RvvZyw1tkrLDWWXolQ/exec?page=api";

async function previewMember(memberId){

    const res = await fetch(

        API_URL +
        "&action=preview&memberId=" +
        encodeURIComponent(memberId)

    );

    return await res.json();

}

async function checkInMember(memberId){

    const res = await fetch(

        API_URL +
        "&action=checkin&memberId=" +
        encodeURIComponent(memberId)

    );

    return await res.json();

}
