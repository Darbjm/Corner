import React, { useState } from 'react';
import axios from 'axios'
import Form from '../../components/form'
import Card from '../../components/card'
import TextField from '../../components/textField'
import Typography from '../../components/typography'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [details, setDetails] = useState({
    Username: '',
    Password: '',
  });

  const handleSubmit = async () => {
    const res = await axios.post('/api/consumers/login', details)
  };

  const handleChange = (name: string, value: string | undefined) => {
    setDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Card cardWidth='100%' cardHeight='100%'>
      <Form title='Login' buttonName='Login' buttonColor='primary' handleSubmit={() => handleSubmit()}>
        <TextField error={errorMessage} placeholder='Username' elName='username' color='primary' onChange={handleChange} />
        <TextField error={errorMessage} placeholder='Password' elName='password' type='password' color='primary' onChange={handleChange} />
      </Form>
      <br/>
      <br/>
      <Typography variant='internalLink' to='/register'>Register</Typography>
    </Card>
  );
};

export default Login;
