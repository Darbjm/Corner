import React from 'react';
import SimpleCard from './Card';
// import Typography from '../typography';

export default {
  title: 'Card',
  component: SimpleCard,
};

const oneCard = () => {
  return (
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <SimpleCard>Card</SimpleCard>
    </div>
  );
};

oneCard.story = {
  name: 'oneCard',
};
