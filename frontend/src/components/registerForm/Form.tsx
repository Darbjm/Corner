import React from 'react'
import Button from '../button'
import TextField from '../textField'
import Typography from '../typography';
import { Div } from '../../styles/Components.style'
import { ColorTypeKey } from '../../styles/theme';

interface Props {
  title: string;
  buttonName: string;
  children: JSX.Element | JSX.Element[];
  buttonColor: ColorTypeKey;
  errors?: string;
}

const MyForm = ({title, buttonName, buttonColor, children }: Props) => {
  return (
    // @ts-ignore
    <Div vertical={true}>
        <form>
          <Typography variant='h2'>{title}</Typography>
          {children}
          <Button buttonSize='small' color={buttonColor} isFullWidth={false} type='submit'>
            {buttonName}
          </Button>
        </form>
      </Div>
  );
};

export default MyForm