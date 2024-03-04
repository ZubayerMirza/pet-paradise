const rows: number = 9;
const columns: number = 9;
let score: number = 0;

let imageList: string[] = [];

// Get the game board element
const gameBoard: HTMLElement | null = document.getElementById("game-board");

// Define the image URLs
const imageUrls: string[] = [
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
function getRandomGem(): string {
  return imageUrls[Math.floor(Math.random() * imageUrls.length)];
}

// Loop through each tile on the game board
for (let row: number = 1; row <= rows; row++) {
  for (let column: number = 1; column <= columns; column++) {
    // Calculate a random gem to put in index
    const randomGem: string = getRandomGem();
    // Create an image element
    const image: HTMLImageElement = document.createElement("img");
    image.draggable = true;
    image.id = `${row}-${column}`;
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
const gems: NodeListOf<HTMLImageElement> = document.querySelectorAll(".tile");
gems.forEach((gem) => {
  gem.addEventListener("dragstart", dragStart as EventListener);
  gem.addEventListener("dragover", dragOver as EventListener);
  gem.addEventListener("drop", drop as EventListener);
});

let draggedGem: HTMLImageElement;
let otherGem: HTMLImageElement;

function dragStart(event: DragEvent): void {
  // Store a reference to the dragged gem
  draggedGem = event.target as HTMLImageElement;
}

function dragOver(event: DragEvent): void {
  // Prevent default to allow drop
  event.preventDefault();
}

function drop(event: DragEvent): void {
  // Get the drop target (gem where the dragged gem is dropped)
  otherGem = event.target as HTMLImageElement;
  const draggedGemRowCol: string[] = draggedGem.id.split("-");
  const draggedGemRow: number = parseInt(draggedGemRowCol[0]);
  const draggedGemCol: number = parseInt(draggedGemRowCol[1]);
  const otherGemRowCol: string[] = otherGem.id.split("-");
  const otherGemRow: number = parseInt(otherGemRowCol[0]);
  const otherGemCol: number = parseInt(otherGemRowCol[1]);
  // Check if is adjacent if rows are off by 1 or columns are off by 1
  const isAdjacent: boolean =
    (Math.abs(draggedGemRow - otherGemRow) === 1 &&
      draggedGemCol === otherGemCol) ||
    (Math.abs(draggedGemCol - otherGemCol) === 1 &&
      draggedGemRow === otherGemRow);
  // If is adjacent move switch the gems
  if (isAdjacent) {
    // Store the src attribute draggedGem
    const srcReplaced: string = draggedGem!.src;
    // Replace the src attribute of the draggedGem with the src attribute of the otherGem
    if (
      draggedGem instanceof HTMLImageElement &&
      otherGem instanceof HTMLImageElement
    ) {
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
function crushGems(): void {
  for (let i: number = 0; i < gems.length - 2; i++) {
    // Check if gems[i], gems[i+1], and gems[i+2] are in the same row
    if (
      i % 9 <= 6 &&
      gems[i] instanceof HTMLImageElement &&
      gems[i].src !== "./images/blank.png" &&
      gems[i].src === (gems[i + 1] as HTMLImageElement).src &&
      gems[i].src === (gems[i + 2] as HTMLImageElement).src
    ) {
      (gems[i] as HTMLImageElement).src = "./images/blank.png";
      (gems[i + 1] as HTMLImageElement).src = "./images/blank.png";
      (gems[i + 2] as HTMLImageElement).src = "./images/blank.png";
      score += 50;
    }

    // Check if gems[i], gems[i+9], and gems[i+18] are in the same column
    if (
      i < 63 &&
      gems[i] instanceof HTMLImageElement &&
      gems[i].src !== "./images/blank.png" &&
      gems[i].src === (gems[i + 9] as HTMLImageElement).src &&
      gems[i].src === (gems[i + 18] as HTMLImageElement).src
    ) {
      (gems[i] as HTMLImageElement).src = "./images/blank.png";
      (gems[i + 9] as HTMLImageElement).src = "./images/blank.png";
      (gems[i + 18] as HTMLImageElement).src = "./images/blank.png";
      score += 50;
    }
  }
  document.getElementById("score")!.textContent = score.toString();
}

function cascadeGem(): void {
  // Cascade the gems down and leave the blanks at the top
  // Keep track of all images in a list l, as well as number of blank images
  let l: string[] = [];
  let numBlanks: number = 0;
  // loop through the array by column and store information about the image
  for (let i: number = 0; i <= 8; i++) {
    for (let j: number = i; j <= 80; j += 9) {
      const src = (gems[j] as HTMLImageElement).src;
      if (src.slice(-"blank.png".length) === "blank.png") {
        numBlanks += 1;
      } else if (gems[j] instanceof HTMLImageElement) {
        l.push((gems[j] as HTMLImageElement).src);
      }
    }
    // loop once more to keep the blanks on top and the gems to the bottom
    for (let j: number = i; j <= 80; j += 9) {
      if (numBlanks > 0) {
        (gems[j] as HTMLImageElement).src = "./images/blank.png";
        numBlanks--;
      } else {
        (gems[j] as HTMLImageElement).src = l.shift()!;
      }
    }
  }
}

// wherever there is a blank image, fill in with a random gem
function fillInGems(): void {
  for (let i: number = 0; i < 81; i++) {
    const src = (gems[i] as HTMLImageElement).src;
    if (src.slice(-"blank.png".length) === "blank.png") {
      (gems[i] as HTMLImageElement).src = getRandomGem();
    }
  }
}
