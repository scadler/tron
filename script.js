function nextPage(){
   window.location.href = 'game.html'
}
function playAudio(){
    var lightbikeAudio = document.getElementById("lightbike");
    lightbikeAudio.volume = 0.5;
    lightbikeAudio.loop = true;
    lightbikeAudio.defaultPlaybackRate = 0.2;
    lightbikeAudio.currentTime = 0;
    lightbikeAudio.play();
}
$("#lightbike").onload = function() {
    playAudio()   
}

$("#mainTitle").click(function(){
    $("#startAudio").append(`<audio id="start" preload="auto" autoplay="autoplay"><source src="start.mp3" type="audio/mp3" /></audio>`)
    var startAudio = document.getElementById("start");
    var music = document.getElementById("music");
    music.pause();
    startAudio.volume = 0.2;
    setTimeout(nextPage, 3800);
});
const status = {
	yellow: 1,
	blue: 1,
	green: 1,
	red: 1,
	compDirectionSwitched: 0,
	lastTurnUp: true,
	lastTurnUpB: true,
	lastTurnUpC: true,
	nearWall: false,
	a: 51,
	b: 51,
	colorsRetro: 1,
	remaining: 3,
    obstacles: 0,
    floorColor: "rgb(0, 0, 17)"
}
var player = {
	position: 2020,
	color: "#8888FF",
	trailColor: "#0000FF",
	direction: 1,
	status: 1,
	wallColor: "#0000a0",
}
var computer = {
	position: 7980,
	color: "#FFFF88",
	trailColor: "#FFFF00",
	direction: -1,
	status: 1,
}
var computerB = {
	position: 7920,
	color: "#FF8888",
	trailColor: "#FF0000",
	direction: -100,
	status: 1,
}
var computerC = {
	position: 2080,
	color: "#88FF88",
	trailColor: "#00FF00",
	direction: 100,
	status: 1,
}

function resetText() {
	$(".gameOverText").hide();
}

function createGrid() {
	resetText()
	var i = 0;
	while (i < 10000) {
		$("#grid").append(`<div class="cell" id=${i}></div>`);
		i++
    }
    $(".cell").css("background-color",status.floorColor)
	var i = 0
	if (status.obstacles === 1) {
		createObstacles()
	} else if (status.obstacles === 2) {
		createWalls()
	}
	while (i < 10000) {
		if (i < 100 || i > 9899 || i % 100 == 0 || i % 100 === 99) {
			$("#" + i).css("background-color", player.wallColor)
		}
		i++
	}
	if (status.colorsRetro === 1) {
		$(".cell").css({
			"border-right": "1px solid #00001b",
			"border-bottom": "1px solid #00001b",
		})
	} else if (status.colorsRetro === 2) {
		$(".cell").css({
			"border-right": "1px solid #000000",
			"border-bottom": "1px solid #000000",
        })
    }
    else if (status.colorsRetro === 3) {
		$(".cell").css({
			"border-right": "1px solid #090909",
			"border-bottom": "1px solid #090909",
		})
	} else if (status.colorsRetro === 0) {
		$(".cell").css({
			"border-right": "1px solid #151515",
			"border-bottom": "1px solid #151515",
		})
    }
}

function createObstacles() {
	var xA = 1010
	while (xA < 1090) {
        $("#" + xA).css("background-color", player.wallColor)
        var id = xA + 8000    
        $("#" + id).css("background-color", player.wallColor)
		xA++
    }
    var xB = 1010
    while (xB < 9101) {
        $("#" + xB).css("background-color", player.wallColor)
        var idB = xB + 80
        $("#" + idB).css("background-color", player.wallColor)
		xB += 100
    }
}

function createWalls() {
	var int = 1549
	var intC = 4915
	while (int < 8500) {
		if (int < 3500 || int > 6500) {
			$("#" + int).css("background-color", player.wallColor)
			var intB = int + 1
			$("#" + intB).css("background-color", player.wallColor)
		}
		int += 100
	}
	while (intC < 4985) {
		if (intC < 4935 || intC > 4964) {
			$("#" + intC).css("background-color", player.wallColor)
			var intD = intC + 100
			$("#" + intD).css("background-color", player.wallColor)
		}
		intC += 1
	}
}
createGrid();

