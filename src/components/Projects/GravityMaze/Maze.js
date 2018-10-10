import { borderSizeX2Px } from 'preshape';

export default class Maze {
  constructor(width, height, { size }) {
    this.WALL_WIDTH = borderSizeX2Px;
    this.PATH_WIDTH = size;
    this.PATH_TOTAL_WIDTH = this.WALL_WIDTH + size;


    this.max = Math.min(
      Math.floor((width - this.WALL_WIDTH) / this.PATH_TOTAL_WIDTH),
      Math.floor((height - this.WALL_WIDTH) / this.PATH_TOTAL_WIDTH),
    );

    this.width = this.WALL_WIDTH + (this.max * this.PATH_TOTAL_WIDTH);
    this.height = this.WALL_WIDTH + (this.max * this.PATH_TOTAL_WIDTH);

    this.visted = { '0,0': true };
    this.history = [[0, 0]];
    this.graph = {};

    this.search([0, 0]);

    this.rects = [
      ...this.getBoundingClientRectsOutside(),
      ...this.getBoundingClientRectsInside(),
    ];

    delete this.visted;
    delete this.history;
  }

  getCells(x, y) {
    return [
      y > 0 && [x, y - 1],
      x < (this.max - 1) && [x + 1, y],
      y < (this.max - 1) && [x, y + 1],
      x > 0 && [x - 1, y],
    ].filter((_) => _);
  }

  getCellCenter(x, y) {
    return [
      this.WALL_WIDTH + (this.PATH_WIDTH / 2) + (x * this.PATH_TOTAL_WIDTH),
      this.WALL_WIDTH + (this.PATH_WIDTH / 2) + (y * this.PATH_TOTAL_WIDTH),
    ];
  }

  isConnected(x1, y1, x2, y2) {
    return (this.graph[[x1, y1]] && this.graph[[x1, y1]][[x2, y2]]) ||
      (this.graph[[x2, y2]] && this.graph[[x2, y2]][[x1, y1]]);
  }

  search([x, y]) {
    const cells = this.getCells(x, y).filter((c) => !this.visted[c]);
    const cell = cells[Math.floor(Math.random() * cells.length)];

    if (cell) {
      this.history.push(cell);
      this.visted[cell] = true;
      this.graph[[x, y]] = this.graph[[x, y]] || {};
      this.graph[[x, y]][cell] = true;
      this.search(cell);
    } else {
      this.history.pop();

      if (this.history.length) {
        this.search(this.history[this.history.length - 1]);
      }
    }
  }

  buildRects() {
    this.rects = [
      ...this.getBoundingClientRectsOutside(),
      ...this.getBoundingClientRectsInside(),
    ];
  }

  getBoundingClientRectsOutside() {
    return [
      { x: 0, y: 0, width: this.width, height: this.WALL_WIDTH },
      { x: this.width - this.WALL_WIDTH, y: 0, width: this.WALL_WIDTH, height: this.height },
      { x: 0, y: this.height - this.WALL_WIDTH, width: this.width, height: this.WALL_WIDTH },
      { x: 0, y: 0, width: this.WALL_WIDTH, height: this.height },
    ];
  }

  getBoundingClientRectsInside() {
    const rects = [];

    for (let i = 0; i < 2; i++) {
      for (let a = 0; a < this.max - 1; a++) {
        let p;

        for (let b = 0; b <= this.max; b++) {
          const x1 = i ? b : a;
          const y1 = i ? a : b;
          const x2 = x1 + (i + 1 & 1);
          const y2 = y1 + (i & 1);

          if (b === this.max || this.isConnected(x1, y1, x2, y2)) {
            if (p !== undefined) {
              rects.push({
                [i ? 'height' : 'width']: ((b - p) * this.PATH_TOTAL_WIDTH) + this.WALL_WIDTH,
                [i ? 'width' : 'height']: this.WALL_WIDTH,
                [i ? 'x' : 'y']: (a + 1) * this.PATH_TOTAL_WIDTH,
                [i ? 'y' : 'x']: (p * this.PATH_TOTAL_WIDTH),
              });

              p = undefined;
            }
          } else if (p === undefined) {
            p = b;
          }
        }
      }
    }

    return rects;
  }
}
