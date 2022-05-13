function getCirclePoints(center, radius, sides) {
  var points = [];
  for (var i = 0; i < sides; i++) {
    points.push(getCirclePoint(center, radius, sides, i));
  }
  return points;
}
function getCirclePoint(center, radius, sides, i) {
  var angle = (i / sides) * Math.PI * 2;
  return {
    x: center.x + radius * Math.cos(angle),
    y: center.y + radius * Math.sin(angle)
  };
}

export {
  getCirclePoints,
};
