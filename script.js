const grass = 50;
const pokeball = 5;
const mainBody = document.querySelector("body");
const player = document.querySelector(".character");
const player_pos = {
  x: parseInt(window.innerWidth / 2),
  y: parseInt(window.innerHeight / 2),
};
const player_move = {
  x: 0,
  y: 0,
};

const thunderShockSound = new Audio("Thunderbolt.mp3");
const move = new Audio("move.mp3");
const bgMusic = new Audio("bg1.mp3");
const restartSection = document.querySelector("#restart");
const balls = [];
const pikas = [];
const score = document.querySelector("#score");
const lives = document.querySelector("#life");
const finalScore = document.querySelector("#finalScore");
const restartago = document.querySelector("#restartAGO button");
const restartat = document.querySelector("#restartAT");

let livesCount = 3;
let scoreCount = 0;

function setGrass() {
  for (let i = 0; i < grass; i++) {
    const div = document.createElement("div");
    div.classList.add("grass");

    div.style.left = Math.random() * 100 + "%";
    div.style.top = Math.random() * 100 + "%";
    document.body.appendChild(div);
  }
}

function createBall() {
  const div = document.createElement("div");
  div.classList.add("pokeball");
  let x = Math.random() * 100 + "%";
  let y = Math.random() * 100 + "%";
  let p = Math.random() * 100;
  let pflag = p > 80 ? true : false;
  div.style.left = x;
  div.style.top = y;
  let pika = createPikachu(x, y, pflag);
  balls.push({
    ball: div,
    pikabyte: pflag,
    pika: pika,
  });
  document.body.appendChild(div);
}

function createPikachu(x, y, pflag) {
  if (pflag) {
    const pika = document.createElement("div");
    pika.classList.add("pikachu");
    pika.style.left = x;
    pika.style.top = y;
    pikas.push({
      pika: pika,
      pika_pos: {
        x,
        y,
      },
    });
    return pika;
  } else {
    return null;
  }
}

function setPokeball() {
  for (let i = 0; i < pokeball; i++) {
    createBall();
  }
}

function collision($div1, $div2) {
  var x1 = $div1.getBoundingClientRect().left;
  var y1 = $div1.getBoundingClientRect().top;
  var h1 = $div1.clientHeight;
  var w1 = $div1.clientWidth;
  var b1 = y1 + h1;
  var r1 = x1 + w1;

  var x2 = $div2.getBoundingClientRect().left;
  var y2 = $div2.getBoundingClientRect().top;
  var h2 = $div2.clientHeight;
  var w2 = $div2.clientWidth;
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

function checkCollision() {
  balls.forEach((ball) => {
    if (collision(ball.ball, player)) {
      ball.ball.remove();
      if (ball.pikabyte) {
        looseLife(ball.pika);
      } else {
        showScore();
        move.play();
      }
      createBall();
    }
  });
}

function showScore() {
  scoreCount += 1;
  score.innerHTML = scoreCount;
}

function looseLife(pika) {
  document.body.appendChild(pika);
  let thunder = document.createElement("div");
  thunder.classList.add("thunder");
  thunder.style.left = player.style.left;
  thunder.style.top = player.style.top;
  document.body.appendChild(thunder);
  player.classList.add("thunderShock");
  thunderShockSound.play();
  setTimeout(() => {
    thunder.remove();
    pika.remove();
    player.classList.remove("thunderShock");
  }, 3000);
  removeLife();
}

function gameOver() {
  restartSection.style.display = "block";
  finalScore.innerHTML = scoreCount;
}

function removeLife() {
  if (livesCount == 3) {
    lives.innerHTML = "❤️❤️💜";
  } else if (livesCount == 2) {
    lives.innerHTML = "❤️💜💜";
  } else if (livesCount == 1) {
    lives.innerHTML = "💜💜💜";
    gameOver();
  }
  livesCount -= 1;
}

function run() {
  player_pos.x += player_move.x;
  player_pos.y += player_move.y;
  player.style.left = player_pos.x + "px";
  player.style.top = player_pos.y + "px";
  bgMusic.play();
  checkCollision();
  requestAnimationFrame(run);
}

function init() {
  setGrass();
  setPokeball();
  run();
}

init();

window.addEventListener("keydown", function (e) {
  if (e.key == "ArrowUp") {
    player_move.x = 0;
    player_move.y = -2;
    player.style.backgroundImage = "url('Character-back-side.png')";
  } else if (e.key == "ArrowDown") {
    player_move.x = 0;
    player_move.y = 2;
    player.style.backgroundImage = "url('Character-front-side.png')";
  } else if (e.key == "ArrowLeft") {
    player_move.x = -2;
    player_move.y = 0;
    player.style.backgroundImage = "url('Character-left-side.png')";
  } else {
    player_move.x = 2;
    player_move.y = 0;
    player.style.backgroundImage = "url('Character-right-side.png')";
  }
  player.classList.add("active");
});

window.addEventListener("keyup", function (e) {
  player_move.x = 0;
  player_move.y = 0;
  player.classList.remove("active");
});

restartago.addEventListener("click", function () {
  restartSection.style.display = "none";
  window.location.reload();
});

restartat.addEventListener("click", function () {
  window.location.reload();
});
