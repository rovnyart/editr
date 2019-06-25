import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import App from './app';
import theme from './themes';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <SnackbarProvider maxSnack={3}>
      <Router history={createBrowserHistory()}>
        <Route path="/" component={App} />
      </Router>
    </SnackbarProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
