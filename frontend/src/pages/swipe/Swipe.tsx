import React, { useState, useEffect } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import { useSelector, useDispatch } from 'react-redux';

import Card from '../../components/card';
import Typography from '../../components/typography';
import Button from '../../components/button';
import { Div } from '../../styles/BasicComponents.style'
import Main from '../../components/mainPage'
import auth from '../../lib/auth'
import { FoodObject } from '../../redux/food/actions' 
import { removeRandomFood } from '../../redux';

const Swipe = ({history}: RouteComponentProps) => {
  const dispatch = useDispatch();
  const randomFoods: FoodObject[] | any = useSelector<{randomFoods: FoodObject[]}>(state => state.randomFoods);
  const [singleFood, setFood] = useState<FoodObject>()
  const [clicks, setClicks] = useState<number>(1)

  const getFood = () => {
    dispatch(removeRandomFood(randomFoods));
  }

  const nextFood = () => {
    if (!auth.isAuthenticated()) {
      return history.push('/login')
    }
    setClicks(oldClicks => oldClicks + 1)
    getFood()
  }

  useEffect(() => {
    setFood(randomFoods[0])
  });

  return (
    randomFoods.length > 0 ? singleFood ? 
      (<Main>

      <Card cardWidth='40%' cardHeight='350px' justifyContent='center'>
        <img src={'//' + singleFood.image} style={{maxWidth: '150px', height: '170px', objectFit: 'cover'}} />
        <Typography variant="h4" color="secondary" oneLine={true}>
          {singleFood.name}
        </Typography>
        <Typography variant="bodySmall" color="secondary">
          {singleFood.price}
        </Typography>
        <Div width='100%' height='auto' vertical={false} style={{justifyContent: 'space-evenly'}}>
          <Button buttonSize='medium' color='primary' isFullWidth={false} handleClick={nextFood}>
            Dislike
          </Button>
          <Button buttonSize='medium' color='secondary' isFullWidth={false} handleClick={nextFood}>
            Like
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

export default withRouter(Swipe);
