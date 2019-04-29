import { opposite } from './Model';

function cnt(points) {
  return points.reduce((a, b) => a + b.length, 0);
}

function points(model, type) {
  return model.points.filter(p => model.element(p) === type);
}

export function segregation(model) {
  const pointsA = points(model, 'A');
  const pointsB = points(model, 'B');

  const neighborsA = pointsA.map(p => model.neighbors(p));
  const neighborsB = pointsB.map(p => model.neighbors(p));

  const likeNeighborsA = pointsA.map(p => model.likeNeighbors(p));
  const likeNeighborsB = pointsB.map(p => model.likeNeighbors(p));

  const cntNeighborsA = cnt(neighborsA);
  const cntNeighborsB = cnt(neighborsB);

  const cntLikeNeighborsA = cnt(likeNeighborsA);
  const cntLikeNeighborsB = cnt(likeNeighborsB);

  return [
    [cntLikeNeighborsA * 100 / cntNeighborsA],
    [cntLikeNeighborsB * 100 / cntNeighborsB],
    [(cntLikeNeighborsA + cntLikeNeighborsB) * 100 / (cntNeighborsA + cntNeighborsB)],
  ];
}

function isIsolated(model, point) {
  return model.neighborhood(point).filter(n => model.element(n) === opposite(model.element(point))).length === 0;
}

export function isolation(model) {
  const pointsA = points(model, 'A');
  const isolatedNeighborsA = pointsA.filter(p => isIsolated(model, p));

  const pointsB = points(model, 'B');
  const isolatedNeighborsB = pointsB.filter(p => isIsolated(model, p));

  return [
    [isolatedNeighborsA.length * 100 / pointsA.length],
    [isolatedNeighborsB.length * 100 / pointsB.length],
    [(isolatedNeighborsA.length + isolatedNeighborsB.length) * 100 / (pointsA.length + pointsB.length)],
  ];
}

export function density(model) {
  const pointsA = points(model, 'A');
  const pointsB = points(model, 'B');

  const neighborsA = pointsA.map(p => model.neighbors(p));
  const neighborsB = pointsB.map(p => model.neighbors(p));

  const neighborhoodSizeA = pointsA.map(p => model.neighborhood(p));
  const neighborhoodSizeB = pointsB.map(p => model.neighborhood(p));

  const cntNeighborsA = cnt(neighborsA);
  const cntNeighborsB = cnt(neighborsB);

  const cntNeighborhoodSizeA = cnt(neighborhoodSizeA);
  const cntNeighborhoodSizeB = cnt(neighborhoodSizeB);

  return [
    [cntNeighborsA * 100 / cntNeighborhoodSizeA],
    [cntNeighborsB * 100 / cntNeighborhoodSizeB],
    [(cntNeighborsA + cntNeighborsB) * 100 / (cntNeighborhoodSizeA + cntNeighborhoodSizeB)],
  ];
}