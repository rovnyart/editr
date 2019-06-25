import React, { useState, useContext } from 'react';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import Typography from '@material-ui/core/Typography';

import AppContext from '../context';

import TextField from './inputs/TextField';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: theme.spacing(40),
    height: theme.spacing(32),
    padding: theme.spacing(2),
  },
}));

export default function AuthButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState('login');
  const { authUser } = useContext(AppContext);
  const classes = useStyles();
  const onSubmit = async (credentials) => {
    await authUser({ credentials });
  };
  return (
    <React.Fragment>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)}>Log in / Register</Button>
      <Popover
        anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}
        PaperProps={{ classes: { root: classes.paper } }}
      >
        <Form
          onSubmit={onSubmit}
          initialValues={{ email: '', password: '' }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item align="center"><Typography variant="body2">LOGIN / REGISTRATION</Typography></Grid>
                {type === 'login' && (
                  <>
                    <Grid item>
                      <Field
                        name="email" label="email" fullWidth
                        component={TextField}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item>
                      <Field
                        name="password" label="password" fullWidth
                        component={TextField} InputLabelProps={{ shrink: true }}
                        type="password"
                      />
                    </Grid>
                    <Grid item>
                      <Button fullWidth type="submit">Login</Button>
                    </Grid>
                  </>
                )}
                {type === 'register' && (
                  <Grid item>
                    <Button fullWidth onClick={() => setType('login')}>Have account</Button>
                  </Grid>
                )}
                <Grid item>
                  <Button fullWidth onClick={() => setType('register')}>Register</Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </Popover>
    </React.Fragment>
  );
}
