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

  document.getElementById("status").innerText =
    "QR terbaca, membuka check-in...";

  scanner.stop().then(function(){

    window.location.href = decodedText;

  });

}

function restartScanner(){
  location.reload();
}

window.onload = startScanner;
