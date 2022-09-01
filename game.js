var ctx = document.querySelector('#canvas').getContext('2d');
ctx.fillStyle = 'black';

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

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

var interval = setInterval(function() {
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
    ctx.clearRect(0, 0, 500, 500);
    // win check
    if (ball.x > 500) {
        ctx.fillText('Player wins!', 250, 250);
        clearInterval(interval);
    }
    if (ball.x < 0) {
        ctx.fillText('Computer wins!', 250, 250);
        clearInterval(interval);
    }
    drawBall();
    ctx.fillRect(10, leftPaddle, 10, 30);
    ctx.fillRect(480, rightPaddle, 10, 30);
}, 100);

document.onkeydown = function(event) {
    if (event.code == 'ArrowUp') {
        up = true;
    }
    if (event.code == 'ArrowDown') {
        down = true;
    }
}

document.onkeyup = function(event) {
    if (event.code == 'ArrowUp') {
        up = false;
    }
    if (event.code == 'ArrowDown') {
        down = false;
    }
}