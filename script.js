//creating canvas & getting context
// const canvas = document.getElementById("pong");
// const context = canvas.getContext("2d");
const status = {
    yellow: 1,
    blue: 1,
    green: 1,
    red: 1,
    compDirectionSwitched : 0,
    lastTurnUp : true,
    lastTurnUpB : true,
    lastTurnUpC : true,
    nearWall:false,
    a : 51,
    b : 51,
    remaining : 4,
}
var player = {
    position: 2020,
    color : "#8888FF",
    trailColor : "#0000FF",
    direction : 1,
    status : 1,
}
var computer = {
    position: 7980 ,
    color : "#FFFF88",
    trailColor : "#FFFF00",
    direction : -1,
    status : 1,
}
var computerB = {
    position: 7920 ,
    color : "#FF8888",
    trailColor : "#FF0000",
    direction : -100,
    status : 1,
}
var computerC = {
    position: 2080 ,
    color : "#88FF88",
    trailColor : "#00FF00",
    direction : 100,
    status : 1,
}
function createGrid(){
    var i = 0;
    while(i < 10000){
        $("#grid").append(`<div class="cell" id=${i}></div>`);
        i++
    }
    var i = 0
    while(i < 10000){
        if(i<100 || i>9899 || i%100 == 0 || i%100 === 99){
            $("#"+i).css("background-color","#0000a0")
        }
        i++
    }
}
createGrid();

function draw(position, direction, color, trailColor, type, state){
    if(state === 1){
    var newPosition = position + direction
    if($("#"+newPosition).css("background-color") === "rgb(0, 0, 17)"){
        if(type === "player"){
            player.position = newPosition
        }else if(type === "computer"){
            computer.position = newPosition
        }else if(type === "computerB"){
            computerB.position = newPosition
        }else{
            computerC.position = newPosition
        }
        $("#"+position).css("background-color", trailColor);
        $("#"+newPosition).css("background-color", color);
    }
    else{
        status.remaining -= 1;
        if(type === "player"){
            player.status = 0
        }else if(type === "computer"){
            computer.status = 0
        }else if(type === "computerB"){
            computerB.status = 0
        }else{
            computerC.status = 0
        }
    }
}
}

