// Option 1: Install TensorFlow.js with native C++ bindings.
// npm install @tensorflow/tfjs-node

// Option 2: (Linux Only) If your system has a NVIDIA® GPU
//  with CUDA support, use the GPU package even for higher
// performance.
// npm install @tensorflow/tfjs-node-gpu

// Option 3: Install the pure JavaScript version.
// This is the slowest option performance wise.
// npm install @tensorflow/tfjs

const tf = require("@tensorflow/tfjs");

// Optional Load the binding:
// Use '@tensorflow/tfjs-node-gpu' if running with GPU.
require("@tensorflow/tfjs-node");
