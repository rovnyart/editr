import React from 'react';
import MuiTextField from '@material-ui/core/TextField';

export default function TextField({ input, ...props }) {
  return <MuiTextField {...input} {...props} />;
}
