// Store the experience and the level
let exp = 0;
let level = 1;

export const increaseExp = () => {
  exp++;
  console.log("Experience increased:", exp);
  levelUp(); // Check if level needs to be updated after increasing experience
};

const levelUp = () => {
  const expRequired = (level * (level + 1)) / 2; // Calculate the experience required for the next level
  if (exp >= expRequired) {
    level++;
    console.log("Level up! New level:", level);
  }
};

export const getLevel = () => level;
