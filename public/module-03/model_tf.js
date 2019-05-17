class LinearRegression {
  constructor(params) {
    this.iterations = params.iterations || 100;
    this.learningRate = params.learningRate || 0.1;
    this.xData_tf = tf.tensor(params.xData);
    this.yData = tf.tensor(params.yData);

    this.xData = this.xData_tf.concat(tf.ones([this.xData_tf.shape[0], 1]), 1);
    const { mean, variance } = tf.moments(this.xData, 0);

    this.mean = mean;
    this.variance = variance; // measures how far the values are spread out

    this.xData = this.xData.sub(mean).div(variance.pow(0.5));

    this.weights = tf.zeros([this.xData.shape[1], 1]);
  }
  train() {
    for (let i = 0; i < this.iterations; i++) {
      let errorValues = this.xData.matMul(this.weights).sub(this.yData);
      let slopes = this.xData
        .transpose()
        .matMul(errorValues)
        .div(this.xData.shape[0]);

      // Optimizer
      this.weights = this.weights.sub(slopes.mul(this.learningRate));
    }
  }
}

export default LinearRegression;
