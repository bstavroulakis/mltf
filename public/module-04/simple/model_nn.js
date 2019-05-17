class NeuralNetwork {
  constructor(params) {
    this.iterations = params.iterations || 100;
    this.learningRate = params.learningRate || 0.1;
    this.xData = tf.tensor1d(params.xData);
    this.yData = tf.tensor1d(params.yData);

    const { mean, variance } = tf.moments(this.xData, 0);

    this.mean = mean;
    this.variance = variance; // measures how far the values are spread out

    this.xData = this.xData.sub(mean).div(variance.pow(0.5));
  }
  async train() {
    this.model = tf.sequential();

    // Create a simple model.
    this.model.add(
      tf.layers.dense({
        units: 1,
        inputShape: [1]
      })
    );

    var optimizer = tf.train.sgd(this.learningRate);

    // Prepare the model for training: Specify the loss and the optimizer.
    this.model.compile({
      loss: "meanSquaredError",
      optimizer: optimizer
    });

    // Train the model using the data.
    await this.model.fit(this.xData, this.yData, { epochs: this.iterations });
    console.log("training done");
  }
}

export default NeuralNetwork;
