import React from 'react';
import Card from '../../components/card';
import Typography from '../../components/typography';
import Button from '../../components/button';
import { Main, Div } from '../../styles/BasicComponents.style'
import { useSelector } from 'react-redux';

const Swipe = () => {
  const foods = useSelector<any>(state => state);


  return (
    <Main>
      {console.log(foods)}
      <Card cardWidth='40%'>
        <Typography variant="h4" color="primary">
          working
        </Typography>
        <Div width='100%' height='auto' vertical={false}>
          <Button buttonSize='medium' color='primary' isFullWidth={false}>
            NO
          </Button>
          <Button buttonSize='medium' color='secondary' isFullWidth={false}>
            YES
          </Button>
        </Div>
      </Card>
    </Main>
  );
}

export default Swipe;
