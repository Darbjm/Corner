import React, {useEffect} from 'react';
import axios from 'axios';
import SimpleCard from '../components/card';
import {useDispatch, useSelector} from 'react-redux';
import {UserState} from '../redux/userReducer';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        const user = res.data[0];
        console.log(user);
        dispatch({type: 'ADD_USER', payload: user});
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const profile = useSelector<UserState>(state => state.user);

  return (
    <SimpleCard>
      <div>{profile}</div>
    </SimpleCard>
  );
}

export default Home;

interface HomeProps {}

interface StateProps {
  user: object;
}
