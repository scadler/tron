//creating canvas & getting context
// const canvas = document.getElementById("pong");
// const context = canvas.getContext("2d");
const status = {
    game : "inProgress",
}
var player = {
    position: 125,
    color : "#8888FF",
    trailColor : "#0000FF",
    direction : 1,
}
var computer = {
    position: 1175,
    color : "#FFFF88",
    trailColor : "#FFFF00",
    direction : -1,
}
function createGrid(){
    var i = 0;
    while(i < 5625){
        $("#grid").append(`<div class="cell" id=${i}></div>`);
        i++
    }
    var i = 0
    while(i < 5625){
        if(i<75 || i>5549 || i%75 == 0 || i%75 === 74){
            $("#"+i).css("background-color","#000070")
        }
        i++
    }
}
createGrid();
 function draw(position, direction, color, trailColor, type){
    var newPosition = position + direction
    if($("#"+newPosition).css("background-color") === "rgb(0, 0, 17)"){
        if(type === "player"){
            player.position = newPosition
        }else{
            computer.position = newPosition
        }
        $("#"+position).css("background-color", trailColor);
        $("#"+newPosition).css("background-color", color);
    }
    else{
        status.game = "over"
    }
}
function checkCollisions(position, direction){
    if((position%75 === 0 && direction === -1) || (position%75 === 74 && direction === 1) || (position<75 && direction === -75) || (position>5549 && direction === 75)){
        status.game = "over"
    }
}
function computerAI(){
    var newPos = computer.position + computer.direction
    if(Math.random()-0.9 > 0){
        var num = Math.random()
        const PotentialDirection = (num < 0.25) ? -1 : (num < 0.5) ? 1 : (num<0.75) ? 75 : -75;
        PotentialPosition = computer.position + PotentialDirection;
        if(PotentialPosition % 75 <= 1 || PotentialPosition % 75 >=72 || PotentialPosition<255 || PotentialPosition>5399){
            PotentialDirection *= -1
        }
        if($("#"+ PotentialPosition).css("background-color") === "rgb(0, 0, 17)"){
            computer.position = PotentialPosition
        }
    }
    else if($("#"+newPos).css("background-color") !== "rgb(0, 0, 17)"){
        var up = computer.position-75
        var left = computer.position-1
        var down = computer.position+75
        var right = computer.position+1
        if($("#"+up).css("background-color") === "rgb(0, 0, 17)"){
            computer.direction = -75
        }
        else if($("#"+left).css("background-color") === "rgb(0, 0, 17)"){
            computer.direction = -1
        }
        else if($("#"+down).css("background-color") === "rgb(0, 0, 17)"){
            computer.direction = 75
        }
        else if($("#"+right).css("background-color") === "rgb(0, 0, 17)"){
            computer.direction = 1
        }
        else{
            status.game = "over"
        }
    }
}
function game(){
    if(status.game==="inProgress"){
        // draw(player.position, player.direction, player.color, player.trailColor, "player")
        draw(computer.position, computer.direction, computer.color, computer.trailColor, "computer")
        checkCollisions(player.position, player.direction)
        checkCollisions(computer.position, computer.direction)
        computerAI()
    }
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
        status.game = "inProgress"
    }
  }
function keyUp(){
}