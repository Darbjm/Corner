import RegisterForm from './RegisterForm';
import React from 'react';
import Typography from '../typography'

export default {
  title: 'RegisterForm',
  component: RegisterForm,
};

export const Form = () => {
  return (
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <RegisterForm />
    </div>
  );
};

Form.story = {
  name: 'Register form',
};