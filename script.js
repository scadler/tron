//creating canvas & getting context
// const canvas = document.getElementById("pong");
// const context = canvas.getContext("2d");
const status = {
    game : "inProgress",
    compDirectionSwitched : 0,
    lastTurnUp : true,
    nearWall:false
}
var player = {
    position: 1900,
    color : "#8888FF",
    trailColor : "#0000FF",
    direction : 1,
}
var computer = {
    position: 3724,
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
var newDirec = 0;
function computerAI(){
    var newPos = computer.position + computer.direction
    var aNewPos = newPos + computer.direction
    var bNewPos = aNewPos + computer.direction
    var cNewPos = bNewPos + computer.direction
    var dNewPos = cNewPos + computer.direction
    if($("#"+newPos).css("background-color") !== "rgb(0, 0, 17)" || $("#"+aNewPos).css("background-color") !== "rgb(0, 0, 17)" || $("#"+bNewPos).css("background-color") !== "rgb(0, 0, 17)" || $("#"+cNewPos).css("background-color") !== "rgb(0, 0, 17)" ||  $("#"+dNewPos).css("background-color") !== "rgb(0, 0, 17)"){
        if(computer.direction%75 === 0){
            newDirec = (Math.random()-0.5 > 0) ? -1 : 1
            possibleNewPos = computer.position + newDirec
            if($("#"+possibleNewPos).css("background-color") === "rgb(0, 0, 17)"){
                computer.direction = newDirec
            }
            newDirec = -newDirec
            possibleNewPos = computer.position + newDirec
            if($("#"+possibleNewPos).css("background-color") === "rgb(0, 0, 17)"){
                computer.direction = newDirec
            }
        }
        else{
            newDirec = (Math.random()-0.5 > 0) ? -75 : 75
            possibleNewPos = computer.position + newDirec
            if($("#"+possibleNewPos).css("background-color") === "rgb(0, 0, 17)"){
                computer.direction = newDirec
            }
            newDirec = -newDirec
            possibleNewPos = computer.position + newDirec
            if($("#"+possibleNewPos).css("background-color") === "rgb(0, 0, 17)"){
                computer.direction = newDirec
            }
        }
    }
    if($("#"+newPos).css("background-color") !== "rgb(0, 0, 17)"){
        var up = computer.position-75
        var left = computer.position-1
        var down = computer.position+75
        var right = computer.position+1
        if($("#"+down).css("background-color") === "rgb(0, 0, 17)" && status.lastTurnUp === true && down !== newPos){
            computer.direction = 75
            status.lastTurnUp = false;
        }
        else if($("#"+left).css("background-color") === "rgb(0, 0, 17)" && left !== newPos){
            computer.direction = -1
        }
        else if($("#"+up).css("background-color") === "rgb(0, 0, 17)" && up !== newPos){
            computer.direction = -75
            status.lastTurnUp = true;
        }
        else if($("#"+right).css("background-color") === "rgb(0, 0, 17)" && right !== newPos){
            computer.direction = 1
        }
        //this last line is to make sure that when the last turn was up but the case to turn down is the only one to evaulate true the bike can still turn down 
        else if($("#"+down).css("background-color") === "rgb(0, 0, 17)"){
            computer.direction = 75
            status.lastTurnUp = false;
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
setInterval(game,20)
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
        computer.position = 3724
        player.position = 1900
    }
  }
function keyUp(){
}