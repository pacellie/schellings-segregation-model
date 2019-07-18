function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function opposite(elem) {
  if (elem === 'A') {
    return 'B';
  } else if (elem === 'B') {
    return 'A';
  } else {
    return 'O';
  }
}

export class Model {
  constructor(size, config) {
    this.size       = size;
    this.iteration  = 0;
    this.config     = config;
    this.matrix     = [];
    this.points     = [];

    let a = Math.floor(size * size * config.percentageA)
    let b = Math.ceil(size * size * config.percentageB)
    let empties = [];

    for (let i = 0; i < size; i += 1) {
      const row = [];
      for (let j = 0; j < size; j += 1) {
        this.points.push({ x: i, y: j});
        empties.push({ x: i, y: j });
        row.push('O');
      }
      this.matrix.push(row);
    }

    while (0 < a || 0 < b) {
      const index = random(0, empties.length - 1);
      const position = empties[index];

      if (0 < a) {
        this.matrix[position.x][position.y] = 'A';
        empties.splice(index, 1);
        a -= 1;
      } else {
        this.matrix[position.x][position.y] = 'B';
        empties.splice(index, 1);
        b -= 1;
      }
    }
  }

  element(point) {
    return this.matrix[point.x][point.y];
  }

  neighborhood(point) {
    const x         = point.x;
    const y         = point.y;
    const radius    = this.config.neighborhoodRadius;
    const neighbors = [];

    for (let i = x - radius; i <= x + radius; i += 1) {
      for (let j = y - radius; j <= y + radius; j += 1) {
        if (x !== i || y !== j) {
          neighbors.push({
            x: (i + this.size) % this.size,
            y: (j + this.size) % this.size
          });
        }
      }
    }

    return neighbors;
  }

  neighbors(point) {
    return this.neighborhood(point)
               .filter(n => this.element(n) !== 'O');
  }

  likeNeighbors(point) {
    return this.neighborhood(point)
               .filter(n => this.element(point) === this.element(n));
  }

  content(point, elem) {
    const neighbors = this.neighborhood(point)
                          .map(p => this.element(p))
                          .filter(e => e !== 'O');

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
    const empty      = this.points.filter(p => this.element(p) === 'O');
    const discontent = this.points.filter(p => !this.content(p, this.element(p)));

    if (discontent.length === 0 || empty.length === 0) {
      return false;
    }

    const indexFrom = random(0, discontent.length - 1);
    const from      = discontent[indexFrom];
    const elem      = this.element(from);

    let candidates = empty.filter(p => this.content(p, elem));
    if (candidates.length !== 0) {
      const indexTo = random(0, candidates.length - 1);
      const to      = candidates[indexTo];

      this.matrix[from.x][from.y] = 'O';
      this.matrix[to.x]  [to.y]   = elem;

      this.iteration += 1;
    }

    return true;
  }
}
