import React, { Suspense } from 'react';
import {  Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Products = React.lazy(() =>
  import(/* webpackChunkName: "products" */ './Products')
);

const ProductForm = React.lazy(() =>
  import(/* webpackChunkName: "product-form" */ './ProductForm')
);
const Dashboards = ({ match }) => (
  
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/default`}
        render={(props) => <Products {...props} />}
      />
        <Route
        path={`${match.url}/create`}
        render={(props) => <ProductForm {...props} />}
      />
        <Route
        path={`${match.url}/update/:id`}
        render={(props) => <ProductForm {...props} />}
      />
    </Switch>
  </Suspense>
);
export default Dashboards;
