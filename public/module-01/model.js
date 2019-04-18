class LinearRegression {
  constructor(params) {
    this.iterations = params.iterations || 100;
    this.learningRate = params.learningRate || 0.1;
    this.xData = params.xData || [0, 1, 2, 3, 4];
    this.yData = params.yData || [0, 0.015, 0.038, 0.058, 0.12];
    this.weights = params.weights || [0.0225, 0.04];
  }
  train() {
    for (let i = 0; i < this.iterations; i++) {
      const xLen = this.xData.length;
      const errorValues = this.xData.map((curr, i) => {
        return this.weights[0] * curr + this.weights[1] - this.yData[i];
      });
      const slopeW1 =
        (2 / xLen) *
        errorValues
          .map((ev, i) => {
            return this.xData[i] * ev;
          })
          .reduce((acc, curr) => {
            return acc + curr;
          }, 0);

      const slopeW2 =
        (2 / xLen) *
        errorValues.reduce((acc, ev) => {
          return acc + ev;
        }, 0);

      this.weights[0] = this.weights[0] - slopeW1 * this.learningRate;
      this.weights[1] = this.weights[1] - slopeW2 * this.learningRate;
    }
  }
}

export default LinearRegression;
