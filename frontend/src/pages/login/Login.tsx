import React, { useState } from 'react';
import axios from 'axios'
import { withRouter, RouteComponentProps } from "react-router";
import auth from '../../lib/auth'
import Form from '../../components/form'
import Card from '../../components/card'
import TextField from '../../components/textField'
import Typography from '../../components/typography'
import { Main } from '../../styles/BasicComponents.style'

const Login = ({history}: RouteComponentProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState({});
  const [details, setDetails] = useState({
    Username: '',
    Password: '',
  });

  const handleSubmit = async () => {
    axios.post('/api/consumers/login', details)
    .then(res => {
      auth.setToken(res.data.token)
      history.push('/')
    })
    .catch(err => {
      if (err.response.data) {
        setErrorMessage({
          username: 'Invalid credentials',
          password: 'Invalid credentials'
        })
      }
    })
  };

  const handleChange = (name: string, value: string | undefined) => {
    setDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Main>
      <Card cardWidth='40%'>
        <Form title='Login' buttonName='Login' buttonColor='primary' handleSubmit={() => handleSubmit()}>
          <TextField error={errorMessage} placeholder='Username' elName='username' color='primary' onChange={handleChange} />
          <TextField error={errorMessage} placeholder='Password' elName='password' type='password' color='primary' onChange={handleChange} />
        </Form>
        <br/>
        <br/>
        <Typography variant='internalLink' to='/register'>Register</Typography>
      </Card>
    </Main>
  );
};

export default withRouter(Login);
