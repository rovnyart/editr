import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import AppContext from '../context';

import AuthForm from './AuthForm';
import LogoutMenu from './LogoutMenu';

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


export default function AppLayout({ children, history }) {
  const classes = useStyles();
  const { user } = useContext(AppContext);

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item><Typography variant="h6">Eddtr</Typography></Grid>
            <Grid item>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Button onClick={() => history.push('/notes')}>
                    <AddIcon />
                    <span>New note</span>
                  </Button>
                </Grid>
                <Grid item>
                  { user ? <LogoutMenu email={user.email} /> : <AuthForm />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
