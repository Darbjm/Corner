import React, {useEffect} from 'react';
import axios from 'axios';
import SimpleCard from '../components/card';
import {useDispatch, useSelector} from 'react-redux';
import {UserState} from '../redux/userReducer';
import {addUser} from '../redux/actions';
import Typography from '../components/typography';

const Home = () => {
  const dispatch = useDispatch();
  const profile = useSelector<UserState, any>(state => state.user);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        const user = res.data[0];
        dispatch(addUser(user));
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  console.log(profile);
  return (
    <SimpleCard>
      {profile.action ? <Typography variant="h2">{profile.action.payload.name}</Typography> : ''}
    </SimpleCard>
  );
};

export default Home;

interface HomeProps {}

interface StateProps {
  user: object;
}
