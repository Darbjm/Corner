import React from 'react';
import TextField from '@material-ui/core/TextField';

export interface Props {
  onChange: (name: string, value: string | undefined) => void;
  elName: string;
  value?: string;
  help?: string;
  error?: boolean;
  type?: string;
  placeholder?: string;
  name?: string;
}

const StandardTextField = ({elName, onChange, ...props}: Props): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    onChange(elName, e.target.value);
  };
  return (
    <TextField
      helperText={props.help ? props.help : ''}
      error={props.error}
      label={elName}
      name={elName}
      value={props.value}
      onChange={handleChange}
      type={props.type}
    />
  );
};

export default StandardTextField;
