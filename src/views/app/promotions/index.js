import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const PromotionsDefault = React.lazy(() =>
  import(/* webpackChunkName: "promotion-summary" */ './PromotionsSummary')
);
const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Route
        path={`${match.url}/default`}
        render={(props) => <PromotionsDefault {...props} />}
      />
     
    

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
