import LinearRegression from "./model_tf.js";
import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js";
import { chartColors } from "../chartjs/utils.js";

import features from "./train/features.js";
import labels from "./train/labels.js";

const xData = features;
const yData = labels;

const props = {
  iterations: 100,
  learningRate: 0.1,
  xData: xData,
  yData: yData
};

// Train the model with the x,y data and the iteration, learning rate
const lr = new LinearRegression(props);
lr.train();

// Predictions
import testFeatures from "./test/features.js";
import testLabels from "./test/labels.js";

let testFeaturesTF = tf.tensor(testFeatures);
testFeaturesTF = tf
  .ones([testFeaturesTF.shape[0], 1])
  .concat(testFeaturesTF, 1);
const { mean, variance } = tf.moments(testFeaturesTF, 0);
testFeaturesTF = testFeaturesTF.sub(mean).div(variance.pow(0.5));

const predictions = testFeaturesTF.matMul(lr.weights).dataSync();

let viewHTML = `<tr><td>Real Value</td><td>Prediction</td><td>Diff</td></tr>`;
for (var i = 0; i < predictions.length; i++) {
  viewHTML += `<tr>
    <td>${testLabels[i][0]}</td>
    <td>${predictions[i]}</td>
    <td>${testLabels[i][0] - predictions[i]}</td>
  </tr>`;
}

document.querySelector(
  "#view"
).innerHTML = `<table class='table is-bordered'>${viewHTML}</table>`;
