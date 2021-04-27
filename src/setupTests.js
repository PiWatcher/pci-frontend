import '@testing-library/jest-dom';

// required to test components that use 'react-plotly.js'
window.URL.createObjectURL = function () { };

// mock for canvas element for testing
HTMLCanvasElement.prototype.getContext = function () { };
