function showGuest(data){

    const body = document.body;

    let old = document.getElementById("guestCard");

    if(old){
        old.remove();
    }

    const div = document.createElement("div");

    div.id = "guestCard";

    div.style.marginTop = "20px";
    div.style.padding = "20px";
    div.style.border = "1px solid #ddd";
    div.style.borderRadius = "10px";
    div.style.maxWidth = "420px";

    if(data.status=="NOT_FOUND"){

        div.innerHTML=`

        <h2 style="color:red">
        ❌ Member Tidak Ditemukan
        </h2>

        <button onclick="restartScanner()">

        Scan Lagi

        </button>

        `;

        body.appendChild(div);

        return;
    }

    if(data.status=="CHECK-IN"){

        div.innerHTML=`

        <h2 style="color:orange">

        ⚠ Sudah Check-In

        </h2>

        <h3>${data.nama}</h3>

        <p>${data.memberId}</p>

        <p>🪑 Table ${data.tableNo}</p>

        <p>💺 Seat ${data.seatFrom}-${data.seatTo}</p>

        <button onclick="restartScanner()">

        Scan Lagi

        </button>

        `;

        body.appendChild(div);

        return;
    }

    div.innerHTML=`

        <h2>${data.nama}</h2>

        <p>${data.memberId}</p>

        <p>Pax : ${data.pax}</p>

        <button onclick="doCheckIn('${data.memberId}')">

        ✅ CHECK-IN

        </button>

    `;

    body.appendChild(div);

}

async function doCheckIn(memberId){

    const data = await checkInMember(memberId);

    const div = document.getElementById("guestCard");

    div.innerHTML=`

    <h2 style="color:green">

    ✅ CHECK-IN BERHASIL

    </h2>

    <h3>${data.nama}</h3>

    <p>🪑 Table ${data.tableNo}</p>

    <p>💺 Seat ${data.seatFrom}-${data.seatTo}</p>

    `;

    setTimeout(restartScanner,2500);

}

function restartScanner(){

    location.reload();

}
