// Keep track of the score with increase and decrease and get functions
let score = 0;

export const increaseScore = () => {
  score += 50;
  console.log("Score increased:", score);
};

export const decreaseScore = () => {
  if (score > 0) {
    score -= 50;
    console.log("Score decreased:", score);
  }
};

export const getScore = () => score;
