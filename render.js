module.exports.images = {ball: 'ball.png', paddle: 'paddle.png'};
var ball = {
  x: 250,
  y: 250,
  xvelocity: 5,
  yvelocity: 3
}
var up = false;
var down = false;
var leftPaddle = 200;
var rightPaddle = 200;
module.exports.render = function(images, ctx) {
  // user input
  if (up) {
    leftPaddle -= 6;
  }
  if (down) {
    leftPaddle += 6;
  }
  // opponent
  if (ball.xvelocity > 0) {
  if (ball.x > 100) {
    if (ball.y > rightPaddle + 10) {
      rightPaddle += 6;
    }
    if (ball.y < rightPaddle + 10) {
      rightPaddle -= 6;
    }
  }
  }
  // ball physics
  ball.x += ball.xvelocity;
  ball.y += ball.yvelocity;
  if ((ball.x > 480) && (ball.x < 490) && (ball.y > rightPaddle) && (ball.y < rightPaddle + 30)) {
    ball.xvelocity = -ball.xvelocity;
  }
  if ((ball.x > 10) && (ball.x < 20) && (ball.y > leftPaddle) && (ball.y < leftPaddle + 30)) {
    ball.xvelocity = -ball.xvelocity;
  }
  if ((ball.y > 490) || (ball.y < 10)) {
    ball.yvelocity = -ball.yvelocity;
  }
  // win check
  if (ball.x > 500) {
    console.log('Player wins!');
    process.exit();
  }
  if (ball.x < 0) {
    console.log('Computer wins!');
    process.exit();
  }
  // draw white background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 500, 500);
  // draw ball and paddles
  ctx.drawImage(images.ball, ball.x, ball.y);
  ctx.drawImage(images.paddle, 10, leftPaddle);
  ctx.drawImage(images.paddle, 480, rightPaddle);
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
