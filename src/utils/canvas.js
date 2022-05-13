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
  ctx.moveTo(x, y);
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
/**
 * drawFont
 * @param {*} ctx 
 * @param {*} x 
 * @param {*} y 
 * @param {*} text 
 * @param {*} bgColor 
 * @param {*} font 
 * @param {*} color 
 */
function drawFont (ctx, x, y, text, bgColor, font = '45px "微软雅黑"', color = '#ffffff') {
  ctx.save();

  ctx.font = font;
  ctx.fillStyle = color;
  if (bgColor == color) {
    ctx.fillStyle = '#000000';
  }
  ctx.fillText(text, x, y);

  ctx.restore();
}

/**
 * loadImage
 * @param {*} url 
 * @param {*} style 
 * @returns 
 */
function loadImage (url, style = 'border-radius: 50%;') {
  return new Promise((resolve, reject) => {
    let image = new Image(100, 100);
    image.style = style;
    image.setAttribute('crossOrigin', 'Anonymous');
    image.onload = () => {
      resolve(image);
    }
    image.onerror = () => {
      reject(new Error('load image error'));
    }
    image.src = `${url}?t=${new Date().getTime()}`;
  });
}

export {
  drawCircleImage,
  setBackground,
  drawFont,
  loadImage,
};