function checkCollisions(position, direction, type){
    if((position%100 === 0 && direction === -1) || (position%100 === 99 && direction === 1) || (position<100 && direction === -100) || (position>9999 && direction === 100)){
        status.remaining -= 1;
        if(type === "player"){
            player.status = 0
        }else if(type === "computer"){
            computer.status = 0
        }else if(type === "computerB"){
            computerB.status = 0
        }else{
            computerC.status = 0
        }
    }
}
var newDirec = 0;
function computerAI(pos,dir,type){
    status.a += 1
    if(status.a > 50){
        status.a = 0
        var b = Math.floor(Math.random()*4)
        var ranDirec = (b === 0) ? -1 : (b === 1) ? 1 : (b === 2) ? 100 : -100
        var possibleNextPos = pos + ranDirec
        if($("#"+possibleNextPos).css("background-color") === "rgb(0, 0, 17)"){
            if(type === "a"){
                computer.direction = ranDirec
            }else if(type ==="b"){
                computerB.direction = ranDirec
            }else{
                computerC.direction = ranDirec
            }
        }
    }
    var newPos = pos + dir
    var aNewPos = newPos + dir
    var bNewPos = aNewPos + dir
    var cNewPos = bNewPos + dir
    var dNewPos = cNewPos + dir
    if($("#"+newPos).css("background-color") !== "rgb(0, 0, 17)" || $("#"+aNewPos).css("background-color") !== "rgb(0, 0, 17)" || $("#"+bNewPos).css("background-color") !== "rgb(0, 0, 17)" || $("#"+cNewPos).css("background-color") !== "rgb(0, 0, 17)" ||  $("#"+dNewPos).css("background-color") !== "rgb(0, 0, 17)"){
        if(dir%100 === 0){
            newDirec = (Math.random()-0.5 > 0) ? -1 : 1
            possibleNewPos = pos + newDirec
            if($("#"+possibleNewPos).css("background-color") === "rgb(0, 0, 17)"){
                dir = newDirec
            }
            newDirec = -newDirec
            possibleNewPos = pos + newDirec
            if($("#"+possibleNewPos).css("background-color") === "rgb(0, 0, 17)"){
                if(type === "a"){
                    computer.direction = newDirec
                }else if(type === "b"){
                    computerB.direction = newDirec
                }else{
                    computerC.direction = newDirec
                }
            }
        }
        else{
            newDirec = (Math.random()-0.5 > 0) ? -100 : 100
            possibleNewPos = pos + newDirec
            if($("#"+possibleNewPos).css("background-color") === "rgb(0, 0, 17)"){
                if(type === "a"){
                    computer.direction = newDirec
                }else if(type ==="b"){
                    computerB.direction = newDirec
                }else{
                    computerC.direction = newDirec
                }
            }
            newDirec = -newDirec
            possibleNewPos = computer.position + newDirec
            if($("#"+possibleNewPos).css("background-color") === "rgb(0, 0, 17)"){
                if(type === "a"){
                    computer.direction = newDirec
                }else if(type ==="b"){
                    computerB.direction = newDirec
                }else{
                    computerC.direction = newDirec
                }
            }
        }
    }
    if($("#"+newPos).css("background-color") !== "rgb(0, 0, 17)"){
        var up = computer.position-100
        var left = computer.position-1
        var down = computer.position+100
        var right = computer.position+1
        if($("#"+down).css("background-color") === "rgb(0, 0, 17)" && status.lastTurnUp === true && down !== newPos){
            if(type === "a"){
                computer.direction = 100
                status.lastTurnUp = false;
            }else if(type === "b"){
                computerB.direction = 100
                status.lastTurnUpB = false;
            }else{
                computerC.direction = 100
                status.lastTurnUpC = false;
            }
        }
        else if($("#"+left).css("background-color") === "rgb(0, 0, 17)" && left !== newPos){
            if(type === "a"){
                computer.direction = -1
            }else if(type === "b"){
                computerB.direction = -1
            }else{
                computerC.direction = -1
            }
        }
        else if($("#"+up).css("background-color") === "rgb(0, 0, 17)" && up !== newPos){
            if(type === "a"){
                computer.direction = -100
                status.lastTurnUp = true;
            }else if(type === "b"){
                computerB.direction = -100
                status.lastTurnUpB = true;
            }else{
                computerC.direction = -100
                status.lastTurnUpC = true;
            }
        }
        else if($("#"+right).css("background-color") === "rgb(0, 0, 17)" && right !== newPos){
            if(type === "a"){
                computer.direction = 1
            }else if(type === "b"){
                computerB.direction = 1
            }else{
                computerC.direction = 1
            }
        }
        //this last line is to make sure that when the last turn was up but the case to turn down is the only one to evaulate true the bike can still turn down 
        else if($("#"+down).css("background-color") === "rgb(0, 0, 17)"){
            if(type === "a"){
                computer.direction = 100
                status.lastTurnUp = false;
            }else if(type === "b"){
                computerB.direction = 100
                status.lastTurnUpB = false;
            }else{
                computerC.direction = 100
                status.lastTurnUpC = false;
            }
        }
        else{
            status.remaining -= 1;
            if(type === "player"){
            player.status = 0
        }else if(type === "computer"){
            computer.status = 0
        }else if(type === "computerB"){
            computerB.status = 0
        }else{
            computerC.status = 0
        }
        }
    }
}

function game(){
    if(status.remaining>1){
        draw(player.position, player.direction, player.color, player.trailColor, "player", player.status)
        draw(computer.position, computer.direction, computer.color, computer.trailColor, "computer", computer.status)
        draw(computerB.position, computerB.direction, computerB.color, computerB.trailColor, "computerB", computerB.status)
        draw(computerC.position, computerC.direction, computerC.color, computerC.trailColor, "computerC", computerC.status)
        checkCollisions(player.position, player.direction, "player")
        checkCollisions(computer.position, computer.direction, "computer")
        checkCollisions(computerB.position, computerB.direction, "computerB")
        checkCollisions(computerC.position, computerC.direction, "computerC")
        computerAI(computer.position, computer.direction, "a")
        computerAI(computerB.position, computerB.direction, "b")
        computerAI(computerC.position, computerC.direction, "c")
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
        status.remaining = 4
        player.status = 1
        computerC.status = 1
        computerB.status = 1
        computer.status = 1
        computer.position = 7980
        player.position = 2020
        computerB.position = 7920
        computerC.position = 2080
        status.a = 51
    }
  }
function keyUp(){
}