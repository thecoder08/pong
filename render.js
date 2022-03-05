module.exports.images = {ball: 'ball.png', paddle: 'paddle.png'};
var ball = {
  x: 250,
  y: 250,
  xvelocity: 5,
  yvelocity: 5
}
var up = false;
var down = false;
var leftPaddle = 200;
var rightPaddle = 200;
module.exports.render = function(images, ctx) {
  if (up) {
    leftPaddle -= 5;
  }
  if (down) {
    leftPaddle += 5;
  }
  ctx.drawImage(images.ball, ball.x, ball.y);
  ctx.drawImage(images.paddle, 10, leftPaddle);
  ctx.drawImage(images.paddle, 480, rightPaddle);
  ball.x += ball.xvelocity;
  ball.y += ball.yvelocity;
  rightPaddle = ball.y;
}
module.exports.keyDown = function(key) {
  if (key == 111) {
    up = true;
  }
  if (key == 116) {
    down = true;
  }
}
module.exports.keyUp = function(key) {
  if (key == 111) {
    up = false;
  }
  if (key == 116) {
    down = false;
  }
}
