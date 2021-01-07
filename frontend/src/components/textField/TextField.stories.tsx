import TextField from './TextField';
import React from 'react';


export default {
  title: 'TextField',
  component: TextField,
};

export const Field = () => {
  return (
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
      <TextField error={{}} elName="Test" placeholder='Test' onChange={() => console.log('working')} color='primary'/>
    </div>
  );
};

Field.story = {
  name: 'Text field',
};