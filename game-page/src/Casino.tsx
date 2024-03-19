import React from "react";
import amethystImage from "./images/amethyst.png"; // Import the image
import diamondImage from "./images/diamond.png"; // Import other images...
import opalImage from "./images/opal.png";
import rubyImage from "./images/ruby.png";
import sapphireImage from "./images/sapphire.png";
import topazImage from "./images/topaz.png";
import citrineImage from "./images/citrine.png";
import heartImage from "./images/heart.png";
import blankImage from "./images/blank.png";
import "./Casino.css";

class Casino extends React.Component {
  rows: number = 9;
  columns: number = 9;
  score: number = 0;
  gems: HTMLImageElement[] = [];

  imageUrls: string[] = [
    amethystImage,
    diamondImage,
    opalImage,
    rubyImage,
    sapphireImage,
    topazImage,
    citrineImage,
    heartImage,
  ];
  componentDidMount() {
    this.initializeGame();
  }

  initializeGame() {
    const gameBoard = document.getElementById("game-board");
    if (!gameBoard) return;

    this.createGameBoard(gameBoard, this.imageUrls);
    this.addEventListeners();
  }

  createGameBoard(gameBoard: HTMLElement, imageUrls: string[]) {
    let gemCount = 0; // Counter variable to count the number of gems produced

    for (let row: number = 1; row <= 9; row++) {
      for (let column: number = 1; column <= 9; column++) {
        // Check if the gem count has reached 81
        if (gemCount >= 81) {
          return; // Exit the function
        }

        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        const randomGem: string = imageUrls[randomIndex];
        const image: HTMLImageElement = document.createElement("img");
        image.draggable = true;
        image.id = `${row}-${column}`;
        image.src = randomGem;
        image.classList.add("tile");
        image.style.gridRow = row.toString();
        image.style.gridColumn = column.toString();
        gameBoard.appendChild(image);
        this.gems.push(image);

        gemCount++; // Increment the gem count
      }
    }
  }

  addEventListeners() {
    this.gems.forEach((gem) => {
      gem.addEventListener("dragstart", this.dragStart);
      gem.addEventListener("dragover", this.dragOver);
      gem.addEventListener("drop", this.drop);
    });
  }

  dragStart(event: DragEvent) {
    const draggedGem = event.target as HTMLImageElement;
    event.dataTransfer?.setData("text/plain", draggedGem.id);
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
  }

  drop = (event: DragEvent) => {
    event.preventDefault();

    const draggedGemId = event.dataTransfer?.getData("text/plain");
    const draggedGem = document.getElementById(
      draggedGemId!
    ) as HTMLImageElement;
    const otherGem = event.target as HTMLImageElement;

    // Ensure both draggedGem and otherGem are valid HTMLImageElement instances
    if (
      draggedGem &&
      otherGem &&
      draggedGem instanceof HTMLImageElement &&
      otherGem instanceof HTMLImageElement
    ) {
      // Get the row and column of the draggedGem
      const [draggedRow, draggedColumn] = draggedGemId!.split("-").map(Number);
      // Get the row and column of the otherGem
      const [otherRow, otherColumn] = otherGem.id.split("-").map(Number);

      // Check if the gems are adjacent by comparing their row and column indices
      const isAdjacent =
        (Math.abs(draggedRow - otherRow) === 1 &&
          draggedColumn === otherColumn) || // Same column, adjacent row
        (Math.abs(draggedColumn - otherColumn) === 1 &&
          draggedRow === otherRow); // Same row, adjacent column

      if (isAdjacent) {
        // Swap the gems
        const srcReplaced = draggedGem.src;
        draggedGem.src = otherGem.src;
        otherGem.src = srcReplaced;

        this.crushGems();
      } else {
      }
    }
  };

  crushGems = () => {
    // Initialize an array to store gems organized by rows and columns
    const gemsByRow: HTMLImageElement[][] = [];
    const gemsByColumn: HTMLImageElement[][] = [];

    // Populate the gemsByRow and gemsByColumn arrays
    for (let i = 0; i < 9; i++) {
      gemsByRow.push([]);
      gemsByColumn.push([]);
    }

    // Iterate over the gems array and organize gems by rows and columns
    for (const gem of this.gems) {
      const [row, column] = gem.id.split("-").map(Number);
      gemsByRow[row - 1].push(gem);
      gemsByColumn[column - 1].push(gem);
    }

    // Check for matches in rows
    for (const row of gemsByRow) {
      for (let i = 0; i < row.length - 2; i++) {
        if (row[i].src === row[i + 1].src && row[i].src === row[i + 2].src) {
          // Found a match in the row, handle the logic here (e.g., turn gems into blank)
          row[i].src = blankImage;
          row[i + 1].src = blankImage;
          row[i + 2].src = blankImage;
          // Increment score or perform other actions
          this.score += 50;
          document.getElementById("score")!.textContent = (
            this.score + 50
          ).toString();
          console.log(this.score);
        }
      }
    }

    // Check for matches in columns
    for (const column of gemsByColumn) {
      for (let i = 0; i < column.length - 2; i++) {
        if (
          column[i].src === column[i + 1].src &&
          column[i].src === column[i + 2].src
        ) {
          // Found a match in the column, handle the logic here
          column[i].src = blankImage;
          column[i + 1].src = blankImage;
          column[i + 2].src = blankImage;
          // Increment score or perform other actions
          //   this.score += 50;
          document.getElementById("score")!.textContent = (
            this.score + 50
          ).toString();
          console.log(this.score);
        }
      }
    }
    // Slide Candies Down
    // Check for matches in rows
    for (const column of gemsByColumn) {
      let l: string[] = [];
      let numBlanks: number = 0;
      for (let i = 0; i < column.length; i++) {
        if (column[i].src.includes("blank")) {
          numBlanks += 1;
        } else {
          l.push((column[i] as HTMLImageElement).src);
        }
      }
      for (let i = 0; i < column.length; i++) {
        if (numBlanks > 0) {
          column[i].src = blankImage;
          numBlanks--;
        } else {
          column[i].src = l.shift()!;
        }
      }
    }
    // Fill in the blanks with new candies
    for (const column of gemsByColumn) {
      for (let i = 0; i < column.length; i++) {
        if (column[i].src.includes("blank")) {
          const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
          const randomGem: string = this.imageUrls[randomIndex];
          column[i].src = randomGem;
        }
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Cat Casino</h1>
        <h1>
          Score: <span id="score">{this.score}</span>
        </h1>
        <div id="game-board"></div>
        <div className="center">
          <a href="../Mainpage/Mainpage.html" className="back-button">
            Back to Main Page
          </a>
        </div>
      </div>
    );
  }
}

export default Casino;
