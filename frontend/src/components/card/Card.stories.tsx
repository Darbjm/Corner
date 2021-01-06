import Card from './Card';
import React from 'react';
import Typography from '../typography'

export default {
  title: 'Card',
  component: Card,
};

export const SimpleCard = () => {
  return (
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Card cardWidth='100px' cardHeight='100px'><Typography variant='bodyMedium'>Card</Typography></Card>
    </div>
  );
};

SimpleCard.story = {
  name: ' Card',
};