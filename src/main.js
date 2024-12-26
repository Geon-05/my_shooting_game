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

let spaceshipX = 50; // 우주선을 왼쪽에 고정
let spaceshipY = canvas.height / 2 - 30;
let keysDown = {};
let bullets = [];
let enemies = []; // 몬스터 배열

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
      createBullet(); // 스페이스바로 총알 발사
    }
  });

  document.addEventListener("keyup", function (event) {
    delete keysDown[event.key];
  });
}

function createBullet() {
  bullets.push({
    x: spaceshipX + 60, // 우주선의 오른쪽 끝
    y: spaceshipY + 20, // 우주선의 중앙
  });
}

function createEnemy() {
  let enemyY = Math.floor(Math.random() * (canvas.height - 60)); // 랜덤 Y 위치
  enemies.push({
    x: canvas.width,
    y: enemyY,
  });
}

function updateBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].x += 5; // 총알 이동 속도
    if (bullets[i].x > canvas.width) {
      bullets.splice(i, 1); // 화면을 벗어난 총알 제거
      i--;
    }
  }
}

function updateEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].x -= 3; // 몬스터 이동 속도
    if (enemies[i].x < 0) {
      enemies.splice(i, 1); // 화면을 벗어난 몬스터 제거
      i--;
    }
  }
}

function checkCollision() {
  for (let i = 0; i < enemies.length; i++) {
    for (let j = 0; j < bullets.length; j++) {
      let enemy = enemies[i];
      let bullet = bullets[j];

      // 충돌 판정 (간단히 처리)
      if (
        bullet.x < enemy.x + 60 &&
        bullet.x + 10 > enemy.x &&
        bullet.y < enemy.y + 60 &&
        bullet.y + 10 > enemy.y
      ) {
        enemies.splice(i, 1); // 몬스터 제거
        bullets.splice(j, 1); // 총알 제거
        score += 10; // 점수 추가
        i--;
        break;
      }
    }
  }
}

function update() {
  if ("ArrowUp" in keysDown) {
    spaceshipY -= 5; // 위로 이동
  }
  if ("ArrowDown" in keysDown) {
    spaceshipY += 5; // 아래로 이동
  }
  spaceshipY = Math.max(0, Math.min(canvas.height - 60, spaceshipY)); // 화면 경계 제한

  updateBullets();
  updateEnemies();
  checkCollision();
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height); // 배경
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY); // 우주선
  bullets.forEach((bullet) => {
    ctx.drawImage(bulletImage, bullet.x, bullet.y); // 총알
  });
  enemies.forEach((enemy) => {
    ctx.drawImage(enemyImage, enemy.x, enemy.y); // 몬스터
  });

  // 점수 표시
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

function main() {
  if (!gameOver) {
    update();
    render();
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(`Game Over! Final Score: ${score}`, canvas.width / 2 - 150, canvas.height / 2);
  }
}

// 일정 시간마다 몬스터 생성
setInterval(createEnemy, 1000); // 1초마다 몬스터 생성

loadImage();
setupkeyboardListener();
main();
