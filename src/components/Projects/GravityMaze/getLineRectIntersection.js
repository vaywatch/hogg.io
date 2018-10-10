const ll = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
          ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
          ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    const x = x1 + (uA * (x2 - x1));
    const y = y1 + (uA * (y2 - y1));

    return [x, y, Math.hypot(x - x1, y - y1)];
  }

  return null;
};

export default (x1, y1, x2, y2, x3, y3, width, height) => {

};


// [
//   ll(x1, y1, x2, y2, x3, y3, x3 + width, y3),
//   ll(x1, y1, x2, y2, x3 + width, y3, x3 + width, y3 + height),
//   ll(x1, y1, x2, y2, x3, y3 + height, x3 + width, y3 + height),
//   ll(x1, y1, x2, y2, x3, y3, x3, y3 + height),
// ].filter((_) => _).sort(([,, ah], [,, bh]) => ah - bh)[0];
