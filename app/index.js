import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Router, Route } from 'react-router-dom';

import App from './app';
import theme from './themes';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Router history={createBrowserHistory()}>
      <Route path="/" component={App} />
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
