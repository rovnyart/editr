import React, { useState, useContext } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppContext from '../context';
import api from '../utils/api';
import useNotifications from '../hooks/notifications';

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
  const showError = useNotifications('error');
  const showSuccess = useNotifications('success');
  const { executeRecaptcha } = useGoogleReCaptcha();
  const onSubmit = async ({ email, password, regEmail, regPassword }) => {
    try {
      const token = await executeRecaptcha('auth');
      if (!token) return;
      if (type === 'login') await authUser({ credentials: { email, password } });
      else {
        await api.post('/api/users', { email: regEmail, password: regPassword });
        await authUser({ credentials: { email: regEmail, password: regPassword } });
      }
      showSuccess(type === 'login' ? 'Successful login' : 'Registration successful. Please check your inbox and confirm email address'); // eslint-disable-line max-len
    } catch (error) {
      showError(error.message);
    }
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
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item align="center">
                  <Typography variant="body2">
                    {type === 'login' ? 'SIGN IN' : 'REGISTER'}
                  </Typography>
                </Grid>
                <>
                  <Grid item>
                    <Field
                      name={type === 'login' ? 'email' : 'regEmail'} label="email" fullWidth
                      component={TextField}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      name={type === 'login' ? 'password' : 'regPassword'} label="password" fullWidth
                      component={TextField} InputLabelProps={{ shrink: true }}
                      type="password"
                    />
                  </Grid>
                  <Grid item>
                    <Button disabled={submitting} fullWidth type="submit">
                      {type === 'login' ? 'Login' : 'Register'}
                      {submitting && <CircularProgress size={16} />}
                    </Button>
                  </Grid>
                </>
                {type === 'register' ? (
                  <Grid item>
                    <Button fullWidth onClick={() => setType('login')}>Have account</Button>
                  </Grid>
                ) : (
                  <Grid item>
                    <Button fullWidth onClick={() => setType('register')}>Create account</Button>
                  </Grid>
                )}
              </Grid>
            </form>
          )}
        />
      </Popover>
    </React.Fragment>
  );
}
