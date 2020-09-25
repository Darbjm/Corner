import React from 'react';
import * as Style from './Login.style';
import SimpleCard from '../components/card';
import Typography from '../components/typography';

const handleSubmit = () => {};

const handleChange = () => {};

function Login() {
  return (
    <SimpleCard>
      {
        <>
          <Typography variant="h2">Login</Typography>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <div className="control">
                <input name="email" placeholder="Email" onChange={handleChange} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
              <div className="invalid">{/* <small>{error}</small> */}</div>
              <button type="submit">Login</button>
            </div>
          </form>
        </>
      }
    </SimpleCard>
  );
}

export default Login;
