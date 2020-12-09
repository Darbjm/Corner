import TextField from './TextField';
import React from 'react';

export default {
  title: 'TextField',
  component: TextField,
};

export const Field = () => {
  return (
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <TextField elName='test' onChange={() => console.log('working')} />
    </div>
  );
};

Field.story = {
  name: 'Text field',
};