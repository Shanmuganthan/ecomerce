import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
);
const ContentDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-content" */ './content')
);
const AnalyticsDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-analytics" */ './analytics')
);
const EcommerceDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './ecommerce')
);

const ProductCategory = React.lazy(() =>
  import(/* webpackChunkName: "product-category" */ './productCategory')
);


const Brands = React.lazy(() =>
  import(/* webpackChunkName: "brand" */ './Brands')
);

const Category = React.lazy(() =>
  import(/* webpackChunkName: "category" */ './Category')
);


const SubCategory = React.lazy(() =>
  import(/* webpackChunkName: "sub-category" */ './SubCategory')
);

const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
      <Route
        path={`${match.url}/default`}
        render={(props) => <DashboardDefault {...props} />}
      />
      <Route
        path={`${match.url}/content`}
        render={(props) => <ContentDefault {...props} />}
      />
      <Route
        path={`${match.url}/ecommerce`}
        render={(props) => <EcommerceDefault {...props} />}
      />
      <Route
        path={`${match.url}/analytics`}
        render={(props) => <AnalyticsDefault {...props} />}
      />
      <Route
        path={`${match.url}/product-category`}
        render={(props) => <ProductCategory {...props} />}
      />
          <Route
        path={`${match.url}/brands`}
        render={(props) => <Brands {...props} />}
      />
      <Route
        path={`${match.url}/category`}
        render={(props) => <Category {...props} />}
      />
      <Route
        path={`${match.url}/sub-category`}
        render={(props) => <SubCategory {...props} />}
      />
    

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
