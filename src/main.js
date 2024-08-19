let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 400;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver = false;
let score = 0;

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.jpg";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "images/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/gameover.jpg";
}

let spaceshipX = 0;
let spaceshipY = canvas.height / 2 - 30;

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

let keysDown = {};
function setupkeyboardListener(){
  document.addEventListener("keydown", function (event){
    keysDown[event.key] = true;
    console.log(keysDown);
  });
}

function update(){
  
}

function main() {
  if (!gameOver) {
    render();
    requestAnimationFrame(main);
  }
}

loadImage();
setupkeyboardListener();
main();
// 캔버스 만들기 가로형으로
// 변수 선언
// 이미지 올리기
// 캐릭터 캔버스에 올리기 및 이동범위 지정
