import { Model } from './Model';
import { clear, render } from './Renderer';
import { initChart, updateChart, clearChart } from './Plotter';
import { segregation, isolation, density } from './Statistic';

function main() {
  const ctx      = document.getElementById('simulation-canvas').getContext('2d');
  const size     = document.getElementById('generate-size');
  const squares  = document.getElementById('generate-mixture-squares');
  const circles  = document.getElementById('generate-mixture-circles');
  const generate = document.getElementById('generate-button');
  const simulate = document.getElementById('simulate-button');

  const config = {
    neighborhoodRadius: 1,
    percentageA       : 0.33,
    percentageB       : 0.33,
    lowerBoundA       : 0.50,
    lowerBoundB       : 0.50,
    upperBoundA       : 1.00,
    upperBoundB       : 1.00,
  };

  let model = new Model(30, config);
  render(ctx, model);
  initChart('segregation', 'Segregation');
  initChart('isolation', 'Isolation');
  initChart('density', 'Density');
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
      updateChart('segregation', segregation(model));
      updateChart('isolation', isolation(model));
      updateChart('density', density(model));
    }
    render(ctx, model);
  };

  generate.onclick = (_) => {
    clear(ctx);

    clearChart('segregation');
    clearChart('isolation');
    clearChart('density');

    initChart('segregation', 'Segregation');
    initChart('isolation', 'Isolation');
    initChart('density', 'Density');

    config.percentageA = Number(squares.value) / 100;
    config.percentageB = Number(circles.value) / 100;

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
      handle = setInterval(run, 0);
      running = true;
    }
  };
}

main();
