import React from 'react';
import uuidv4 from 'uuid/v4';
import { Switch, Route, Redirect } from 'react-router-dom';

import Edit from './scenes/Edit';

export default function Notes({ match }) {
  return (
    <Switch>
      <Route path={`${match.url}/:id`} component={Edit} />
      <Redirect to={`${match.url}/${uuidv4()}`} />
    </Switch>
  );
}
