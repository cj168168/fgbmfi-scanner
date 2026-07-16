let scanner;
let locked = false;

function startScanner(){

  locked = false;

  scanner = new Html5Qrcode("reader");

  scanner.start(
    { facingMode:"environment" },
    {
      fps:10,
      qrbox:250
    },
    onScanSuccess
  ).catch(function(err){

    document.getElementById("status").innerText =
      "Camera error: " + err;

  });

}

function onScanSuccess(decodedText){

  if(locked) return;
  locked = true;

  const parts = decodedText.split("|");

  if(parts.length !== 2){
    document.getElementById("status").innerText =
      "QR tidak valid";
    locked = false;
    return;
  }

  const eventCode = String(parts[0] || "").trim().toUpperCase();
  const rawNo = String(parts[1] || "").trim();

  if(eventCode !== "FGBMFI" || !/^\d{1,3}$/.test(rawNo)){
    document.getElementById("status").innerText =
      "QR FGBMFI tidak valid";
    locked = false;
    return;
  }

  // QR boleh FGBMFI|001, tetapi sheet Data kolom No tetap 1-200.
  // Apps Script menerima memberId = 1, 2, ... 200 agar cocok dengan kolom No.
  const noPeserta = String(parseInt(rawNo, 10));
  const eventId = encodeURIComponent(eventCode);
  const memberId = encodeURIComponent(noPeserta);

  const checkInUrl =
    "https://script.google.com/macros/s/AKfycby-fqecjb73al_AT8vmQoG9LWqPeEtyN_-WyjrJwkM2ph4Fdk95xK2NmhqqEM5GSfcehw/exec"
    + "?page=checkin"
    + "&eventId=" + eventId
    + "&memberId=" + memberId;

  scanner.stop().then(function(){
    window.location.href = checkInUrl;
  });

}

function restartScanner(){
  location.reload();
}

window.onload = startScanner;
