import { combineReducers } from 'redux'
import { foodReducer } from './food/foodReducer';
import { userReducer } from './user/userReducer'

export { addFood, addRandomFood, removeRandomFood} from './food/actions'
export { addUser } from './user/actions'

export default combineReducers({
    foodReducer,
    userReducer
  })