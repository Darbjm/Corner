import React from 'react';
import { TextFieldn } from './TextField.style';
import { ColorTypeKey } from '../../styles/theme';
import Typography from '../typography';
import { Div } from '../../styles/BasicComponents.style'

interface ErrorObject {
  username?: string;
  area_code?: string;
  password?: string;
  password_confirmation?: string;
  search?: string;
}

export interface Props {
  onChange: (name: string, value: string | undefined) => void;
  elName: string;
  color: ColorTypeKey
  placeholder: string;
  value?: string;
  help?: string;
  error: ErrorObject;
  type?: string;
  name?: string;
  size?: 'large'
}

// Solution found on https://dev.to/kingdaro/indexing-objects-in-typescript-1cgi

const StandardTextField = ({elName, onChange, color, placeholder, error, size, ...props}: Props): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    onChange(elName, e.target.value);
  };

  let isError = false

  function hasKey<O>(error: O, elName: keyof any): elName is keyof O {
    return elName in error
  }

  const getErrorMessage = (error: ErrorObject, elName: string) => {
    if (hasKey(error, elName)) {
      if (error[elName]) {
        isError = true
        return error[elName]
      }
    }
    return null
  }

  const errorMessage = getErrorMessage(error, elName)

  return (
    <Div vertical={true} height='auto' width='auto'>
      <TextFieldn
        $textFieldSize={size}
        color={color}
        helperText={props.help ? props.help : ''}
        error={isError}
        label={placeholder}
        name={elName}
        value={props.value}
        onChange={handleChange}
        type={props.type}
      />
      {errorMessage ? <Typography variant='bodySmall' color='primary'>{errorMessage}</Typography> : null}
    </Div>
  );
};

export default StandardTextField;
