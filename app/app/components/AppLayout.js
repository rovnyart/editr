import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex' },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    height: `calc(100vh - ${theme.spacing(2)}px)`,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function AppLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Eddtr</Typography>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Paper className={classes.container}>
          {children}
        </Paper>
      </main>

    </div>
  );
}
