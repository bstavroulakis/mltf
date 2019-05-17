import LinearRegression from "./model_tf.js";
import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js";
import { chartColors } from "../../chartjs/utils.js";

const xData = [[0], [1], [2], [3], [4]];
const yData = [[0], [0.015], [0.038], [0.058], [0.12]];

const props = {
  iterations: 100,
  learningRate: 0.1,
  xData: xData,
  yData: yData
};

// Train the model with the x,y data and the iteration, learning rate
const lr = new LinearRegression(props);
lr.train();

console.log(lr.weights.dataSync());

// Show the model in the document area
document.querySelector("#view").innerHTML = `y = ${
  lr.weights.dataSync()[0]
} * x + ${lr.weights.dataSync()[1]}`;

// Render the Graph with the x,y train data and the model
function renderGraph(dataset, w1, w2) {
  var modelYdata = dataset[0].map(x => w1 * x + w2);
  var lineChartData = {
    type: "line",
    data: {
      labels: dataset[0],
      datasets: [
        {
          label: ["Train Data"],
          borderColor: chartColors.red,
          backgroundColor: chartColors.red,
          borderWidth: 1,
          fill: false,
          data: dataset[1]
        },
        {
          label: "Model",
          borderColor: chartColors.blue,
          backgroundColor: chartColors.blue,
          fill: false,
          data: modelYdata
        }
      ]
    }
  };

  new Chart(document.getElementById("modelChart"), lineChartData);
}

window.onload = function() {
  renderGraph(
    [xData, yData],
    lr.weights.dataSync()[0],
    lr.weights.dataSync()[1]
  );
};
