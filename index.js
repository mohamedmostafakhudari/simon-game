// Available Colours
const colours = ["green", "red", "yellow", "blue"];

// Check if the game is started
let startGame = false;
// Track current level
let currentLevel = 1;
// Store The User Click Order
let userClicks = [];
// Store The Computer Click Order
let computerClicks = [];

// Handle Start Logic
$(document).on("keydown", function () {
	if (startGame) return;
	$("#level-title").text(`Level ${currentLevel}`);
	startGame = true;
	botPlay();
});
// Handling Click Event Logic
$(".btn").on("click", function () {
	if (!startGame) return;
	const $this = $(this);
	userClicks.push($this[0].id);
	animatePress($this, "user");
	playSound($this[0].id);
	// Check for the streak on every click
	// But only go to next level when the both
	// user and computer clicks are equal
	if (checkWin(userClicks.length - 1)) {
		if (userClicks.length === computerClicks.length) {
			goToNextLevel();
		}
	} else {
		handleLose();
	}
});

// Bot play logic
function botPlay() {
	const randomColour = colours[randomIndex()];
	const randomButton = $("#" + randomColour);
	computerClicks.push(randomButton.attr("id"));
	animatePress(randomButton, "bot");
	playSound(randomButton.attr("id"));
}

// Move on to next level
function goToNextLevel() {
	setTimeout(() => {
		updateLevel();
		botPlay();
	}, 1000);
}
// Check for win
function checkWin(currentLevel) {
	// for (let i = 0; i < userClicks.length; i++) {
	// 	const userClickValAtPos = userClicks[i];
	// 	const computerClickValAtPos = computerClicks[i];
	// 	if (userClickValAtPos !== computerClickValAtPos) return false;
	// }

	/* Smarter way */
	if (userClicks[currentLevel] === computerClicks[currentLevel]) {
		return true;
	}
	return false;
}
// Handle update Level
function updateLevel() {
	resetUserClicks();
	currentLevel++;
	updateTitleDisplay(`Level ${currentLevel}`);
}

function handleLose() {
	loseAnimation();
	playSound("wrong");
	resetGame();
}
function resetGame() {
	resetComputerClicks();
	resetUserClicks();
	resetLevels();
	updateTitleDisplay("Game Over, Press Any Key To Restart");
	turnOffTheGame();
}
function loseAnimation() {
	$("body").addClass("game-over");
	setTimeout(() => {
		$("body").removeClass("game-over");
	}, 200);
}
function updateTitleDisplay(string) {
	$("#level-title").text(string);
}
function turnOffTheGame() {
	startGame = false;
}
function resetLevels() {
	currentLevel = 1;
}
function resetUserClicks() {
	userClicks = [];
}
function resetComputerClicks() {
	computerClicks = [];
}
function animatePress(target, clicker) {
	if (clicker === "user") {
		target.addClass("pressed");
		setTimeout(function () {
			target.removeClass("pressed");
		}, 100);
	} else if (clicker === "bot") {
		target.fadeOut(100).fadeIn(100);
	}
}
function randomIndex() {
	return Math.floor(Math.random() * 4);
}
function playSound(name) {
	const audio = new Audio("./sounds/" + name + ".mp3");
	audio.play();
}

/*{  This is an idea for another game  }*/

// for (let i = 0; i < 10; i++) {
// 	botPlay(i);
// }
// function botPlay(delay) {
// 	setTimeout(() => {
// 		const target = $(".btn")[randomIndex()];
// 		animatePress(target, "bot");
// 	}, delay * 500);
// }
