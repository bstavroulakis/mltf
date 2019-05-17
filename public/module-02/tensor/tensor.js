const tf = require("@tensorflow/tfjs");

// Optional Load the binding:
// Use '@tensorflow/tfjs-node-gpu' if running with GPU.
require("@tensorflow/tfjs-node");

console.log("----values types----");
console.log(tf.scalar(1).print());
console.log(tf.tensor([1, 2, 3]).print());
console.log(tf.tensor([[1, 2], [3, 4]]).print());

console.log("----dtypes----");
console.log(tf.scalar(1).dtype);
console.log(tf.tensor([1, 2, 3]).dtype);
console.log(tf.tensor([[1, 2], [3, 4]]).dtype);

console.log("----shape----");
console.log(tf.scalar(1).shape);
console.log(tf.tensor([1, 2, 3]).shape);
console.log(tf.tensor([[1, 2], [3, 4]]).shape);
