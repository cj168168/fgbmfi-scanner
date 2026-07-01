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

            (result, error) => {

                if(result){

                    console.log(result.text);

                    codeReader.stop();

                    alert("Redirecting...");

                    window.location.href =
                    "https://script.google.com/macros/s/AKfycbzk78w5BqDWSPOmCsNJe_QfMwVvqhsFD0HLe4ypCb0zt3SEDbF-RvvZyw1tkrLDWWXolQ/exec?page=scanResult&memberId="
                    + encodeURIComponent(result.text);

                }

            }

        );

    }catch(err){

        console.error(err);

        alert(err);

    }

}

window.onload = startScanner;
