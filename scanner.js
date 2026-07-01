let codeReader;

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

            (result,error)=>{

                if(result){

                    console.log(result.text);

                    alert("QR : "+result.text);

                    codeReader.stop();

                    previewMember(result.text);

                }

            }

        );

    }catch(err){

        console.error(err);

        alert(err);

    }

}

window.onload=startScanner;
