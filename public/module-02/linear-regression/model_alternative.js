class LinearRegression {
  constructor(params) {
    this.iterations = params.iterations || 100;
    this.learningRate = params.learningRate || 0.1;
    this.xData = params.xData || [0, 1, 2, 3, 4];
    this.yData = params.yData || [0, 0.015, 0.038, 0.058, 0.12];
    this.weights = params.weights || [0.0225, 0.04];
  }
  train() {
    const optimizer = tf.train.sgd(this.learningRate);
    const xs = tf.tensor2d(this.xData, [this.xData.length, 1]);
    const ys = tf.tensor2d(this.yData, [this.yData.length, 1]);
    let w1 = tf.variable(tf.scalar(Math.random()));
    let w2 = tf.variable(tf.scalar(Math.random()));

    for (let iter = 0; iter < this.iterations; iter++) {
      optimizer.minimize(() => {
        const predictions = w1
          .mul(xs) // + w1 * x
          .add(w2); // + w2

        // Subtract the real Y values from predictions,
        // square the results and take the mean.
        const meanSquareError = predictions
          .sub(ys)
          .square()
          .mean();
        return meanSquareError;
      });
    }
    this.weights = [w1.dataSync()[0], w2.dataSync()[0]];
  }
}

export default LinearRegression;
