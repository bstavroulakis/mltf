const classifier = knnClassifier.create();
const webcamElement = document.getElementById("webcam");
let net;
const names = [];

async function setupWebcam() {
  return new Promise((resolve, reject) => {
    const constraints = {
      video: true
    };

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      webcamElement.srcObject = stream;
      webcamElement.addEventListener("loadeddata", () => resolve(), false);
    });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const addExample = classId => {
  const activation = net.infer(webcamElement, "conv_preds");
  classifier.addExample(activation, classId);
};

async function login() {
  const name = await getPersonName();
  document.getElementById("user-name").innerHTML = `Welcome ${name}`;
  document.getElementById("register-area").style.display = "none";
  document.getElementById("user-area").style.display = "block";
  document.getElementById("training").style.display = "none";
}

function logout() {
  document.getElementById("register-area").style.display = "block";
  document.getElementById("user-area").style.display = "none";
  document.getElementById("training").style.display = "none";
}

async function training(iteration) {
  new Promise((resolve, reject) => {
    document.getElementById("register-area").style.display = "none";
    document.getElementById("user-area").style.display = "none";
    document.getElementById("training").style.display = "block";
    document.getElementById("training").innerHTML = `Training ${iteration}`;
    resolve();
  });
}

async function register() {
  const registerName = document.getElementById("register-name").value;
  if (!registerName) {
    alert("Name is required!");
    return;
  }
  names.push(registerName);
  document.getElementById("register-name").value = "";

  const epocs = Array.apply(null, { length: 50 }).map(Number.call, Number);
  epocs.forEach(async iteration => {
    addExample(names.length - 1);
    await sleep(100);
    await tf.nextFrame();
    //await training(iteration);
  });
  login();
}

async function getPersonName() {
  if (classifier.getNumClasses() > 0) {
    // Get the activation from mobilenet from the webcam.
    const activation = net.infer(webcamElement, "conv_preds");
    // Get the most likely class and confidences from the classifier module.
    const result = await classifier.predictClass(activation);
    return names[result.classIndex];
  }
}

document.getElementById("logout-btn").addEventListener("click", function() {
  logout();
});

document.getElementById("login-btn").addEventListener("click", function() {
  login();
});

document.getElementById("register-btn").addEventListener("click", function() {
  register();
});

async function app() {
  net = await mobilenet.load();
  await setupWebcam();
}
app();
