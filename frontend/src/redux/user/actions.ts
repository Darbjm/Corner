export type AddUser = {type: 'ADD_USER'; payload: UserObject};

export interface UserObject {
  id: number;
  username: string;
  areacode: string;
  likes: number[];
  dislikes: number[];
}

export const addUser = (user: UserObject): AddUser => ({
  type: 'ADD_USER',
  payload: user,
});