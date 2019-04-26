import * as Plotly from 'plotly.js';

export function initChart() {
  Plotly.plot('charts', [{
    y: [],
    type: 'line',
  }]);
}

export function clearChart() {
  Plotly.purge('charts');
}

export function updateChart() {
  Plotly.extendTraces('charts', { y: [[Math.random()]] }, [0]);
}
