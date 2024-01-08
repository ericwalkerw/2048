module.exports = {
  random(value) {
    return Math.floor(Math.random() * value);
  },

  setPos(item, pos) {
    item.x = pos.x;
    item.y = pos.y;
  },
};
