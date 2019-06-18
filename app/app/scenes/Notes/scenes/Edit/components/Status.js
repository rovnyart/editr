import React from 'react';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(),
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(0.5),
  },
}));

export default function Status({ text, show }) {
  const classes = useStyles();

  return (
    <Paper className={classNames(classes.root, show ? classes.fadeIn : classes.fadeOut)}>
      <Typography variant="caption" color="primary">{text}</Typography>
    </Paper>
  );
}
