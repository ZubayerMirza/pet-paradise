var rows = 9;
var columns = 9;
var score = 0;
var imageList = [];
// Get the game board element
var gameBoard = document.getElementById("game-board");
// Define the image URLs
var imageUrls = [
    "./images/amethyst.png",
    "./images/diamond.png",
    "./images/opal.png",
    "./images/ruby.png",
    "./images/sapphire.png",
    "./images/topaz.png",
    "./images/citrine.png",
    "./images/heart.png",
];
// Create random gem
function getRandomGem() {
    return imageUrls[Math.floor(Math.random() * imageUrls.length)];
}
// Loop through each tile on the game board
for (var row = 1; row <= rows; row++) {
    for (var column = 1; column <= columns; column++) {
        // Calculate a random gem to put in index
        var randomGem = getRandomGem();
        // Create an image element
        var image = document.createElement("img");
        image.draggable = true;
        image.id = "".concat(row, "-").concat(column);
        image.src = randomGem;
        image.classList.add("tile"); // Add the 'tile' class for css styling
        // Set grid row and column for the image
        image.style.gridRow = row.toString();
        image.style.gridColumn = column.toString();
        // Append the image to the game board
        if (gameBoard !== null) {
            gameBoard.appendChild(image);
        }
    }
}
// Add event listeners to each gem
var gems = document.querySelectorAll(".tile");
gems.forEach(function (gem) {
    gem.addEventListener("dragstart", dragStart);
    gem.addEventListener("dragover", dragOver);
    gem.addEventListener("drop", drop);
});
var draggedGem;
var otherGem;
function dragStart(event) {
    // Store a reference to the dragged gem
    draggedGem = event.target;
}
function dragOver(event) {
    // Prevent default to allow drop
    event.preventDefault();
}
function drop(event) {
    // Get the drop target (gem where the dragged gem is dropped)
    otherGem = event.target;
    var draggedGemRowCol = draggedGem.id.split("-");
    var draggedGemRow = parseInt(draggedGemRowCol[0]);
    var draggedGemCol = parseInt(draggedGemRowCol[1]);
    var otherGemRowCol = otherGem.id.split("-");
    var otherGemRow = parseInt(otherGemRowCol[0]);
    var otherGemCol = parseInt(otherGemRowCol[1]);
    // Check if is adjacent if rows are off by 1 or columns are off by 1
    var isAdjacent = (Math.abs(draggedGemRow - otherGemRow) === 1 &&
        draggedGemCol === otherGemCol) ||
        (Math.abs(draggedGemCol - otherGemCol) === 1 &&
            draggedGemRow === otherGemRow);
    // If is adjacent move switch the gems
    if (isAdjacent) {
        // Store the src attribute draggedGem
        var srcReplaced = draggedGem.src;
        // Replace the src attribute of the draggedGem with the src attribute of the otherGem
        if (draggedGem instanceof HTMLImageElement &&
            otherGem instanceof HTMLImageElement) {
            draggedGem.src = otherGem.src;
            // Replace the src attribute of the otherGem with the stored src attribute of the draggedGem
            otherGem.src = srcReplaced;
            // If there is 3 in a row or column crush the gems
            // Move the gems down
            // And fill in the blanks
            crushGems();
            cascadeGem();
            fillInGems();
        }
    }
}
// Function to crush matching gems
// Gems is a 1 dimensional list with 81 gems
// Rows are off by 9; Calculating if 3 in row or 3 in a column
function crushGems() {
    for (var i = 0; i < gems.length - 2; i++) {
        // Check if gems[i], gems[i+1], and gems[i+2] are in the same row
        if (i % 9 <= 6 &&
            gems[i] instanceof HTMLImageElement &&
            gems[i].src !== "./images/blank.png" &&
            gems[i].src === gems[i + 1].src &&
            gems[i].src === gems[i + 2].src) {
            gems[i].src = "./images/blank.png";
            gems[i + 1].src = "./images/blank.png";
            gems[i + 2].src = "./images/blank.png";
            score += 50;
        }
        // Check if gems[i], gems[i+9], and gems[i+18] are in the same column
        if (i < 63 &&
            gems[i] instanceof HTMLImageElement &&
            gems[i].src !== "./images/blank.png" &&
            gems[i].src === gems[i + 9].src &&
            gems[i].src === gems[i + 18].src) {
            gems[i].src = "./images/blank.png";
            gems[i + 9].src = "./images/blank.png";
            gems[i + 18].src = "./images/blank.png";
            score += 50;
        }
    }
    document.getElementById("score").textContent = score.toString();
}
function cascadeGem() {
    // Cascade the gems down and leave the blanks at the top
    // Keep track of all images in a list l, as well as number of blank images
    var l = [];
    var numBlanks = 0;
    // loop through the array by column and store information about the image
    for (var i = 0; i <= 8; i++) {
        for (var j = i; j <= 80; j += 9) {
            var src = gems[j].src;
            if (src.slice(-"blank.png".length) === "blank.png") {
                numBlanks += 1;
            }
            else if (gems[j] instanceof HTMLImageElement) {
                l.push(gems[j].src);
            }
        }
        // loop once more to keep the blanks on top and the gems to the bottom
        for (var j = i; j <= 80; j += 9) {
            if (numBlanks > 0) {
                gems[j].src = "./images/blank.png";
                numBlanks--;
            }
            else {
                gems[j].src = l.shift();
            }
        }
    }
}
// wherever there is a blank image, fill in with a random gem
function fillInGems() {
    for (var i = 0; i < 81; i++) {
        var src = gems[i].src;
        if (src.slice(-"blank.png".length) === "blank.png") {
            gems[i].src = getRandomGem();
        }
    }
}
