import '@testing-library/jest-dom';

// required to test components that use 'react-plotly.js'
window.URL.createObjectURL = function() {};

// mock for canvas element to to test not having canvas
HTMLCanvasElement.prototype.getContext = function() {};
