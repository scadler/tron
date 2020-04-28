//creating canvas & getting context
// const canvas = document.getElementById("pong");
// const context = canvas.getContext("2d");
var player = {
    position: 125,
    color : "#0000FF",
    direction : 1,
}
var i = 0;
 while(i < 2500){
        $("#grid").append(`<div class="cell" id=${i}></div>`);
        i++
 }
 function draw(position, direction ,color){
     var newPosition = position + direction
     player.position = newPosition
     $("#"+newPosition).css("background-color", color);
 }

function game(){
    draw(player.position, player.direction, player.color)
 }
setInterval(game,100)
 document.addEventListener('keydown', keyPressed)
document.addEventListener('keyup', keyUp)
function keyPressed(e){
    key = e.key
    if (key == "a") {
        player.direction = -1
    }
    else if(key == "d"){
        player.direction = 1
    }
    else if (key == "w") {
        player.direction = -50
    }
    else if (key == "s") {
        player.direction = 50
    }
    else if(key == " ") {
    e.preventDefault();
    }
  }
function keyUp(){
}