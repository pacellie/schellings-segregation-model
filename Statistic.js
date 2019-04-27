function sum(points) {
  return points.reduce((a, b) => a + b.length, 0);
}

export function segregation(model) {
  const pointsA = model.points().filter(p => model.element(p) === 'A');
  const allNeighborsA = pointsA.map(p => model.neighborhood(p).filter(n => model.element(n) !== 'O'));
  const likeNeighborsA = pointsA.map(p => model.neighborhood(p).filter(n => model.element(n) === 'A'));

  const pointsB = model.points().filter(p => model.element(p) === 'B');
  const allNeighborsB = pointsB.map(p => model.neighborhood(p).filter(n => model.element(n) !== 'O'));
  const likeNeighborsB = pointsB.map(p => model.neighborhood(p).filter(n => model.element(n) === 'B'));

  const points = model.points().filter(p => model.element(p) !== 'O');
  const allNeighbors = points.map(p => model.neighborhood(p).filter(n => model.element(n) !== 'O'));
  const likeNeighbors = points.map(p => model.neighborhood(p).filter(n => model.element(p) === model.element(n)));

  return [
    [sum(likeNeighborsA) * 100 / sum(allNeighborsA)],
    [sum(likeNeighborsB) * 100 / sum(allNeighborsB)],
    [sum(likeNeighbors) * 100 / sum(allNeighbors)],
  ];
}

function opposite(elem) {
  if (elem === 'A') {
    return 'B';
  } else if (elem === 'B') {
    return 'A';
  } else {
    return 'O';
  }
}

function isIsolated(model, point) {
  return model.neighborhood(point).filter(n => model.element(n) === opposite(model.element(point))).length === 0;
}

export function isolation(model) {
  const pointsA = model.points().filter(p => model.element(p) === 'A');
  const noUnlikeNeighborsA = pointsA.filter(p => isIsolated(model, p));

  const pointsB = model.points().filter(p => model.element(p) === 'B');
  const noUnlikeNeighborsB = pointsB.filter(p => isIsolated(model, p));

  const points = model.points().filter(p => model.element(p) !== 'O');
  const noUnlikeNeighbors = points.filter(p => isIsolated(model, p));

  return [
    [noUnlikeNeighborsA.length * 100 / pointsA.length],
    [noUnlikeNeighborsB.length * 100 / pointsB.length],
    [noUnlikeNeighbors.length * 100 / points.length],
  ];
}

export function density(model) {
  const pointsA = model.points().filter(p => model.element(p) === 'A');
  const neighborsA = pointsA.map(p => model.neighborhood(p).filter(n => model.element(n) !== 'O'));
  const allNeighborsA = pointsA.map(p => model.neighborhood(p));

  const pointsB = model.points().filter(p => model.element(p) === 'B');
  const neighborsB = pointsB.map(p => model.neighborhood(p).filter(n => model.element(n) !== 'O'));
  const allNeighborsB = pointsB.map(p => model.neighborhood(p));

  const points = model.points().filter(p => model.element(p) !== 'O');
  const neighbors = points.map(p => model.neighborhood(p).filter(n => model.element(n) !== 'O'));
  const allNeighbors = points.map(p => model.neighborhood(p));

  return [
    [sum(neighborsA) * 100 / sum(allNeighborsA)],
    [sum(neighborsB) * 100 / sum(allNeighborsB)],
    [sum(neighbors) * 100 / sum(allNeighbors)],
  ];
}