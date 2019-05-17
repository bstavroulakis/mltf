class LinearRegression {
  constructor(params) {
    this.iterations = params.iterations || 100;
    this.learningRate = params.learningRate || 0.1;
    this.xData_tf = tf.tensor(params.xData);
    this.yData = tf.tensor(params.yData);

    this.xData = this.xData_tf.concat(tf.ones([this.xData_tf.shape[0], 1]), 1);
    this.weights = tf.zeros([this.xData.shape[1], 1]);
  }
  train() {
    for (let i = 0; i < this.iterations; i++) {
      // Guess Errors
      /* const errorValues = this.xData.map((curr, i) => {
          return this.weights[0] * curr + this.weights[1] - this.yData[i];
        });*/
      let errorValues = this.xData.matMul(this.weights).sub(this.yData);
      let slopes = this.xData
        .transpose()
        .matMul(errorValues)
        .div(this.xData.shape[0]);

      // Mean Squared Error Slopes
      /*const slopeW1 =
        (2 / xLen) *
        errorValues
          .map((guessError, i) => {
            return this.xData[i] * guessError;
          })
          .reduce((acc, curr) => {
            return acc + curr;
          }, 0);

      const slopeW2 =
        (2 / xLen) *
        errorValues.reduce((acc, guessError) => {
          return acc + guessError;
        }, 0);
        */

      // Optimizer
      this.weights = this.weights.sub(slopes.mul(this.learningRate));
      //this.weights[0] = this.weights[0] - slopeW1 * this.learningRate;
      //this.weights[1] = this.weights[1] - slopeW2 * this.learningRate;
    }
  }
}

export default LinearRegression;
