
let stream = null;

async function startCamera() {

  try {

    stream = await navigator.mediaDevices.getUserMedia({

      video: {
        facingMode: {
          ideal: "environment"
        }
      },

      audio: false

    });

    const video = document.getElementById("video");

    video.srcObject = stream;

    await video.play();

    console.log("✅ Camera Started");

  } catch (err) {

    console.error(err);

    alert("Camera Error : " + err.message);

  }

}

window.onload = startCamera;
