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
    "location.href = https://www.google.com"
);
            }


        );

    }catch(err){

        console.error(err);

        alert(err);

    }

}

window.onload = startScanner;
