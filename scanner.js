let codeReader;

async function startScanner(){

    try{

        const video = document.getElementById("video");

        codeReader = new ZXingBrowser.BrowserQRCodeReader();

        const devices =
            await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();

        console.log(devices);

        let deviceId = devices[0].deviceId;

        // pilih kamera belakang kalau ada
        devices.forEach(function(d){

            const name = d.label.toLowerCase();

            if(
                name.includes("back") ||
                name.includes("rear") ||
                name.includes("environment")
            ){

                deviceId = d.deviceId;

            }

        });

        codeReader.decodeFromVideoDevice(

            deviceId,

            video,

            (result,error)=>{

                if(result){

                    onDetected(result.text);

                }

            }

        );

    }catch(err){

        console.error(err);

        alert(err);

    }

}

let lastCode = "";

function onDetected(text){

    if(text==lastCode){
        return;
    }

    lastCode=text;

    console.log("QR =",text);

    alert("QR : "+text);

    // sementara berhenti dulu
    codeReader.stop();

}

window.onload=startScanner;
