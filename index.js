var buttonColours=["red","yellow","green","blue"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

// $("h2").addClass("disp");
$(document).keypress(function(){
    if(!started){
        $("#title").text("Level " + level);
        nextSequence();
        started = true;
    }
    $("h2").hide();
});

$(".start-btn").click(function(){
    if(!started){
        $("#title").text("Level " + level);
        nextSequence();
        started = true;
    }
    $("h2").hide();
    $("#image").attr("src","./logos/playing.png");
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$(".btn-instructions").click(function(){
    $("#instructions").toggle();
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $(".score").text("Score: "+level);
    $("#title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel){  
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    } 
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("h2").toggle()
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver(){
    gamePattern=[];
    userClickedPattern=[];
    started=false;
    level=0;
    // $("h2").addClass("disp");
    $("#image").attr("src","./logos/start.png");
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}
