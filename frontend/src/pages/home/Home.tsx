import React, { useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/card';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../redux/user/userReducer';
import { addUser } from '../../redux';
import Typography from '../../components/typography';
const Home = () => {
  const dispatch = useDispatch();
  const profile = useSelector<UserState, any>(state => state.user);

  useEffect(() => {
    // const searchTerm = 'chips'
    // const getData = async () => {
    //   await axios.get()
    //   .then(response => {
    //     console.log(response.data);
    //   }).catch(error => {
    //     console.error(error);
    //   });
    // }
    // getData();
  }, []);

  return (
    <Card cardWidth='25%' cardHeight='25%'>
      <Typography variant="h2">Hello</Typography>
    </Card>
  )
};

export default Home;