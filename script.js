// Define the HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logoGame = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Define game variables
let gameSpeedDelay = 200;
let gameStarted = false;
let gameInterval;

const gridSize = 20;

let snake = [{ x: 10, y: 10 }]; // Snake initial position
let snakeDirection = 'left'; // Snake initial direction

let food = generateFoodPosition(); // Food initial 
let highScore = 0;

// Draw game map, snake, food
function draw() {
    board.innerHTML = '';

    drawSnake();
    drawFood();
    updateScore();
}

// Draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div', 'snake');

        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

// Create a snake or food cube / div
function createGameElement(tag, className) {
    const element = document.createElement(tag);

    element.className = className;

    return element;
}

// Set the position of the snake or food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// Draw food
function drawFood() {
    if (gameStarted) {
        const foodElement = createGameElement('div', 'food');

        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

// Randomically generate the food position
function generateFoodPosition() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y };
}

// Move the Snake
function moveSnake() {
    const head = { ...snake[0] };

    switch (snakeDirection) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'down':
            head.y++;
            break;
        case 'up':
            head.y--;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFoodPosition();
        increaseSpeed();
        clearInterval(gameInterval); // Clear past interval
        gameInterval = setInterval(() => {
            moveSnake();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

// Start game function
function startGame() {
    gameStarted = true; // Keep track of a running game
    instructionText.style.display = 'none';
    logoGame.style.display = 'none';
    gameInterval = setInterval(() => {
        draw();
        moveSnake();
        checkCollision();
    }, gameSpeedDelay);
}

function handleKeyPress(event) {
    if (!gameStarted &&
        (event.code === 'Space' || event.key === ' ')) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                snakeDirection = 'up';
                break;
            case 'ArrowDown':
                snakeDirection = 'down';
                break;
            case 'ArrowLeft':
                snakeDirection = 'left';
                break;
            case 'ArrowRight':
                snakeDirection = 'right';
                break;
        }
    }
}

function increaseSpeed() {
    if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}

function checkCollision() {
    const head = snake[0];

    if ((head.x < 1 || head.x > gridSize)
        || (head.y < 1 || head.y > gridSize)) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        let snakeActualPosition = snake[i];

        if (head.x === snakeActualPosition.x
            && head.y === snakeActualPosition.y) {
            resetGame();
        }
    }
}

function resetGame() {
    updateHighscore();
    stopGame();
    snake = [ { x: 10, y: 10 } ];
    food = generateFoodPosition();
    snakeDirection = 'right';
    gameSpeedDelay = 200;
    updateScore();
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}

function updateHighscore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
    highScoreText.style.display = 'block';
}

document.addEventListener('keydown', handleKeyPress);
