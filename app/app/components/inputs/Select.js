import React from 'react';
import MuiSelect from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menu: { backgroundColor: theme.palette.primary.light },
}));

export default function Select({ input, options, label, ...props }) {
  const classes = useStyles();
  return (
    <FormControl fullWidth>
      {label && <InputLabel color="secondary">{label}</InputLabel>}
      <MuiSelect {...input} {...props} color="secondary" MenuProps={{ classes: { paper: classes.menu } }}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
