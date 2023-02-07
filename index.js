var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;


function nextSequence(){
    userClickPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 3);    
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var color = "#" + randomChosenColor;
    $(color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
  



    
}
function playSound(name){
    new Audio("sounds/" + name + ".mp3").play();

}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $('#' + currentColor).removeClass("pressed");
    },100);


}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userClickPattern.length);
    checkAnswer(userClickPattern.length-1);

})

$(document).keydown(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started = true;

    }
});

function checkAnswer(currentLevel) {

    console.log(gamePattern[currentLevel]);
    console.log(userClickPattern[currentLevel]);
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {

      console.log("success");
      console.log(userClickPattern.length);
      console.log(gamePattern.length);

      if (userClickPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        $("h1").text("Game Over!");
        new Audio("sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


