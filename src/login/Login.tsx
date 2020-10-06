import React, {useState, FormEvent} from 'react';
import SimpleCard from '../components/card';
import Typography from '../components/typography';
import StandardTextField from '../components/textField';
import SimpleButton from '../components/button';

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
    <SimpleCard>
      <Typography variant="h1" color="secondary">
        Login
      </Typography>
      <form onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}>
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
        </div>
        <br />
        <SimpleButton buttonSize="large" isFullWidth={true} color="secondary">
          Login
        </SimpleButton>
      </form>
    </SimpleCard>
  );
};

export default Login;
