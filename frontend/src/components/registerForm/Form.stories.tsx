import Form from './Form';
import React from 'react';
import TextField from '../textField'

export default {
  title: 'Form',
  component: Form,
};

export const FormS = () => {
  return (
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
      <Form title='Register' buttonName='Register' buttonColor='primary' handleSubmit={() => console.log('working')}>
        <TextField elName='Username' color='primary' onChange={() => console.log('working')}/>
        <TextField elName='Area code' color='primary' onChange={() => console.log('working')}/>
        <TextField elName='Password' color='primary' onChange={() => console.log('working')}/>
        <TextField elName='Password confirmation' color='primary' onChange={() => console.log('working')}/>
      </Form>
    </div>
  );
};

FormS.story = {
  name: 'form',
};