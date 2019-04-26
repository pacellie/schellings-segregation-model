function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export class Model {
  constructor(size, config) {
    this.size       = size;
    this.iteration  = 0;
    this.config     = config;
    this.matrix     = [];

    for (let i = 0; i < size; i += 1) {
      const row = [];
      for (let j = 0; j < size; j += 1) {
        const decide = Math.random();
        if (decide <= config.percentageA) {
          row.push('A');
        } else if (decide <= config.percentageA + config.percentageB) {
          row.push('B');
        } else {
          row.push('O');
        }
      }
      this.matrix.push(row);
    }
  }

  element(point) {
    return this.matrix[point.x][point.y];
  }

  points() {
    const ps = [];
    for (let i = 0; i < this.size; i += 1) {
      for (let j = 0; j < this.size; j += 1) {
        ps.push({ x: i, y: j });
      }
    }
    return ps;
  }

  neighborhood(point) {
    const x         = point.x;
    const y         = point.y;
    const radius    = this.config.neighborhoodRadius;
    const neighbors = [];

    for (let i = x - radius; i <= x + radius; i += 1) {
      for (let j = y - radius; j <= y + radius; j += 1) {
        if (0 <= i && i < this.size && 0 <= j && j < this.size && !(x === i && y === j)) {
          neighbors.push({ x: i, y: j });
        }
      }
    }

    return neighbors;
  }

  content(point, elem) {
    const neighbors = this.neighborhood(point).map(p => this.element(p)).filter(e => e !== 'O');

    switch (elem) {
      case 'A':
        const as = neighbors.filter(e => e === 'A');
        const ap = (as.length + 1) / (neighbors.length + 1);
        const al = this.config.lowerBoundA;
        const au = this.config.upperBoundA;
        return al <= ap && ap <= au;
      case 'B':
        const bs = neighbors.filter(e => e === 'B');
        const bp = (bs.length + 1) / (neighbors.length + 1);
        const bl = this.config.lowerBoundB;
        const bu = this.config.upperBoundB;
        return bl <= bp && bp <= bu;
      case 'O':
        return true;
    }
  }

  simulate() {
    const empty = this.points().filter(p => this.element(p) === 'O');
    const discontent = this.points().filter(p => !this.content(p, this.element(p)));

    if (discontent.length === 0 || empty.length === 0) {
      return false;
    }

    const indexFrom = random(0, discontent.length - 1);
    const from = discontent[indexFrom];
    const elem = this.element(from);

    let candidates = empty.filter(p => this.content(p, elem));
    if (candidates.length === 0) {
      candidates = empty;
    }
    const indexTo = random(0, candidates.length - 1);
    const to = candidates[indexTo];

    this.matrix[from.x][from.y] = 'O';
    this.matrix[to.x][to.y] = elem;
    this.iteration += 1;

    return true;
  }
}
