let codeReader;
let scanning = false;


const API_URL =
"https://script.google.com/macros/s/AKfycbzk78w5BqDWSPOmCsNJe_QfMwVvqhsFD0HLe4ypCb0zt3SEDbF-RvvZyw1tkrLDWWXolQ/exec";

async function startScanner(){

    codeReader = new ZXingBrowser.BrowserQRCodeReader();

    try{

        await codeReader.decodeFromConstraints(

            {
                video:{
                    facingMode:"environment"
                }
            },

            "video",

            onScan

        );

    }catch(err){

        console.error(err);
        alert(err);

    }

}

async function onScan(result, error){

    if(error) return;
    if(!result) return;
    if(scanning) return;

    scanning = true;

    const memberId = result.text.trim();

    alert("SCAN = " + memberId);

    // Jangan stop scanner
    // Jangan fetch
    // Jangan showGuest

    return;

}

function showGuest(data){

    let html="";

    if(data.status=="NOT_FOUND"){

        html=`

        <h2 style="color:red">

        Member Tidak Ditemukan

        </h2>

        <button onclick="restartScanner()">

        Scan Lagi

        </button>

        `;

    }

    else{

        html=`

        <div style="

        background:#fff;

        border-radius:15px;

        padding:20px;

        margin-top:20px;

        border:1px solid #ddd;

        max-width:420px;

        ">

        <h2>${data.nama}</h2>

        <p><b>Member</b> : ${data.memberId}</p>

        <p><b>Pax</b> : ${data.pax}</p>

        <p><b>Table</b> : ${data.tableNo}</p>

        <p><b>Seat</b> : ${data.seatFrom}-${data.seatTo}</p>

        <br>

        <button

        onclick="checkIn('${data.memberId}')"

        style="

        padding:12px 30px;

        font-size:18px;

        ">

        ✅ CHECK-IN

        </button>

        </div>

        `;

    }

    document.body.insertAdjacentHTML(

        "beforeend",

        html

    );

}

async function checkIn(memberId){

    const res = await fetch(API_URL,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            action:"checkin",

            memberId:memberId

        })

    });

    const data = await res.json();

    alert(

        "CHECK-IN BERHASIL\n\n"+

        data.nama

    );

    restartScanner();

}

function restartScanner(){

    location.reload();

}

window.onload=startScanner;
