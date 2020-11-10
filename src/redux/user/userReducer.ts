import { Action } from './actions';

export interface UserState {
  [key: string]: any;
}

const initialState = {
  user: {
    id: null,
    name: '',
    username: '',
    address: {},
  },
};

export const userReducer = (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case 'ADD_USER': return {
      ...state,
      user: action.payload
    }
    default:
      return state;
  }
};
