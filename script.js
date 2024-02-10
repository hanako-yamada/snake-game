// Define the HTML elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logoGame = document.getElementById('logo');

// Define game variables
let gameSpeedDelay = 200;
let gameStarted = false;
let gameInterval;

const gridSize = 20;

let snake = [{ x: 10, y: 10 }]; // Snake initial position
let snakeDirection = 'left'; // Snake initial direction

let food = generateFoodPosition(); // Food initial position

// Draw game map, snake, food
function draw() {
    board.innerHTML = '';

    drawSnake();
    drawFood();
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
    const foodElement = createGameElement('div', 'food');

    setPosition(foodElement, food);
    board.appendChild(foodElement);
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
            // checkCollision();
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
        // checkCollision();
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
    console.log(gameSpeedDelay);
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

document.addEventListener('keydown', handleKeyPress);
