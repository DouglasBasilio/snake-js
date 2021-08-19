let canvas = document.getElementById("snake"); // selecionamos o ID do canvas
let context = canvas.getContext("2d"); // renderiza o desenho
let box = 32; // pixels por frame

let snake = [];
// snake size
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

// diração
let direction = "right";

// food
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// draw canvas
function createBG() {
    context.fillStyle = "lightgreen"; // cor canvas
    context.fillRect(0, 0, 16 * box, 16 * box); // desenha o retângulo x, y, altura e largura
}

// Snake será um array de coordenadas
function createSnake(){
    // for vai percorrer o tamanho do array e incrementar
    for (i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// desenhar a comida
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);
// mudando direção
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left"; // 37 left
    if(event.keyCode == 38 && direction != "down") direction = "up"; // 38 up
    if(event.keyCode == 39 && direction != "left") direction = "right"; // 39 right
    if(event.keyCode == 40 && direction != "up") direction = "down"; // 40 down
}

function initGame(){

    //não desaparecer o elementa na tela
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    //valida chocar
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert("Game Over :'(")
        }
    }
    
    createBG();
    createSnake(); 
    drawFood();

    //ponto de partida
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //coordenadas (condicionais que vai mostrar o lado que a cobra vai)
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //snake eat the food
    if(snakeX != food.x || snakeY != food.y) {
        //retirar último elemento do array
        snake.pop();
    } else {
        // recebe novamente uma posição aleatória
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    //O método unshift insere os valores fornecidos no início de um objeto do tipo array.
    snake.unshift(newHead);
}

//intervalo de 100ms para iniciar o jogo, a cada 100ms será renovada
let game = setInterval(initGame, 100);







