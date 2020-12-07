import RegisterForm from './RegisterForm';
import React from 'react';
import Typography from '../typography'

export default {
  title: 'RegisterForm',
  component: RegisterForm,
};

export const Simple = () => {
  return (
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <RegisterForm />
    </div>
  );
};

Simple.story = {
  name: 'Simple Card',
};