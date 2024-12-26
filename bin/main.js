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

let spaceshipX = canvas.width / 2 - 30;
let spaceshipY = canvas.height / 2 - 30;
let keysDown = {};
let bullets = [];

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

function setupkeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.key] = true;
    if (event.key === " ") {
      createBullet();
    }
  });

  document.addEventListener("keyup", function (event) {
    delete keysDown[event.key];
  });
}

function createBullet() {
  bullets.push({
    x: spaceshipX + 60,
    y: spaceshipY + 20,
  });
}

function updateBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].x += 5;
    if (bullets[i].x > canvas.width) {
      bullets.splice(i, 1);
      i--;
    }
  }
}

function update() {
  if ("ArrowUp" in keysDown) {
    spaceshipY -= 5;
  }
  if ("ArrowDown" in keysDown) {
    spaceshipY += 5;
  }
  spaceshipY = Math.max(0, Math.min(canvas.height - 60, spaceshipY));
  updateBullets();
}

function render() {
  if (backgroundImage.complete) {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  }
  if (spaceshipImage.complete) {
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  }
  bullets.forEach((bullet) => {
    ctx.drawImage(bulletImage, bullet.x, bullet.y);
  });
}

function main() {
  if (!gameOver) {
    update();
    render();
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height);
  }
}

loadImage();
setupkeyboardListener();
main();
