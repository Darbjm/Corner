export interface UserState {
  user: object;
}

const initialState = {
  user: {},
};

type Action = {type: 'ADD_USER'; payload: object};

export const userReducer = (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case 'ADD_USER': {
      console.log(action);
      return {...state, user: {action}};
    }
    default:
      return state;
  }
};
