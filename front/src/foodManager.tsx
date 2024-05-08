// Store the boughtFood in component with functions to add, remove, get, and clear
let boughtFood: string[] = [];

export const addToBoughtFood = (item: string) => {
  boughtFood.push(item);
};

export const removeFromBoughtFood = (index: number) => {
  if (index >= 0 && index < boughtFood.length) {
    boughtFood.splice(index, 1);
  }
};

export const getBoughtFood = () => boughtFood;

export const clearBoughtFood = () => {
  boughtFood = [];
};
