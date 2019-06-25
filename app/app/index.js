import React, { useEffect, useState, useCallback } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Cookie from 'universal-cookie';
import io from 'socket.io-client';

import config from '../../server/config/environment';

import useNotifications from './hooks/notifications';
import AppLayout from './components/AppLayout';
import AppContext from './context';
import api from './utils/api';

const socketUrl = process.env.NODE_ENV === 'production' ? 'http://eddtr.space' : 'http://localhost';
const wsClient = io.connect(`${socketUrl}:${config.port}`);
const cookie = new Cookie();

const Notes = React.lazy(() => import('./scenes/Notes'));

export default function App(props) {
  const showError = useNotifications('error');
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  useEffect(() => {
    wsClient.on('note_changed', (payload) => {
      setNotification(payload);
    });
  }, []);

  const authUser = async ({ credentials }) => {
    try {
      const { data } = await api.post('/auth', credentials);
      setUser(data);
      setUserLoaded(true);
    } catch ({ message }) {
      showError(message);
    }
  };

  const loadUser = useCallback(async () => {
    const possibleLoggedIn = Boolean(cookie.get('eddtr.sid'));
    let loadedUser;

    if (possibleLoggedIn) {
      try {
        const { data } = await api.get('/api/users/me');
        loadedUser = data;
      } catch ({ message }) {
        showError(message);
      }
      setUser(loadedUser);
      setUserLoaded(true);
    }
  }, [showError]);

  const expireUserAuth = () => {
    cookie.remove('eddtr.sid');
    const date = new Date(0);
    document.cookie = `eddtr.sid=; path=/; expires=${date.toUTCString()}`;
    setUser(null);
  };

  const logoutUser = async () => {
    try {
      await api.get('/auth/logout');
      expireUserAuth();
    } catch ({ message }) {
      showError(message);
    }
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <React.Suspense fallback="Loading...">
      <AppContext.Provider value={{ notification, user, authUser, userLoaded, loadUser, logoutUser }}>
        <AppLayout {...props}>
          <Switch>
            <Route path="/notes" component={Notes} />
            <Redirect to="/notes" />
          </Switch>
        </AppLayout>
      </AppContext.Provider>
    </React.Suspense>
  );
}
