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

  const eventId = encodeURIComponent(parts[0]);
  const memberId = encodeURIComponent(parts[1]);

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
