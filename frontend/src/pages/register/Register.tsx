import React, { useState }  from 'react';
import { Link } from 'react-router-dom'
import Card from '../../components/card'
import Typography from '../../components/typography';
import Form from '../../components/form'
import TextField from '../../components/textField'

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [details, setDetails] = useState({
    Username: '',
    ['Area code']: '',
    Password: '',
    ['Password confirmation']: ''
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
      <Form title='Register' buttonName='Submit' buttonColor='primary' handleSubmit={() => handleSubmit()}>
        <TextField elName='Username' color='primary' onChange={handleChange} />
        <TextField elName='Area code' color='primary' onChange={handleChange} />
        <TextField elName='Password' type='password' color='primary' onChange={handleChange} />
        <TextField elName='Password confirmation' type='password' color='primary' onChange={handleChange} />
      </Form>
      <br/>
      <br/>
      <Typography color='primary' variant='internalLink' to='/login'>Login</Typography>
    </Card>
  )
}

export default Register