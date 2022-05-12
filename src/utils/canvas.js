/**
 * drawCircleImage
 * @param {*} ctx 
 * @param {*} x 
 * @param {*} y 
 * @param {*} radius 
 * @param {*} image 
 */
function drawCircleImage (ctx, x, y, radius, image) {
  ctx.save();

  let size = 2 * radius;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(image, x - radius, y - radius, size, size);

  ctx.restore();
}

/**
 * setBackground
 * @param {*} ctx 
 * @param {*} color 
 */
function setBackground (ctx, color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export {
  drawCircleImage,
  setBackground,
};
