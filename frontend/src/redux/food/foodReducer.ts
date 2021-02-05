const initialState = {
  foods: [],
  randomFoods: []
};

export const foodReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_FOODS': return {
      ...state,
      foods: action.payload
    }
    case 'ADD_RANDOM_FOODS': return {
      ...state,
      randomFoods: action.payload
    }
    case 'REMOVE_RANDOM_FOODS': return {
      ...state,
      randomFoods: action.payload
    }
    default:
      return state;
  }
};
