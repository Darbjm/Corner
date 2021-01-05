import React from 'react'
import Button from '../button'
import Typography from '../typography';
import { ColorTypeKey } from '../../styles/theme';

interface Props {
  title: string;
  buttonName: string;
  children: JSX.Element | JSX.Element[];
  buttonColor: ColorTypeKey;
  handleSubmit: () => void;
  errors?: string;
}

const MyForm = ({title, buttonName, buttonColor, children, handleSubmit }: Props) => {
  return (
    <form>
      <Typography variant='h2'>{title}</Typography>
      {children}
      <br/>
      <Button buttonSize='small' color={buttonColor} isFullWidth={false} type='submit' handleClick={() => handleSubmit()}>
        {buttonName}
      </Button>
    </form>
  );
};

export default MyForm