import React, { useState, FormEvent } from 'react';
import Form from '../../components/form'
import Card from '../../components/card'
import TextField from '../../components/textField'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [details, setDetails] = useState({
    Username: '',
    Password: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(details);
  };

  const handleChange = (name: string, value: string | undefined) => {
    setDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Card>
      <Form title='Login' buttonName='Login' buttonColor='primary' handleSubmit={() => console.log('working')}>
        <TextField elName='Username' color='primary' onChange={() => console.log('working')} />
        <TextField elName='Password' color='primary' onChange={() => console.log('working')} />
      </Form>
    </Card>
  );
};

export default Login;
