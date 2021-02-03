export type Action = {type: 'ADD_FOODS'; payload: FoodObject};

export interface FoodObject {
  id: number;
  name: string;
  price: string;
  likes: null | number;
  creator: null;
  description: null | string;
  image: string;
}

export const addFood = (food: FoodObject): Action => ({
  type: 'ADD_FOODS',
  payload: food,
});
