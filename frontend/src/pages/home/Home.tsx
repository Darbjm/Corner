import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/card';
import { useDispatch, useSelector } from 'react-redux';
import { UserState } from '../../redux/user/userReducer';
import { addUser } from '../../redux';
import Typography from '../../components/typography';
import { Div } from '../../styles/BasicComponents.style'
const Home = () => {
  const dispatch = useDispatch();
  const profile = useSelector<UserState, any>(state => state.user);
  const [foods, setFoods] =  useState<any[]>([])


  useEffect(() => {
    const getData = async () => {
      await axios.get('api/foods/all')
      .then(response => {
        setFoods(response.data);
      }).catch(error => {
        console.error(error);
      });
    }
    getData();
  }, []);

  const margin = '20px'

  return (
    <Div vertical={false} width='100%' height='100%'>
      {foods && foods.map(food => (
        <Card cardWidth='200px' cardHeight='300px' marginBottom={margin} marginLeft={margin} marginRight={margin} marginTop={margin}>
          <img src={'//' + food.image} style={{maxWidth: '150px', maxHeight: '170px'}} />
          <Typography variant="h4">{food.name}</Typography>
          <Typography variant="bodySmall">{food.price}</Typography>
        </Card>))}
    </Div>
  )
};

export default Home;