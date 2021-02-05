import React, { useState, useEffect } from 'react';
import Card from '../../components/card';
import Typography from '../../components/typography';
import Button from '../../components/button';
import { Main, Div } from '../../styles/BasicComponents.style'
import { useSelector, useDispatch } from 'react-redux';
import { FoodObject } from '../../redux/food/actions' 
import { removeRandomFood } from '../../redux';

const Swipe = () => {
  const dispatch = useDispatch();
  const randomFoods: FoodObject[] | any = useSelector<{randomFoods: FoodObject[]}>(state => state.randomFoods);
  const [singleFood, setFood] = useState<FoodObject>()
  const [clicks, setClicks] = useState<number>(1)

  const getFood = () => {
    dispatch(removeRandomFood(randomFoods));
  }

  const nextFood = () => {
    setClicks(oldClicks => oldClicks + 1)
    getFood()
  }

  useEffect(() => {
    setFood(randomFoods[0])
  });

  return (
    randomFoods.length > 0 ? singleFood ? 
      (<Main>
      <Card cardWidth='40%' cardHeight='350px'>
        <img src={'//' + singleFood.image} style={{maxWidth: '150px', height: '170px', objectFit: 'cover'}} />
        <Typography variant="h4" color="secondary" oneLine={true}>
          {singleFood.name}
        </Typography>
        <Typography variant="bodySmall" color="secondary">
          {singleFood.price}
        </Typography>
        <Div width='100%' height='auto' vertical={false} style={{justifyContent: 'space-evenly'}}>
          <Button buttonSize='medium' color='primary' isFullWidth={false} handleClick={nextFood}>
            NO
          </Button>
          <Button buttonSize='medium' color='secondary' isFullWidth={false} handleClick={nextFood}>
            YES
          </Button>
        </Div>
      </Card>
    </Main>)
    :
    (<Main>
      <Typography variant='h1'>...Loading</Typography>
    </Main>)
    : 
      <Main>
        <Typography variant='h1'>Out of Snacks!</Typography>
      </Main>
  )
}

export default Swipe;
