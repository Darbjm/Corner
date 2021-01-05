import React from 'react';
import Card from '../../components/card'
import Form from '../../components/form'
import TextField from '../../components/textField'

const Register = () => {

  return (
    <Card cardWidth='50%'>
      <Form title='Register' buttonName='Submit' buttonColor='primary' handleSubmit={() => console.log('working')}>
        <TextField elName='Username' color='primary' onChange={() => console.log('working')} />
        <TextField elName='Area code' color='primary' onChange={() => console.log('working')} />
        <TextField elName='Password' color='primary' onChange={() => console.log('working')} />
        <TextField elName='Password confirmation' color='primary' onChange={() => console.log('working')} />
      </Form>
    </Card>
  )
}

export default Register