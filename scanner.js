let scanner;
let locked = false;

function setStatus(message){
  const el = document.getElementById("status");
  if(el) el.innerText = message;
}

function startScanner(){
  locked = false;
  setStatus("Arahkan kamera ke QR");

  scanner = new Html5Qrcode("reader");

  scanner.start(
    { facingMode:"environment" },
    { fps:10, qrbox:250 },
    onScanSuccess
  ).catch(function(err){
    setStatus("Camera error: " + err);
  });
}

async function onScanSuccess(decodedText){
  if(locked) return;
  locked = true;

  const parts = String(decodedText || "").split("|");

  if(parts.length !== 2){
    setStatus("QR tidak valid");
    locked = false;
    return;
  }

  const eventCode = String(parts[0] || "").trim().toUpperCase();
  const rawNo = String(parts[1] || "").trim();

  if(eventCode !== "FGBMFI" || !/^\d{1,3}$/.test(rawNo)){
    setStatus("QR FGBMFI tidak valid");
    locked = false;
    return;
  }

  const noPeserta = String(parseInt(rawNo, 10));
  setStatus("QR terbaca. Memuat data peserta...");

  try{
    if(scanner){
      await scanner.stop();
    }
  }catch(e){
    console.warn("Scanner stop warning:", e);
  }

  try{
    await previewMember(noPeserta);
  }catch(err){
    console.error(err);
    setStatus("Gagal mengambil data peserta. Tekan Scan Lagi.");
  }
}

function restartScanner(){
  location.reload();
}

window.onload = startScanner;
