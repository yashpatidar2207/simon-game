// step 2 --- create arr of buttonColours
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

// step 4 ---
var userClickedPattern = [];

// step 5 --- start game
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// step 4 --- user choosen colour
$(".btn").click(function () {
  // step 4 --- user choosen colour
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  // step 7 --- hr click pr array check hoga ki colour shi h ki nhi
  checkAnswer(userClickedPattern.length - 1);
});

// step 7 --- here we need to check last index value and length of both array
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    } 
  }
  else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

// step 1 --- create nextSequence()
function nextSequence() {
  // step 7 --- after matching of both arrays we will flush userClickPattern every time
  userClickedPattern = [];

  // step 6 --- game start and update level
  level++;
  $("#level-title").text("Level " + level);

  // step 2 --- random Number and colour
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // step 3 --- blink the randomChosenColour and play sound
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
