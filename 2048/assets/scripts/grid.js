const mathf = require("mathf");
cc.Class({
  extends: cc.Component,

  properties: {
    boardPos: require("board"),
    iPrefab: cc.Prefab,
  },

  onLoad() {
    this.grid = Array.from({ length: 4 }, () => Array(4).fill(0));
    this.board = Array.from({ length: 4 }, () => Array(4).fill(null));

    this.createTile();
    this.createTile();
    console.log(this.grid);
    console.log(this.board);
  },

  slide(row, r) {
    let index = 0;
    for (let i = 0; i < row.length; i++) {
      if (row[i] === 0) index++;
      else {
        [row[i - index], row[i]] = [row[i], row[i - index]];

        if (this.board[r][i - index] && this.board[r][i]) {
          [this.board[r][i - index].position, this.board[r][i].position] = [
            this.board[r][i].position,
            this.board[r][i - index].position,
          ];
        }

        [this.board[r][i - index], this.board[r][i]] = [
          this.board[r][i],
          this.board[r][i - index],
        ];
      }
    }
  },

  merge(row, r) {
    for (let i = 0; i < row.length; i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
        if (this.board[r][i + 1]) {
          this.board[r][i + 1].destroy();
          this.board[r][i + 1] = null;
        }
      }
    }
  },

  slideL() {
    for (let r = 0; r < 4; r++) {
      const row = this.grid[r];
      this.slide(row, r);
      this.merge(row, r);
      this.slide(row, r);
    }
    console.log(this.grid);
    console.log(this.board);
  },

  slideR() {
    for (let r = 0; r < 4; r++) {
      const row = this.grid[r].reverse();
      this.slide(row, r);
      this.merge(row, r);
      this.slide(row, r);
      this.grid[r] = row.reverse();
    }
    console.log(this.grid);
    console.log(this.board);
  },

  createTile() {
    if (!this.checkEmpty()) return;

    let found = false;
    while (!found) {
      let r = mathf.random(4);
      let c = mathf.random(4);
      if (this.grid[r][c] === 0) {
        this.grid[r][c] = 2;

        const block = cc.instantiate(this.iPrefab);
        this.board[r][c] = block;
        const pos = this.boardPos.getPos(r, c);
        block.position = cc.v2(pos.x, pos.y);
        block.parent = this.node;
        found = true;
      }
    }
  },

  checkEmpty() {
    return this.grid.some((row) => row.includes(0));
  },
});
