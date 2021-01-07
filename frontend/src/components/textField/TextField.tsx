import React from 'react';
import { TextFieldn } from './TextField.style';
import {ColorTypeKey} from '../../styles/theme';

export interface Props {
  onChange: (name: string, value: string | undefined) => void;
  elName: string;
  color: ColorTypeKey
  placeholder: string;
  value?: string;
  help?: string;
  error?: boolean;
  type?: string;
  name?: string;
}

const StandardTextField = ({elName, onChange, color, placeholder, ...props}: Props): JSX.Element => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    onChange(elName, e.target.value);
  };
  return (
    <div>
      <TextFieldn
        color={color}
        helperText={props.help ? props.help : ''}
        error={props.error}
        label={placeholder}
        name={elName}
        value={props.value}
        onChange={handleChange}
        type={props.type}
      />
    </div>
  );
};

export default StandardTextField;
