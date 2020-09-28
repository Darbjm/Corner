import React, {useState} from 'react';
import SimpleCard from '../components/card';
import Typography from '../components/typography';
import StandardTextField from '../components/textField';
import SimpleButton from '../components/button';

function Login() {
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
    <SimpleCard>
      <Typography variant="h1" color="primary">
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <div className="control">
            <StandardTextField
              error={!!errorMessage}
              help={errorMessage}
              onChange={handleChange}
              elName="Username"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <StandardTextField
              error={!!errorMessage}
              help={errorMessage}
              onChange={handleChange}
              elName="Password"
              type="password"
            />
          </div>
          <SimpleButton onClick={handleSubmit}>Login</SimpleButton>
        </div>
      </form>
    </SimpleCard>
  );
}

export default Login;
