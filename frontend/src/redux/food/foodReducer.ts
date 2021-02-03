const initialState = {
  foods: []
};

export const foodReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_FOODS': return {
      ...state,
      foods: action.payload
    }
    default:
      return state;
  }
};
