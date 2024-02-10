// Define the HTML elements
const board = document.getElementById('game-board');

// Define game variables
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
    snake.pop();
}
