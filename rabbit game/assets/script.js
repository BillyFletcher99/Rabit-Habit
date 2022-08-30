const rabbit = document.getElementById("rabbit");
const carrot = document.getElementById("carrot");

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
  let carrotLeft = parseInt(
    window.getComputedStyle(carrot).getPropertyValue("left")
  );
  //check for collision
  if (carrotLeft > 0 && carrotLeft < 70 && rabbitTop >= 143) {
    rabbit.style.animationPlayState = "paused";
    carrot.style.animationPlayState = "paused";
    alert("Game Over");
    window.location.reload();
  }
}, 10);
document.addEventListener("keydown", function (event) {
  jump();
});
