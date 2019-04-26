import { Model } from './Model';
import { clear, render } from './Renderer';
import { initChart, updateChart, clearChart } from './Plotter';

function main() {
  const ctx      = document.getElementById('canvasId').getContext('2d');
  const generate = document.getElementById('generateSubmitId');
  const size     = document.getElementById('generateInputId');
  const simulate = document.getElementById('simulateButtonId');

  const config = {
    neighborhoodRadius: 1,
    percentageA       : 0.33,
    percentageB       : 0.33,
    lowerBoundA       : 0.50,
    lowerBoundB       : 0.50,
    upperBoundA       : 1.00,
    upperBoundB       : 1.00,
  };

  let model = new Model(1, config);
  let running = false;
  let handle = 0;

  const run = () => {
    clear(ctx);

    const stepped = model.simulate();
    if (!stepped) {
      simulate.value = 'Simulate';
      clearInterval(handle);
      running = false;
    } else {
      updateChart();
    }

    render(ctx, model);
  };

  generate.onclick = (_) => {
    clear(ctx);
    clearChart();
    initChart();
    model = new Model(Number(size.value), config);
    render(ctx, model);
  };

  simulate.onclick = (_) => {
    if (running) {
      simulate.value = 'Simulate';
      clearInterval(handle);
      running = false;
    } else {
      simulate.value = 'Stop';
      handle = setInterval(run, 50);
      running = true;
    }
  };
}

main();
