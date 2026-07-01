let codeReader;
let scanning = false;

const API_URL = "https://script.google.com/macros/s/AKfycbzk78w5BqDWSPOmCsNJe_QfMwVvqhsFD0HLe4ypCb0zt3SEDbF-RvvZyw1tkrLDWWXolQ/exec";

// Tambahkan fungsi untuk menyiapkan container agar tidak menumpuk
function getContainer() {
    let container = document.getElementById("scanner-result-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "scanner-result-container";
        document.body.appendChild(container);
    }
    return container;
}

async function startScanner() {
    // Reset status scanning & bersihkan tampilan lama
    scanning = false;
    getContainer().innerHTML = ""; 
    
    if (!codeReader) {
        codeReader = new ZXingBrowser.BrowserQRCodeReader();
    }

    try {
        await codeReader.decodeFromConstraints(
            { video: { facingMode: "environment" } },
            "video",
            onScan
        );
    } catch (err) {
        console.error(err);
        alert("Gagal membuka kamera: " + err);
    }
}

async function onScan(result, error) {
    if (error) return;
    if (!result || scanning) return;

    scanning = true;
    const memberId = result.text.trim();
    console.log("SCAN :", memberId);

    // Hentikan kamera sementara proses API berjalan
    if (codeReader) codeReader.stop();

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "preview", memberId: memberId })
        });

        const data = await res.json();
        console.log(data);
        showGuest(data);
    } catch (err) {
        alert("Gagal mengambil data: " + err);
        // Jika gagal, otomatis scan ulang tanpa reload halaman
        startScanner();
    }
}

function showGuest(data) {
    const container = getContainer();
    let html = "";

    if (data.status === "NOT_FOUND") {
        html = `
        <h2 style="color:red">Member Tidak Ditemukan</h2>
        <button onclick="startScanner()">Scan Lagi</button>
        `;
    } else {
        html = `
        <div style="background:#fff; border-radius:15px; padding:20px; margin-top:20px; border:1px solid #ddd; max-width:420px;">
            <h2>${data.nama}</h2>
            <p><b>Member</b> : ${data.memberId}</p>
            <p><b>Pax</b> : ${data.pax}</p>
            <p><b>Table</b> : ${data.tableNo}</p>
            <p><b>Seat</b> : ${data.seatFrom}-${data.seatTo}</p>
            <br>
            <button onclick="checkIn('${data.memberId.replace(/'/g, "\\'")}')" style="padding:12px 30px; font-size:18px;">
                ✅ CHECK-IN
            </button>
        </div>
        `;
    }

    // Mengganti isi container, bukan menambahkannya di bawah (mencegah penumpukan)
    container.innerHTML = html;
}

async function checkIn(memberId) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "checkin", memberId: memberId })
        });

        const data = await res.json();
        alert("CHECK-IN BERHASIL\n\n" + data.nama);
        
        // Opsional: Jika alur registrasinya massal, lebih baik kembali scan langsung daripada reload total
        startScanner(); 
    } catch (err) {
        alert("Gagal Check-in: " + err);
        startScanner();
    }
}

window.onload = startScanner;
