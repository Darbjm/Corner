import HomeCard from './HomeCard';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

export default {
  title: 'HomeCard',
  component: HomeCard,
};

const user = {
  areacode: "se1",
  dislikes: [5],
  id: 1,
  likes: [2, 3, 4, 8],
  username: "admin",
}

const food = {
  creator: null,
  description: null,
  dislikes: [],
  id: 1,
  image: "cdn.shopify.com/s/files/1/0342/2388/2379/products/sathers-candy-corn-3-25oz-92g-800x800_750x.png?v=1588789406",
  likes: [],
  name: "Sathers Candy Corn 125g",
  price: "£1.89",
}

export const HomeCardS = () => {
  return (
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
          <Provider store={store}>
            <HomeCard food={food} user={user} />
          </Provider>
    </div>
  );
};

HomeCardS.story = {
  name: 'HomeCard',
};