import NeuralNetwork from "./model_nn.js";
import "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js";
import { chartColors } from "../../chartjs/utils.js";

const xData = [0, 1, 2, 3, 4];
const yData = [0, 0.015, 0.038, 0.058, 0.12];

const props = {
  iterations: 450,
  learningRate: 0.1,
  xData: xData,
  yData: yData
};

// Train the model with the x,y data and the iteration, learning rate
const lr = new NeuralNetwork(props);

// Render the Graph with the x,y train data and the model
function renderGraph(dataset) {
  const { mean, variance } = tf.moments(dataset[0], 0);
  var xData = tf.tensor1d(dataset[0]);
  var xDataStandarized = xData.sub(mean).div(variance.pow(0.5));
  var modelYdata = xDataStandarized.dataSync().map(function(x) {
    return lr.model.predict(tf.tensor1d([x])).dataSync()[0];
  });
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

lr.train().then(() => {
  renderGraph([xData, yData]);
  document.querySelector("#view").innerHTML = "Trained";
});
