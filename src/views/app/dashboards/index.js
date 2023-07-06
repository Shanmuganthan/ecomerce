import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
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
const TechnicalSpecification = React.lazy(() =>
  import(/* webpackChunkName: "tech-spec" */ './TechnicalSpecification')
);
const ColorSpecification = React.lazy(() =>
  import(/* webpackChunkName: "color-spec" */ './ColorSpecification')
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
      <Route
        path={`${match.url}/technical-specification`}
        render={(props) => <TechnicalSpecification {...props} />}
      />
      <Route
        path={`${match.url}/color-specification`}
        render={(props) => <ColorSpecification {...props} />}
      />

      
    

      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
