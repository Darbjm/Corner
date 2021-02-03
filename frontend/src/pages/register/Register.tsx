import React, { useState }  from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import axios from 'axios'
import Card from '../../components/card'
import Typography from '../../components/typography';
import Form from '../../components/form'
import TextField from '../../components/textField'
import { Main } from '../../styles/BasicComponents.style'


const Register = ({history}: RouteComponentProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState({});
  const [details, setDetails] = useState({
    username: '',
    ['area_code']: '',
    password: '',
    ['password_confirmation']: ''
  });

  const handleSubmit = async () => {
    axios.post('/api/consumers/register', details)
    .then(res => {
      history.push('/login')
      console.log(res)
    })
    .catch(err => setErrorMessage(err.response.data))
  };

  const handleChange = (name: string, value: string | undefined): void => {
    setDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Main>
      <Card cardWidth='40%'>
        <Form title='Register' buttonName='Submit' buttonColor='primary' handleSubmit={() => handleSubmit()}>
          <TextField error={errorMessage} placeholder='Username' elName='username' color='primary' onChange={handleChange} />
          <TextField error={errorMessage} placeholder='Area code' elName='area_code'color='primary' onChange={handleChange} />
          <TextField error={errorMessage} placeholder='Password' elName='password'type='password' color='primary' onChange={handleChange} />
          <TextField error={errorMessage} placeholder='Password confirmation' elName='password_confirmation' type='password' color='primary' onChange={handleChange} />
        </Form>
        <br/>
        <br/>
        <Typography variant='internalLink' to='/login'>Login</Typography>
      </Card>
    </Main>
  )
}

export default withRouter(Register)