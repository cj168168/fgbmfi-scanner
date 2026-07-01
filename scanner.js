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

                        codeReader.stop();

                        console.log(result.text);

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
