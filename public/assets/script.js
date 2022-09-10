const rabbit = document.getElementById("rabbit");
const rock = document.getElementById("rock");
const carrot = document.getElementById("carrot");
const myScore = document.getElementById("myScore");
let points = 0;
let pointCollected = false;
var biteSound;

function jump() {
  //making rabbit jump
  if (dispatchEvent.classList != "jump") {
    //first it checks if the rabbit is mid-jump. If not, it makes it jump.
    rabbit.classList.add("jump");
    setTimeout(function () {
      rabbit.classList.remove("jump");
    }, 300);
  }
}

let checkAlive = setInterval(function () {
  let rabbitTop = parseInt(
    window.getComputedStyle(rabbit).getPropertyValue("top")
  );
  let rockLeft = parseInt(
    window.getComputedStyle(rock).getPropertyValue("left")
  );
  //check for collision
  if (rockLeft > 0 && rockLeft < 70 && rabbitTop >= 130) {
    rabbit.style.animationPlayState = "paused";
    rock.style.animationPlayState = "paused";
    alert("Game Over");
    window.location.reload();
  }
}, 10);
document.addEventListener("keydown", function (event) {
  jump();
});

//collecting carrots
let carrotCollection = setInterval(function () {
  let rabbitTop = parseInt(
    window.getComputedStyle(rabbit).getPropertyValue("top")
  );
  let carrotLeft = parseInt(
    window.getComputedStyle(carrot).getPropertyValue("left")
  );
  //check for collision
  console.log(carrotLeft, rabbitTop, points);
  if (carrotLeft > 0 && carrotLeft < 70 && rabbitTop <= 85 && !pointCollected) {
    console.log(points);
    points++;
    pointCollected = true;
    biteSound.play();
  }
  if (carrotLeft >= 70) {
    pointCollected = false;
  }
  myScore.innerHTML = `score: ${points}`;
}, 10);

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  this.sound.playbackRate = 1;
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

function initGame() {
  biteSound = new sound("assets/Bite.mp3");
}

initGame();
