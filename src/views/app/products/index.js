import React, { Suspense } from 'react';
import {  Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Products = React.lazy(() =>
  import(/* webpackChunkName: "products" */ './Products')
);
const Dashboards = ({ match }) => (
  
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/default`}
        render={(props) => <Products {...props} />}
      />
    </Switch>
  </Suspense>
);
export default Dashboards;
