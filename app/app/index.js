import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import io from 'socket.io-client';

import config from '../../server/config/environment';

import AppLayout from './components/AppLayout';
import NotificationContext from './context';

const socketUrl = process.env.NODE_ENV === 'production' ? 'http://eddtr.space' : 'http://localhost';
const wsClient = io.connect(`${socketUrl}:${config.port}`);

const Notes = React.lazy(() => import('./scenes/Notes'));

const useStyles = makeStyles((theme) => ({
  info: { backgroundColor: theme.palette.secondary.main, color: theme.palette.primary.main },
}));

export default function App() {
  const [notification, setNotification] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    wsClient.on('note_changed', (payload) => {
      setNotification(payload);
    });
  }, []);
  return (
    <React.Suspense fallback="Loading...">
      <SnackbarProvider maxSnack={3} classes={{ variantInfo: classes.info }}>
        <AppLayout>
          <NotificationContext.Provider value={{ notification }}>
            <Switch>
              <Route path="/notes" component={Notes} />
              <Redirect to="/notes" />
            </Switch>
          </NotificationContext.Provider>
        </AppLayout>
      </SnackbarProvider>
    </React.Suspense>
  );
}
