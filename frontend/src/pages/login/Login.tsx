import React, { useState } from 'react';
import Form from '../../components/form'
import Card from '../../components/card'
import TextField from '../../components/textField'
import Typography from '../../components/typography'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [details, setDetails] = useState({
    Username: '',
    Password: '',
  });

  const handleSubmit = () => {
    console.log(details);
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
        <TextField elName='Username' color='primary' onChange={handleChange} />
        <TextField elName='Password' type='password' color='primary' onChange={handleChange} />
      </Form>
      <br/>
      <br/>
      <Typography color='primary' variant='internalLink' to='/register'>Register</Typography>
    </Card>
  );
};

export default Login;
