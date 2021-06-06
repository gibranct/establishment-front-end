import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Establishments from '../pages/Establishments';
import UpsertEstablishment from '../pages/UpsertEstablishment';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/login" exact component={SignIn} />
      <Route path="/signup" exact component={SignUp} />
      <Route
        path="/establishments"
        isPrivate
        exact
        component={Establishments}
      />
      <Route
        path="/establishment"
        isPrivate
        exact
        component={UpsertEstablishment}
      />
      <Route
        path="/establishment/:id"
        isPrivate
        exact
        component={UpsertEstablishment}
      />
    </Switch>
  );
}
