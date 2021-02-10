type AddFood = {type: 'ADD_FOODS'; payload: FoodObject[]};
type AddRandomFood = {type: 'ADD_RANDOM_FOODS'; payload: FoodObject[]};
type RemoveRandomFood = {type: 'REMOVE_RANDOM_FOODS'; payload: FoodObject[]};
export interface FoodObject {
  id: number;
  name: string;
  price: string;
  likes: number[];
  dislikes: number[];
  creator: null;
  description: null | string;
  image: string;
}

export const addFood = (food: FoodObject[]): AddFood => ({
  type: 'ADD_FOODS',
  payload: food,
});

export const addRandomFood = (food: FoodObject[]): AddRandomFood => {
  const newFood = [...food]
  function shuffleArray(array: FoodObject[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  return {
  type: 'ADD_RANDOM_FOODS',
  payload: shuffleArray(newFood),
  }
};

export const removeRandomFood = (food: FoodObject[]): RemoveRandomFood => {
  const newFood = [...food]
  newFood.shift()
  return {
  type: 'REMOVE_RANDOM_FOODS',
  payload: newFood,
  }
};
