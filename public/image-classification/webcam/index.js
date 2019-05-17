const webcamElement = document.getElementById("webcam");

async function setupWebcam() {
  return new Promise((resolve, reject) => {
    const constraints = {
      video: true
    };

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      console.log("stream");
      webcamElement.srcObject = stream;
      webcamElement.addEventListener("loadeddata", () => resolve(), false);
    });
  });
}

async function app() {
  console.log("Loading mobilenet..");
  net = await mobilenet.load();
  console.log("Sucessfully loaded model");

  await setupWebcam();
  console.log("Sucessfully loaded webcam");

  while (true) {
    const result = await net.classify(webcamElement);

    document.getElementById("console").innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability}
    `;

    await tf.nextFrame();
  }
}

app();
