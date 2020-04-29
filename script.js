//creating canvas & getting context
// const canvas = document.getElementById("pong");
// const context = canvas.getContext("2d");
const status = {
    game : "inProgress",
    compDirectionSwitched : 0,
    lastTurnUp : true,
    nearWall:false,
    a : 51
}
var player = {
    position: 2020,
    color : "#8888FF",
    trailColor : "#0000FF",
    direction : 1,
}
var computer = {
    position: 7980 ,
    color : "#FFFF88",
    trailColor : "#FFFF00",
    direction : -1,
}
function createGrid(){
    var i = 0;
    while(i < 10000){
        $("#grid").append(`<div class="cell" id=${i}></div>`);
        i++
    }
    var i = 0
    while(i < 10000){
        if(i<100 || i>9999 || i%100 == 0 || i%100 === 99){
            $("#"+i).css("background-color","#0000a0")
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
    if((position%100 === 0 && direction === -1) || (position%100 === 99 && direction === 1) || (position<100 && direction === -100) || (position>9999 && direction === 100)){
        status.game = "over"
    }
}
var newDirec = 0;
function computerAI(){
    status.a += 1
    if(status.a > 50){
        status.a = 0
        var b = Math.floor(Math.random()*4)
        var ranDirec = (b === 0) ? -1 : (b === 1) ? 1 : (b === 2) ? 100 : -100
        console.log("worksA")
        console.log(ranDirec)
        var possibleNextPos = computer.position + ranDirec
        if($("#"+possibleNextPos).css("background-color") === "rgb(0, 0, 17)"){
            computer.direction = ranDirec
            console.log("worksB")
        }
    }
    var newPos = computer.position + computer.direction
    var aNewPos = newPos + computer.direction
    var bNewPos = aNewPos + computer.direction
    var cNewPos = bNewPos + computer.direction
    var dNewPos = cNewPos + computer.direction
    if($("#"+newPos).css("background-color") !== "rgb(0, 0, 17)" || $("#"+aNewPos).css("background-color") !== "rgb(0, 0, 17)" || $("#"+bNewPos).css("background-color") !== "rgb(0, 0, 17)" || $("#"+cNewPos).css("background-color") !== "rgb(0, 0, 17)" ||  $("#"+dNewPos).css("background-color") !== "rgb(0, 0, 17)"){
        if(computer.direction%100 === 0){
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
            newDirec = (Math.random()-0.5 > 0) ? -100 : 100
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
        var up = computer.position-100
        var left = computer.position-1
        var down = computer.position+100
        var right = computer.position+1
        if($("#"+down).css("background-color") === "rgb(0, 0, 17)" && status.lastTurnUp === true && down !== newPos){
            computer.direction = 100
            status.lastTurnUp = false;
        }
        else if($("#"+left).css("background-color") === "rgb(0, 0, 17)" && left !== newPos){
            computer.direction = -1
        }
        else if($("#"+up).css("background-color") === "rgb(0, 0, 17)" && up !== newPos){
            computer.direction = -100
            status.lastTurnUp = true;
        }
        else if($("#"+right).css("background-color") === "rgb(0, 0, 17)" && right !== newPos){
            computer.direction = 1
        }
        //this last line is to make sure that when the last turn was up but the case to turn down is the only one to evaulate true the bike can still turn down 
        else if($("#"+down).css("background-color") === "rgb(0, 0, 17)"){
            computer.direction = 100
            status.lastTurnUp = false;
        }
        else{
            status.game = "over"
        }
    }
}


function game(){
    if(status.game==="inProgress"){
        draw(player.position, player.direction, player.color, player.trailColor, "player")
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
        player.direction = -100
    }
    else if (key == "s") {
        player.direction = 100
    }
    else if(key == " ") {
        e.preventDefault();
        resetGrid()
        status.game = "inProgress"
        computer.position = 7980
        player.position = 2020
        status.a = 51
    }
  }
function keyUp(){
}