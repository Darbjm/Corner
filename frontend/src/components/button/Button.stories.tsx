import React from 'react';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

export const AllColours = () => {
  return (
    <>
        <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}>
          <Button color='primary' buttonSize="medium" isFullWidth={false}>
            Medium
          </Button>
          <div style={{width: 10}} />
          <Button color='secondary' buttonSize="medium" isFullWidth={false}>
            Medium
          </Button>
          <div style={{width: 10}} />
        </div>
    </>
  );
};

AllColours.story = {
  name: 'All Colours',
};

export const AllSizes = () => {
  return (
    <>
      <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
        <Button color="primary" buttonSize="small" isFullWidth={false}>
          small
        </Button>
        <div style={{width: 10}} />
      </div>
      <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="medium">
        <Button color="primary" buttonSize="medium" isFullWidth={false}>
          medium
        </Button>
        <div style={{width: 10}} />
      </div>
      <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="large">
        <Button color="primary" buttonSize="large" isFullWidth={false}>
          large
        </Button>
        <div style={{width: 10}} />
      </div>
    </>
  );
};

AllSizes.story = {
  name: 'All Sizes',
};
