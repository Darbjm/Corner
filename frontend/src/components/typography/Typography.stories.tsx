import React from 'react';
import Typography from './Typography'

export default {
  title: 'Typography',
  component: Typography,
};

export const Variant = () => {
  return (
    <>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Typography variant='caption'>Caption</Typography>
    </div>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Typography variant='link' href='https://www.google.com/'>Link</Typography>
    </div>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Typography variant='bodySmall'>Body Small</Typography>
    </div>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Typography variant='bodyMedium'>Body Medium</Typography>
    </div>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Typography variant='bodyLarge'>Body Large</Typography>
    </div>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Typography variant='h4'>H4</Typography>
    </div>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Typography variant='h2'>H2</Typography>
    </div>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Typography variant='h1'>H1</Typography>
    </div>
    </>
  );
};

Variant.story = {
  name: 'Variants',
};

export const Color = () => {
  return (
    <>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Typography color='primary' variant='bodyMedium'>Primary</Typography>
    </div>
    <div style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}} key="small">
      <Typography color='secondary' variant='bodyMedium'>Secondary</Typography>
    </div>
    </>
  );
};

Color.story = {
  name: 'Colors',
};