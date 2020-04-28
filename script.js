//creating canvas & getting context
// const canvas = document.getElementById("pong");
// const context = canvas.getContext("2d");
var player = {
    position: 125,
    color : "#8888FF",
    trailColor : "#0000FF",
    direction : 1,
}
function createGrid(){
    var i = 0;
    console.log("grid")
    while(i < 5625){
        $("#grid").append(`<div class="cell" id=${i}></div>`);
        i++
    }
}
createGrid();
 function draw(position, direction, color, trailColor){
    var newPosition = position + direction
    player.position = newPosition
    $("#"+position).css("background-color", trailColor);
    $("#"+newPosition).css("background-color", color);
 }

function game(){
    draw(player.position, player.direction, player.color, player.trailColor)
 }
setInterval(game,100)
function resetGrid(){
    $("#grid").empty();
    createGrid();
}
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
        player.direction = -75
    }
    else if (key == "s") {
        player.direction = 75
    }
    else if(key == " ") {
    e.preventDefault();
    resetGrid()
    }
  }
function keyUp(){
}