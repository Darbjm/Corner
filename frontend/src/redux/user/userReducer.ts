const initialState = {
    user: []
  };
  
  export const userReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
      case 'ADD_USER': return {
        ...state,
        user: action.payload
      }
      default:
        return state;
    }
  };
  