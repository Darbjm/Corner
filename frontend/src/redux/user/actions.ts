export type Action = {type: 'ADD_USER'; payload: UserObject};

interface UserObject {
  id: number;
  name: string;
  username: string;
  address?: object;
}

export const addUser = (user: UserObject): Action => ({
  type: 'ADD_USER',
  payload: user,
});
