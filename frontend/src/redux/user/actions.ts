import { FoodObject } from "../food/actions";

export type AddUser = {type: 'ADD_USER'; payload: UserObject};
export type RemoveUser = {type: 'REMOVE_USER'; payload: Object};
export interface UserObject {
  id: number;
  username: string;
  areacode: string;
  likes: any[];
  dislikes: any[];
}

export const addUser = (user: UserObject): AddUser => ({
  type: 'ADD_USER',
  payload: user,
});

export const removeUser = (user: Object): RemoveUser => ({
  type: 'REMOVE_USER',
  payload: user,
})