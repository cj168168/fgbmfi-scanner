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

    console.log("CALLBACK");

    if (error) {
        console.log(error);
        return;
    }

    if (!result) return;

    console.log("RESULT =", result.text);

    // Jangan stop scanner dulu
    // Jangan redirect dulu

   const memberId = result.text.trim();

window.open(
    "https://script.google.com/macros/s/AKfycbzk78w5BqDWSPOmCsNJe_QfMwVvqhsFD0HLe4ypCb0zt3SEDbF-RvvZyw1tkrLDWWXolQ/exec?page=scanResult&memberId="
    + encodeURIComponent(memberId),
    "_self"
);
            }


        );

    }catch(err){

        console.error(err);

        alert(err);

    }

}

window.onload = startScanner;
