const gameContainer = document.getElementById('gameContainer');
const paddle = document.getElementById('paddle');
const ball = document.getElementById('ball');
const scoreDisplay = document.getElementById('score');

let paddleWidth = 100;
let gameContainerWidth = gameContainer.offsetWidth;
let ballDiameter = 20;
let paddleX = (gameContainerWidth - paddleWidth) / 2;
let ballX = Math.random() * (gameContainerWidth - ballDiameter);
let ballY = 0;
let ballSpeed = 2;
let score = 0;

document.addEventListener('mousemove', (e) => {
    const rect = gameContainer.getBoundingClientRect();
    paddleX = e.clientX - rect.left - paddleWidth / 2;
    paddleX = Math.max(0, Math.min(paddleX, gameContainerWidth - paddleWidth));
    paddle.style.left = paddleX + 'px';
});

function updateBallPosition() {
    ballY += ballSpeed;
    if (ballY + ballDiameter >= gameContainer.offsetHeight) {
        if (ballX + ballDiameter > paddleX && ballX < paddleX + paddleWidth) {
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
            ballSpeed += 0.5;
        } else {
            alert('Game Over! Your score is ' + score);
            resetGame();
            return;
        }
        ballY = 0;
        ballX = Math.random() * (gameContainerWidth - ballDiameter);
    }
    ball.style.top = ballY + 'px';
    ball.style.left = ballX + 'px';
    requestAnimationFrame(updateBallPosition);
}

function resetGame() {
    score = 0;
    ballSpeed = 2;
    ballY = 0;
    ballX = Math.random() * (gameContainerWidth - ballDiameter);
    scoreDisplay.textContent = 'Score: ' + score;
    updateBallPosition();
}

resetGame();
