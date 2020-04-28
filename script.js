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
function checkCollisions(position, direction){
    if(position%75 === 0 || (position-74) %75 === 0){
        //will later make this code end the game
        player.position = 1075
    }
    else if((position<75 && direction === -75) || position>5549 && direction === 75){
        player.position = 1075
    }
}
function game(){
    draw(player.position, player.direction, player.color, player.trailColor)
    checkCollisions(player.position, player.direction)
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