import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/card';
import { useDispatch } from 'react-redux';
import { addFood } from '../../redux';
import TextField from '../../components/textField'
import Typography from '../../components/typography';
import { Div } from '../../styles/BasicComponents.style'
import { Main } from '../../styles/BasicComponents.style'

interface FoodObject {
  id: number;
  name: string;
  price: string;
  likes: null | number;
  creator: null;
  description: null | string;
  image: string;
}

const Home = () => {
  const dispatch = useDispatch();
  // const foods = useSelector<FoodState, any>(state => state.food);
  const [searchError, setErrorMessage] = useState({});
  const [foods, setFoods] =  useState<any[]>([])
  const [search, setSearch] = useState('')


  useEffect(() => {
    const getData = async () => {
      await axios.get('api/foods/all')
      .then(response => {
        setFoods(response.data)
        dispatch(addFood(response.data));
      }).catch(error => {
        console.error(error);
      });
    }
    getData();
  }, []);

  const handleChange = (elName: string, value: string | undefined) => {
    if (value) {setSearch(value)}
  };

  const margin = '20px'


  return (
    <Main>
      <Div vertical={false} width='100%' height='100%'>
        <Div vertical={true} width='100%' height='400px'>
          <TextField elName='search' size='large' onChange={handleChange} color='primary' placeholder='🔎 search' error={searchError}/>
        </Div>
        {foods && foods.map((food: FoodObject) => (
          <Card key={food.name} cardWidth='200px' cardHeight='300px' marginBottom={margin} marginLeft={margin} marginRight={margin} marginTop={margin}>
            <img src={'//' + food.image} style={{maxWidth: '150px', maxHeight: '170px'}} />
            <Typography variant="h4">{food.name}</Typography>
            <Typography variant="bodySmall">{food.price}</Typography>
          </Card>))}
      </Div>
    </Main>
  )
};

export default Home;