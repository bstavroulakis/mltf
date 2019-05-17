import NeuralNetwork from "./model_nn.js";
import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js";
import { chartColors } from "../../chartjs/utils.js";

const numIterations = 75;
const maxPoints = 1000;
const trainValues = [];
const min = -1;
const max = 1;

// y = f(x) = a * x ^ 3 + b * x ^2 + c * x + d
function realFunc(x) {
  return -0.8 * Math.pow(x, 3) - 0.2 * Math.pow(x, 2) + 0.9 * x + 0.5;
}

let xTrainValues = [];
for (let i = 0; i < maxPoints; i++) {
  const x = Math.random() * (max - min) + min;
  xTrainValues.push(x);
}
xTrainValues = xTrainValues.sort();
for (let i = 0; i < xTrainValues.length; i++) {
  trainValues.push([xTrainValues[i], realFunc(xTrainValues[i])]);
}

const model = tf.sequential();
async function train() {
  model.add(
    tf.layers.dense({ units: 10, activation: "relu6", inputShape: [1] })
  );
  model.add(tf.layers.dense({ units: 1, inputShape: [10] }));

  const xData = tf.tensor2d(trainValues.map(p => p[0]), [
    trainValues.length,
    1
  ]);
  const yData = tf.tensor2d(trainValues.map(p => p[1]), [
    trainValues.length,
    1
  ]);

  const optimizer = tf.train.sgd(0.5);
  model.compile({ optimizer: optimizer, loss: "meanSquaredError" });
  await model.fit(xData, yData, { epochs: numIterations });
  document.querySelector("#view").innerHTML = "Trained";
}

train().then(() => {
  const testValues = xTrainValues.map((x, i) => {
    return [x, model.predict(tf.tensor2d([x], [1, 1])).dataSync()[0]];
  });
  console.log(xTrainValues, testValues, trainValues);
  var lineChartData = {
    type: "line",
    data: {
      labels: xTrainValues,
      datasets: [
        {
          label: ["Train Data"],
          borderColor: chartColors.red,
          backgroundColor: chartColors.red,
          borderWidth: 1,
          fill: false,
          data: testValues.map(y => y[1])
        },
        {
          label: "Model",
          borderColor: chartColors.blue,
          backgroundColor: chartColors.blue,
          fill: false,
          data: trainValues.map(y => y[1])
        }
      ]
    }
  };

  new Chart(document.getElementById("modelChart"), lineChartData);
});
