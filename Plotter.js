import * as Plotly from 'plotly.js';

export function initChart(div) {
  const layout = {
    autosize: false,
    width: 550,
    height: 550 / 3,
    margin: {
      l: 30,
      r: 30,
      b: 30,
      t: 30,
      pad: 5
    },
  };

  Plotly.plot(div, [{
    y: [],
    type: 'line',
  }], layout);
}

export function clearChart(div) {
  Plotly.purge(div);
}

export function updateChart(div, value) {
  Plotly.extendTraces(div, { y: [[value]] }, [0]);
}
