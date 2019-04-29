import { Model } from './Model';
import { clear, render } from './Renderer';
import { initChart, updateChart, clearChart } from './Plotter';
import { segregation, isolation, density } from './Statistic';

function main() {
  const ctx = document.getElementById('simulation-canvas').getContext('2d');

  const size     = document.getElementById('generate-size');
  const radius   = document.getElementById('generate-neighborhood-radius');
  const squares  = document.getElementById('generate-mixture-squares');
  const circles  = document.getElementById('generate-mixture-circles');
  const generate = document.getElementById('generate-button');

  const preferences  = document.getElementById('preferences-button');
  const squaresLower = document.getElementById('preferences-squares-lower');
  const squaresUpper = document.getElementById('preferences-squares-upper');
  const circlesLower = document.getElementById('preferences-circles-lower');
  const circlesUpper = document.getElementById('preferences-circles-upper');

  const simulate = document.getElementById('simulate-button');

  const config = {
    neighborhoodRadius: Number(radius.value),
    percentageA       : Number(squares.value) / 100,
    percentageB       : Number(circles.value) / 100,
    lowerBoundA       : Number(squaresLower.value) / 100,
    lowerBoundB       : Number(circlesLower.value) / 100,
    upperBoundA       : Number(squaresUpper.value) / 100,
    upperBoundB       : Number(circlesUpper.value) / 100,
  };

  let model = new Model(30, config);
  let running = false;
  let handle = 0;

  render(ctx, model);
  initChart('segregation', 'Segregation');
  initChart('isolation', 'Isolation');
  initChart('density', 'Density');

  const run = () => {
    clear(ctx);

    const stepped = model.simulate();
    if (!stepped) {
      simulate.value = 'Simulate';
      clearInterval(handle);
      running = false;
    } else {
      if (model.iteration % 10 === 0) {
        updateChart('segregation', segregation(model));
        updateChart('isolation', isolation(model));
        updateChart('density', density(model));
      }
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

    config.neighborhoodRadius = Number(radius.value);
    config.percentageA = Number(squares.value) / 100;
    config.percentageB = Number(circles.value) / 100;

    model = new Model(Number(size.value), config);

    render(ctx, model);
  };

  preferences.onclick = (_) => {
    clear(ctx);

    config.lowerBoundA = Number(squaresLower.value) / 100;
    config.lowerBoundB = Number(circlesLower.value) / 100;
    config.upperBoundA = Number(squaresUpper.value) / 100;
    config.upperBoundB = Number(circlesUpper.value) / 100;

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
