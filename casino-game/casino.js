const rows = 9;
const columns = 9;
let score = 0;

let imageList = []

// Get the game board element
const gameBoard = document.getElementById('game-board');


// Define the image URLs
const imageUrls = [
    './images/amethyst.png',
    './images/diamond.png',
    './images/opal.png',
    './images/ruby.png',
    './images/sapphire.png',
    './images/topaz.png',
    './images/citrine.png',
    './images/heart.png',
];

// Create random gem
function getRandomGem() {
    return imageUrls[Math.floor(Math.random()*8)]
}


// Loop through each tile on the game board
for (let row = 1; row <= rows; row++) {
    for (let column = 1; column <= columns; column++) {
        // Calculate a random index within the range of image URLs
        randomGem = getRandomGem();
        // Create an image element
        const image = document.createElement('img');
        image.draggable= true;
        image.id= `${row}-${column}`;

        image.src = randomGem;
        image.classList.add('tile'); // Add the 'tile' class for styling
        
        // Set grid row and column for the image
        image.style.gridRow = row;
        image.style.gridColumn = column;
        
        // Append the image to the game board
        gameBoard.appendChild(image);
    }
}

// Add event listeners to each gem
const gems = document.querySelectorAll('.tile');
gems.forEach(gem => {
    gem.addEventListener('dragstart', dragStart);
    gem.addEventListener('dragover', dragOver);
    gem.addEventListener('drop', drop);
});

let draggedGem = null;
let otherGem = null;

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
    const otherGem = event.target;
    const[draggedGemRowStr, draggedGemColStr] = (draggedGem.id).split('-');
    const draggedGemRow = parseInt(draggedGemRowStr);
    const draggedGemCol = parseInt(draggedGemColStr);

    const[otherGemRowStr, otherGemColStr] = (otherGem.id).split('-');
    const otherGemRow = parseInt(otherGemRowStr);
    const otherGemCol = parseInt(otherGemColStr);

    const isAdjacent = (Math.abs(draggedGemRow -  otherGemRow) === 1 && draggedGemCol === otherGemCol) ||
    (Math.abs(draggedGemCol - otherGemCol) == 1 && draggedGemRow === otherGemRow)

    if (isAdjacent){
        // Store the src attribute and ID of the draggedGem
        const srcReplaced = draggedGem.src;
        
        // Replace the src attribute of the draggedGem with the src attribute of the otherGem
        draggedGem.src = otherGem.src;

        // Replace the src attribute of the otherGem with the stored src attribute of the draggedGem
        otherGem.src = srcReplaced;

        crushGems();
        cascadeGem();
        fillInGems();
    }
}

// Function to check if three gems are in the same row
function checkRowMatch(gem1, gem2, gem3) {
    return gem1.style.gridRow === gem2.style.gridRow && gem1.style.gridRow === gem3.style.gridRow;
}

// Function to check if three gems are in the same column
function checkColumnMatch(gem1, gem2, gem3) {
    return gem1.style.gridColumn === gem2.style.gridColumn && gem1.style.gridColumn === gem3.style.gridColumn;
}


// Function to crush matching gems
function crushGems() {
    for (let i = 0; i < gems.length - 2; i++) {
        // Check if gems[i], gems[i+1], and gems[i+2] are in the same row
        if (i % 9 <= 6 &&
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
            gems[i].src !== "./images/blank.png" &&
            gems[i].src === gems[i + 9].src &&
            gems[i].src === gems[i + 18].src) {
            gems[i].src = "./images/blank.png";
            gems[i + 9].src = "./images/blank.png";
            gems[i + 18].src = "./images/blank.png";
            score += 50
        }
    }
    document.getElementById("score").textContent = score;
}

function cascadeGem() {
    console.log("cascade");
    // Bubble up tiles with blank img
    // Keep track of all images in a list l, as well as number of blank images
    let l = [];
    let numBlanks = 0;
    // loop through the array by column and store information about the image
    for (let i = 0; i <= 8; i ++) {
        for(let j = i; j <= 80; j+=9) {
            if (gems[j].src.endsWith("blank.png")) {
                numBlanks += 1;
            }
            else {
                l.push(gems[j].src);
            }
        }
        console.log("numB: ", numBlanks);
        console.log(l);
        // loop once more to keep the blanks on top and the gems to the bottom
        for(let j = i; j <= 80; j+=9) {
            if (numBlanks>0) {
                gems[j].src = "./images/blank.png";
                numBlanks --;
            }
            else {
                gems[j].src = l.shift();
            }
        }
    }
}

function fillInGems() {
    for (let i =0 ; i < 81 ; i++) {
        if (gems[i].src.endsWith("blank.png")){
            gems[i].src = getRandomGem();
        }
    }
}