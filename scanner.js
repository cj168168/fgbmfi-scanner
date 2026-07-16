let scanner;
let locked = false;

// Menyimpan No peserta hasil QR.
// Contoh QR FGBMFI|001 -> currentMemberNo = "1"
let currentMemberNo = "";

function setStatus(message) {
  const el = document.getElementById("status");

  if (el) {
    el.innerText = message;
  }
}

function startScanner() {

  locked = false;
  currentMemberNo = "";

  setStatus("Arahkan kamera ke QR");

  scanner = new Html5Qrcode("reader");

  scanner.start(
    {
      facingMode: "environment"
    },
    {
      fps: 10,
      qrbox: 250
    },
    onScanSuccess
  )
  .catch(function(err) {

    console.error("Camera error:", err);

    setStatus(
      "Camera error: " + err
    );

  });

}


async function onScanSuccess(decodedText) {

  // Cegah QR terbaca berkali-kali
  if (locked) {
    return;
  }

  locked = true;

  console.log(
    "QR RAW:",
    decodedText
  );


  // ============================
  // VALIDASI FORMAT QR
  // ============================

  const parts =
    String(decodedText || "")
    .split("|");


  if (parts.length !== 2) {

    setStatus(
      "QR tidak valid"
    );

    locked = false;

    return;
  }


  const eventCode =
    String(parts[0] || "")
    .trim()
    .toUpperCase();


  const rawNo =
    String(parts[1] || "")
    .trim();


  // QR wajib:
  // FGBMFI|001
  // FGBMFI|002
  // dst

  if (
    eventCode !== "FGBMFI" ||
    !/^\d{1,3}$/.test(rawNo)
  ) {

    setStatus(
      "QR FGBMFI tidak valid"
    );

    locked = false;

    return;
  }


  // ============================
  // NORMALISASI NO PESERTA
  // ============================

  // 001 -> 1
  // 002 -> 2
  // 010 -> 10

  currentMemberNo =
    String(
      parseInt(rawNo, 10)
    );


  console.log(
    "NO PESERTA:",
    currentMemberNo
  );


  setStatus(
    "QR terbaca. Memuat data peserta..."
  );


  // ============================
  // STOP CAMERA
  // ============================

  try {

    if (scanner) {

      await scanner.stop();

    }

  }
  catch (err) {

    console.warn(
      "Scanner stop warning:",
      err
    );

  }


  // ============================
  // PREVIEW PESERTA
  // ============================

  try {

    await previewMember(
      currentMemberNo
    );

  }
  catch (err) {

    console.error(err);

    setStatus(
      "Gagal mengambil data peserta. Tekan Scan Lagi."
    );

  }

}


// ============================
// SCAN ULANG
// ============================

function restartScanner() {

  location.reload();

}


window.onload =
  startScanner;