function draw(position, direction, color, trailColor, type, state) {
	if (state === 1) {
		var newPosition = position + direction
		if ($("#" + newPosition).css("background-color") === status.floorColor) {
			if (type === "player") {
				player.position = newPosition
			} else if (type === "computer") {
				computer.position = newPosition
			} else if (type === "computerB") {
				computerB.position = newPosition
			} else {
				computerC.position = newPosition
			}
			$("#" + position).css("background-color", trailColor);
			$("#" + newPosition).css("background-color", color);
			$("#" + newPosition).addClass(type)
			$("#" + position).addClass(type + "Trail")
		} else {
			status.remaining -= 1;
			if (type === "player") {
				player.status = 0
				changeLightbikeColor(type, position)
			} else if (type === "computer") {
				computer.status = 0
				changeLightbikeColor(type, position)
			} else if (type === "computerB") {
				computerB.status = 0
				changeLightbikeColor(type, position)
			} else if (type === "computerC") {
				computerC.status = 0
				changeLightbikeColor(type, position)
			}
			status.remaining = computer.status + computerB.status + computerC.status
		}
    }
    if (player.status !== 1 && status.remaining === 0) {
        const lightbikeAudio = document.getElementById("lightbike");
        lightbikeAudio.pause();
    }
}

function checkCollisions(position, direction, type) {
	if ((position % 100 === 0 && direction === -1) || (position % 100 === 99 && direction === 1) || (position < 100 && direction === -100) || (position > 9999 && direction === 100)) {
		status.remaining -= 1;
		if (type === "player") {
			player.status = 0
			changeLightbikeColor(type, position)
		} else if (type === "computer") {
			computer.status = 0
			changeLightbikeColor(type, position)
		} else if (type === "computerB") {
			computerB.status = 0
			changeLightbikeColor(type, position)
		} else if (type === "computerC") {
			computerC.status = 0
			changeLightbikeColor(type, position)
		}
		status.remaining = computer.status + computerB.status + computerC.status
	}
}
var newDirec = 0;

function computerAI(pos, dir, type) {
	status.a += 1
	if (Math.random() - 0.99 > 0) {
		status.a = 0
		var b = Math.floor(Math.random() * 4)
		var ranDirec = (b === 0) ? -1 : (b === 1) ? 1 : (b === 2) ? 100 : -100
		var possibleNextPos = pos + ranDirec
		if ($("#" + possibleNextPos).css("background-color") === status.floorColor) {
			if (type === "a") {
				computer.direction = ranDirec
			} else if (type === "b") {
				computerB.direction = ranDirec
			} else {
				computerC.direction = ranDirec
			}
		}
	}
	var newPos = pos + dir
	var aNewPos = newPos + dir
	var bNewPos = aNewPos + dir
	var cNewPos = bNewPos + dir
	var dNewPos = cNewPos + dir
	if ($("#" + newPos).css("background-color") !== status.floorColor || $("#" + aNewPos).css("background-color") !== status.floorColor || $("#" + bNewPos).css("background-color") !== status.floorColor || $("#" + cNewPos).css("background-color") !== status.floorColor || $("#" + dNewPos).css("background-color") !== status.floorColor) {
		if (dir % 100 === 0) {
			newDirec = (Math.random() - 0.5 > 0) ? -1 : 1
			possibleNewPos = pos + newDirec
			if ($("#" + possibleNewPos).css("background-color") === status.floorColor) {
				dir = newDirec
			}
			newDirec = -newDirec
			possibleNewPos = pos + newDirec
			if ($("#" + possibleNewPos).css("background-color") === status.floorColor) {
				if (type === "a") {
					computer.direction = newDirec
				} else if (type === "b") {
					computerB.direction = newDirec
				} else {
					computerC.direction = newDirec
				}
			}
		} else {
			newDirec = (Math.random() - 0.5 > 0) ? -100 : 100
			possibleNewPos = pos + newDirec
			if ($("#" + possibleNewPos).css("background-color") === status.floorColor) {
				if (type === "a") {
					computer.direction = newDirec
				} else if (type === "b") {
					computerB.direction = newDirec
				} else {
					computerC.direction = newDirec
				}
			}
			newDirec = -newDirec
			possibleNewPos = computer.position + newDirec
			if ($("#" + possibleNewPos).css("background-color") === status.floorColor) {
				if (type === "a") {
					computer.direction = newDirec
				} else if (type === "b") {
					computerB.direction = newDirec
				} else {
					computerC.direction = newDirec
				}
			}
		}
	}
	if ($("#" + newPos).css("background-color") !== status.floorColor) {
		var up = computer.position - 100
		var left = computer.position - 1
		var down = computer.position + 100
		var right = computer.position + 1
		if ($("#" + down).css("background-color") === status.floorColor && status.lastTurnUp === true && down !== newPos) {
			if (type === "a") {
				computer.direction = 100
				status.lastTurnUp = false;
			} else if (type === "b") {
				computerB.direction = 100
				status.lastTurnUpB = false;
			} else {
				computerC.direction = 100
				status.lastTurnUpC = false;
			}
		} else if ($("#" + left).css("background-color") === status.floorColor && left !== newPos) {
			if (type === "a") {
				computer.direction = -1
			} else if (type === "b") {
				computerB.direction = -1
			} else {
				computerC.direction = -1
			}
		} else if ($("#" + up).css("background-color") === status.floorColor && up !== newPos) {
			if (type === "a") {
				computer.direction = -100
				status.lastTurnUp = true;
			} else if (type === "b") {
				computerB.direction = -100
				status.lastTurnUpB = true;
			} else {
				computerC.direction = -100
				status.lastTurnUpC = true;
			}
		} else if ($("#" + right).css("background-color") === status.floorColor && right !== newPos) {
			if (type === "a") {
				computer.direction = 1
			} else if (type === "b") {
				computerB.direction = 1
			} else {
				computerC.direction = 1
			}
		}
		//this last line is to make sure that when the last turn was up but the case to turn down is the only one to evaulate true the bike can still turn down 
		else if ($("#" + down).css("background-color") === status.floorColor) {
			if (type === "a") {
				computer.direction = 100
				status.lastTurnUp = false;
			} else if (type === "b") {
				computerB.direction = 100
				status.lastTurnUpB = false;
			} else {
				computerC.direction = 100
				status.lastTurnUpC = false;
			}
		} else {
			if (type === "player") {
				changeLightbikeColor(type, position)
				player.status = 0
			} else if (type === "computer") {
				changeLightbikeColor(type, position)
				computer.status = 0
			} else if (type === "computerB") {
				changeLightbikeColor(type, position)
				computerB.status = 0
			} else if (type === "computerC") {
				changeLightbikeColor(type, position)
				computerC.status = 0
			}
			status.remaining = computer.status + computerB.status + computerC.status
		}
	}
}

