import SimpleCard from './Card';
import React from 'react';
import Typography from '../typography'

export default {
  title: 'Card',
  component: SimpleCard,
};

export const Simple = () => {
  return (
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <SimpleCard cardWidth='100px' cardHeight='100px'><Typography variant='bodyMedium'>Card</Typography></SimpleCard>
    </div>
  );
};

Simple.story = {
  name: 'Simple Card',
};