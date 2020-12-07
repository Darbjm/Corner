import React, { useEffect } from 'react';
import axios from 'axios';
import SimpleCard from '../../components/card';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../redux/user/userReducer';
import { addUser } from '../../redux';
import Typography from '../../components/typography';
import { headers } from '../../lib/headers'

const Home = () => {
  const dispatch = useDispatch();
  const profile = useSelector<UserState, any>(state => state.user);

  useEffect(() => {
    const getData = async () => {
      try {
        // use https://spoonacular.com/ for foods
        console.log('here')
        // @ts-ignore
        const res = await axios.get('/api/consumers/register', headers.common);
        console.log(res)
        // const user = res.data[0];
        // dispatch(addUser(user));
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return profile.name ? (
    <SimpleCard>
      <Typography variant="h2">{profile.name}</Typography>
    </SimpleCard>
  ) : null
};

export default Home;

interface HomeProps {}

interface StateProps {
  user: object;
}