function changeLightbikeColor(type, position) {
    var crash = document.getElementById("crash");
    crash.play();
	$("." + type).addClass(type + "Trail")
	$("#" + position).addClass(type + "Trail")
	$("#2020").addClass("playerTrail")
	$("#7980").addClass("computertTail")
	$("#7920").addClass("computerBTrail")
	$("#2080").addClass("computerCTrail")
	var typeTrail = type + "Trail"
	$(`.${typeTrail}`).css("background-color", status.floorColor)
	if (type === "player") {
		$("#2020").css("background-color", status.floorColor)
		$("#" + position).addClass("playertrail")
		$("#blue").css("color", "#000011")
	} else if (type === "computer") {
		$("#7980").css("background-color", status.floorColor)
		$("#" + position).addClass("computertrail")
		$("#yellow").css("color", "#000011")
	} else if (type === "computerB") {
		$("#7920").css("background-color", status.floorColor)
		$("#" + position).addClass("computerBtrail")
		$("#red").css("color", "#000011")
	} else if (type === "computerC") {
		$("#2080").css("background-color", status.floorColor)
		$("#" + position).addClass("computerCtrail")
		$("#green").css("color", "#000011")
	}
	if (player.status !== 1) {
		$(".buttons").css("opacity", "1");
        $("#gameOver").show();
        const lightbikeAudio = document.getElementById("lightbike");
        lightbikeAudio.pause();
	} else if (status.remaining === 0) {
		$(".buttons").css("opacity", "1");
        $("#gameWon").show();
        const lightbikeAudio = document.getElementById("lightbike");
        lightbikeAudio.pause();
	}
}

function resetGame() {
	$(".buttons").css("opacity", "0.4")
	status.remaining = 3
	player.status = 1
	computerC.status = 1
	computerB.status = 1
	computer.status = 1
	computer.position = 7980
	player.position = 2020
	computerB.position = 7920
	computerC.position = 2080
	status.a = 51
	$("#blue").css("color", player.trailColor)
	$("#yellow").css("color", computer.trailColor)
	$("#red").css("color", computerB.trailColor)
    $("#green").css("color", computerC.trailColor)
    playAudio()
}

