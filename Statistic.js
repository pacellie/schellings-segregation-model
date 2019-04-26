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