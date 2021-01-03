import Form from './Form';
import React from 'react';
import TextField from '../textField'

export default {
  title: 'Form',
  component: Form,
};

export const FormS = () => {
  return (
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Form title='Register' buttonName='Register' buttonColor='primary'>
        <TextField elName='Username' onChange={() => console.log('working')}/>
      </Form>
    </div>
  );
};

FormS.story = {
  name: 'form',
};