function game() {
	if (player.status === 1 && status.remaining !== 0) {
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
setInterval(game, 100)

function resetGrid() {
	$("#grid").empty();
    createGrid();
}
document.addEventListener('keydown', keyPressed)

function keyPressed(e) {
	key = e.key
	if (key == "a") {
		if (player.direction !== 1) {
			player.direction = -1
		}
	} else if (key == "d") {
		if (player.direction !== -1) {
			player.direction = 1
		}
	} else if (key == "w") {
		if (player.direction !== 100) {
			player.direction = -100
		}
	} else if (key == "s") {
		if (player.direction !== -100) {
			player.direction = 100
		}
	} else if (key == " ") {
		e.preventDefault();
		resetGrid()
		resetGame()
	}
}
//try to use a format like this to compress the code, this one wont work well
// var colorScheme = {
//     vibrant = ["#0000FF","#8888FF","#FFFF00","#FFFF88","#FF0000","#FF8888","#00FF00","#88FF88","#0000a0","rgb(0, 0, 17)"],
// }
function changeColors(i){
	player.trailColor = colorScheme.vibrant[0]
    player.color = colorScheme.vibrant[1]
    computer.trailColor = colorScheme.vibrant[2]
	computer.color = colorScheme.vibrant[3]
	computerB.trailColor = colorScheme.vibrant[4]
	computerB.color = colorScheme.vibrant[5]
    computerC.trailColor = colorScheme.vibrant[6]
	computerC.color = colorScheme.vibrant[7]
    player.wallColor = colorScheme.vibrant[8]
    status.floorColor = colorScheme.vibrant[9]
}
$("#changeColors").click(function() {
	if (player.status !== 1 || status.remaining === 0) {
        var click = document.getElementById("click");
        click.play()
		if (status.colorsRetro === 0) {
			status.colorsRetro = 1
			$("#buttonText").text("VIBRANT")
			computer.trailColor = "#FFFF00"
			computer.color = "#FFFF88"
			player.trailColor = "#0000FF"
			player.color = "#8888FF"
			computerB.trailColor = "#FF0000"
			computerB.color = "#FF8888"
			computerC.trailColor = "#00FF00"
			computerC.color = "#88FF88"
            player.wallColor = "#0000a0"
            status.floorColor = "rgb(0, 0, 17)"
		} else if (status.colorsRetro === 1) {
			status.colorsRetro = 2
			$("#buttonText").text("CLASSIC")
			computer.trailColor = "#FDDA47"
			computer.color = "#BB8924"
			player.trailColor = "#2A80DE"
			player.color = "#2138A7"
			computerB.trailColor = "#FDDA47"
			computerB.color = "#BB8924"
			computerC.trailColor = "#FDDA47"
			computerC.color = "#BB8924"
            player.wallColor = "#6A908D"
            status.floorColor = "rgb(1, 4, 33)"
		} else if (status.colorsRetro === 2) {
			status.colorsRetro = 3
			$("#buttonText").text("REVISED")
			computer.trailColor = "#FE9C00"
			computer.color = "#FFE988"
			player.trailColor = "#53A0FF"
			player.color = "#CAC8FF"
			computerB.trailColor = "#FE9C00"
			computerB.color = "#FFE988"
			computerC.trailColor = "#FE9C00"
			computerC.color = "#FFE988"
            player.wallColor = "#494949"
            status.floorColor = "rgb(0, 0, 0)"
        }
        else if (status.colorsRetro === 3) {
			status.colorsRetro = 0
			$("#buttonText").text("SILVERY")
			computer.trailColor = "#888888"
			computer.color = "#555555"
			player.trailColor = "#FFFFFF"
			player.color = "#808080"
			computerB.trailColor = "#888888"
			computerB.color = "#555555"
			computerC.trailColor = "#888888"
			computerC.color = "#555555"
            player.wallColor = "404040"
            status.floorColor = "rgb(10, 10, 10)"
		}
	}
});
$("#obstacleButton").click(function() {
	if (player.status !== 1 || status.remaining === 0) {
        var click = document.getElementById("click");
        click.play();
		status.obstacles += 1
		status.obstacles = status.obstacles % 3
		if (status.obstacles === 0) {
			$("#obstacleSpan").text("NONE")
		} else if (status.obstacles === 1) {
			$("#obstacleSpan").text("RING")
		} else if (status.obstacles === 2) {
			$("#obstacleSpan").text("WALL")
		}
	}
})