import React from 'react'
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import Button from '../button'
import TextField from '../textField'
import Typography from '../typography';

interface FormValues {
  username: string;
  areacode: string;
  password: string;
  password_confirmation: string;
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <Typography variant='h1'>Register</Typography>
      <TextField elName='test' onChange={() => console.log('working')}  type="username" name="username" placeholder="username" />
      {touched.username && errors.username && <Typography variant='caption' color='primary'>{errors.username}</Typography>}

      <TextField elName='test' onChange={() => console.log('working')}  type="areacode" name="areacode" placeholder="areacode"/>
      {touched.areacode && errors.areacode && <Typography variant='caption' color='primary'>{errors.areacode}</Typography>}

      <TextField elName='test' onChange={() => console.log('working')}  type="password" name="password" placeholder="password"/>
      {touched.password && errors.password && <Typography variant='caption' color='primary'>{errors.password}</Typography>}

      <TextField elName='test' onChange={() => console.log('working')}  type="password_confirmation" name="password_confirmation" placeholder="password confirmation"/>
      {touched.password_confirmation && errors.password_confirmation && <Typography variant='caption' color='primary'>{errors.password_confirmation}</Typography>}

      <Button buttonSize='small' color='primary' isFullWidth={false} disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};

interface MyFormProps {
  initialEmail?: string;
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: props => {
    return {
      username: '',
      areacode: '',
      password: '',
      password_confirmation: '',
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.areacode) {
      errors.areacode = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.password_confirmation) {
      errors.password_confirmation = 'Required';
    }
    return errors;
  },

  handleSubmit: values => {
    // do submitting things
  },
})(InnerForm);

export default MyForm