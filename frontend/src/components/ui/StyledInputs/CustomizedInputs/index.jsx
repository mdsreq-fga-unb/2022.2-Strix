import * as React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#D9D9D9',
    backgroundColor: 'transparent',
    marginTop: '-10px',
  },
  '& .MuiInputLabel-shrink': {
    marginTop: '-7px',
    color: 'var(--green-700)',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '0',
    },
    '& .MuiOutlinedInput-input': {
      backgroundColor: '#D9D9D9',
      borderRadius: '10px',
      marginBottom: '2rem', 
    },
  },
  });

  export default function CustomizedInputs({...rest}) {
    return (
        <CssTextField label="Custom CSS" id="custom-css-outlined-input" {...rest} />
    );
  }