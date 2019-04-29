import * as Plotly from 'plotly.js';

export function initChart(div, title) {
  const traceA = {
    y: [],
    mode: 'lines',
    name: 'Squares',
    line: {
      color: '#ffad3c',
      width: 2,
    },
  };

  const traceB = {
    y: [],
    mode: 'lines',
    name: 'Circles',
    line: {
      color: '#3c8ed2',
      width: 2,
    },
  };

  const traceC = {
    y: [],
    mode: 'lines',
    name: 'Both',
    line: {
      color: '#000000',
      width: 2,
    },
  };

  const layout = {
    title,
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
    xaxis: {
      showticklabels: false,
      showgrid: false,
    }
  };

  Plotly.plot(div, [traceA, traceB, traceC], layout, { displayModeBar: false });
}

export function clearChart(div) {
  Plotly.purge(div);
}

export function updateChart(div, values) {
  Plotly.extendTraces(div, { y: values }, [0, 1, 2]);
}
