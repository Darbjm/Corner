import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/card';
import { useDispatch, useSelector } from 'react-redux';
import { addFood, addRandomFood } from '../../redux';
import TextField from '../../components/textField'
import Typography from '../../components/typography';
import { Div, Main } from '../../styles/BasicComponents.style'
import { FoodObject } from '../../redux/food/actions' 

const Home = () => {
  const dispatch = useDispatch();
  const foods: FoodObject[] | any = useSelector<{foods: FoodObject[]}>(state => state.foods);
  const [searchError, setErrorMessage] = useState({});
  const [search, setSearch] = useState('')


  useEffect(() => {
    const getData = async () => {
      await axios.get('api/foods/all')
      .then(response => {
        dispatch(addFood(response.data));
        dispatch(addRandomFood(response.data))
      })
      .catch(error => {
        console.error(error);
      });
    }
    getData();
  }, []);

  const handleChange = (elName: string, value: string | undefined) => {
    if (value) {setSearch(value)}
  };

  const margin = '20px'


  return foods ? (
    <Main>
      <Div vertical={false} width='100%' height='100%'>
        <Div vertical={true} width='100%' height='400px'>
          <TextField elName='search' size='large' onChange={handleChange} color='primary' placeholder='🔎 search' error={searchError}/>
        </Div>
        {foods.map((food: FoodObject) => (
          <Card key={food.name} cardWidth='200px' cardHeight='300px' marginBottom={margin} marginLeft={margin} marginRight={margin} marginTop={margin}>
            <img src={'//' + food.image} style={{maxWidth: '150px', maxHeight: '170px'}} />
            <Typography variant="h4">{food.name}</Typography>
            <Typography variant="bodySmall">{food.price}</Typography>
          </Card>))}
      </Div>
    </Main>
  ) : (
  <Main>
    <Typography variant='h1'>Loading...</Typography>
  </Main>
  )
};

export default Home;