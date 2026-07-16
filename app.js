function showGuest(data, scannedMemberNo) {

  const body = document.body;

  let old = document.getElementById("guestCard");

  if (old) {
    old.remove();
  }

  const div = document.createElement("div");

  div.id = "guestCard";

  div.style.margin = "20px auto";
  div.style.padding = "25px";
  div.style.border = "1px solid white";
  div.style.borderRadius = "15px";
  div.style.maxWidth = "420px";
  div.style.boxSizing = "border-box";


  // ============================
  // DATA PESERTA
  // ============================

  const status = String(
    data.status || ""
  )
  .trim()
  .toUpperCase();


  const nama =
    data.nama ||
    data.name ||
    "-";


  // Nomor peserta selalu
  // menggunakan hasil QR

  const memberNo =
    String(
      scannedMemberNo || ""
    );


  console.log(
    "PREVIEW PESERTA:",
    {
      status: status,
      nama: nama,
      memberNo: memberNo,
      rawData: data
    }
  );


  // ============================
  // PESERTA TIDAK DITEMUKAN
  // ============================

  if (
    status === "NOT_FOUND" ||
    status === "NOT FOUND"
  ) {

    div.innerHTML = `

      <h2>
        ❌ PESERTA TIDAK DITEMUKAN
      </h2>

      <p>
        No. Peserta: ${memberNo}
      </p>

      <button
        onclick="restartScanner()">
        Scan Lagi
      </button>

    `;

    body.appendChild(div);

    return;
  }


  // ============================
  // PREVIEW:
  // PESERTA SUDAH CHECK-IN
  // ============================

  if (
    status === "CHECK-IN" ||
    status === "CHECKED-IN" ||
    status === "CHECKED IN" ||
    status === "CHECKED_IN" ||
    status === "ALREADY_CHECKED_IN" ||
    status === "ALREADY CHECKED IN"
  ) {

    div.innerHTML = `

      <h2>
        ⚠️ SUDAH CHECK-IN
      </h2>

      <h3>
        ${nama}
      </h3>

      <p>
        No. Peserta: ${memberNo}
      </p>

      <p>
        Peserta ini sudah melakukan
        check-in sebelumnya.
      </p>

      <button
        onclick="restartScanner()">
        Scan Lagi
      </button>

    `;

    body.appendChild(div);

    return;
  }


  // ============================
  // BELUM CHECK-IN
  // TAMPILKAN TOMBOL
  // ============================

  div.innerHTML = `

    <h2>
      ${nama}
    </h2>

    <p>
      No. Peserta: ${memberNo}
    </p>

    <button
      id="checkInButton"
      onclick="doCheckIn('${memberNo}')">

      ✅ CHECK-IN

    </button>

  `;


  body.appendChild(div);

}



// ============================
// PROSES CHECK-IN
// ============================

async function doCheckIn(memberNo) {

  const button =
    document.getElementById(
      "checkInButton"
    );


  // ============================
  // CEGAH DOUBLE CLICK
  // ============================

  if (button) {

    button.disabled = true;

    button.innerText =
      "Memproses...";

  }


  try {

    const data =
      await checkInMember(
        memberNo
      );


    console.log(
      "HASIL CHECK-IN:",
      data
    );


    const div =
      document.getElementById(
        "guestCard"
      );


    const status =
      String(
        data.status || ""
      )
      .trim()
      .toUpperCase();


    const nama =
      data.nama ||
      data.name ||
      "";


    // ============================
    // BACKEND MENOLAK
    // KARENA SUDAH CHECK-IN
    // ============================

    if (
      status === "ALREADY_CHECKED_IN" ||
      status === "ALREADY CHECKED IN" ||
      status === "DUPLICATE"
    ) {

      div.innerHTML = `

        <h2>
          ⚠️ SUDAH CHECK-IN
        </h2>

        <h3>
          ${nama}
        </h3>

        <p>
          No. Peserta: ${memberNo}
        </p>

        <p>
          Peserta ini sudah melakukan
          check-in sebelumnya.
        </p>

        <button
          onclick="restartScanner()">
          Scan Lagi
        </button>

      `;

      return;
    }


    // ============================
    // CHECK-IN PERTAMA BERHASIL
    // ============================

    div.innerHTML = `

      <h2>
        ✅ CHECK-IN BERHASIL
      </h2>

      <h3>
        ${nama}
      </h3>

      <p>
        No. Peserta: ${memberNo}
      </p>

      <p>
        Selamat datang di acara FGBMFI.
      </p>

    `;


    // Otomatis kembali scanner
    // setelah 3 detik

    setTimeout(
      restartScanner,
      3000
    );

  }


  catch (err) {

    console.error(
      "CHECK-IN ERROR:",
      err
    );


    alert(
      "Check-in gagal: " +
      err.message
    );


    if (button) {

      button.disabled = false;

      button.innerText =
        "✅ CHECK-IN";

    }

  }

}



// ============================
// SCAN ULANG
// ============================

function restartScanner() {

  location.reload();

}
