import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';

export interface Props {
  children: JSX.Element | JSX.Element[] | string | number;
}

const useStyles = makeStyles({
  root: {
    minWidth: '50%',
    minHeight: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

const SimpleCard = ({children}: Props): JSX.Element => {
  return (
    <Card className={useStyles().root}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default SimpleCard;
