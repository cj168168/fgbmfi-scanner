const API_URL =
"https://script.google.com/macros/s/AKfycbyMRyk-hHScu_j1d5xggDu_jY-xd70e5SHcqiBztwnEAfr0WzSHynQ2vvi5k-9YeCmM/exec?page=api";


// ============================
// API REQUEST
// ============================

async function apiRequest(
  action,
  memberNo
) {

  const url =
    API_URL +
    "&action=" +
    encodeURIComponent(action) +
    "&memberId=" +
    encodeURIComponent(memberNo) +
    "&t=" +
    Date.now();


  console.log(
    "API REQUEST:",
    url
  );


  const res =
    await fetch(
      url,
      {
        method: "GET",
        redirect: "follow",
        cache: "no-store"
      }
    );


  const text =
    await res.text();


  console.log(
    "API RAW RESPONSE:",
    text
  );


  if (!res.ok) {

    throw new Error(
      "API HTTP " +
      res.status
    );

  }


  try {

    return JSON.parse(text);

  }
  catch (err) {

    console.error(
      "API bukan JSON:",
      text
    );

    throw new Error(
      "Apps Script API tidak mengembalikan JSON"
    );

  }

}


// ============================
// PREVIEW MEMBER
// ============================

async function previewMember(
  memberNo
) {

  try {

    const data =
      await apiRequest(
        "preview",
        memberNo
      );


    console.log(
      "PREVIEW RESULT:",
      data
    );


    // PENTING:
    // No dari QR kita kirim sendiri
    // Jangan bergantung pada
    // data.memberId dari API

    data.scannedMemberNo =
      String(memberNo);


    showGuest(
      data,
      memberNo
    );


    return data;

  }
  catch (err) {

    console.error(err);

    const status =
      document.getElementById(
        "status"
      );


    if (status) {

      status.innerText =
        err.message;

    }


    throw err;

  }

}


// ============================
// CHECK-IN MEMBER
// ============================

async function checkInMember(
  memberNo
) {

  console.log(
    "CHECK-IN NO:",
    memberNo
  );


  return await apiRequest(
    "checkin",
    memberNo
  );

}
