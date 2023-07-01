import React, { Suspense, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { NotificationContainer } from 'components/common/react-notifications';
import { appLoad, appLoadFirst } from 'redux/auth/actions';
import AppLocale from './lang';
import { adminRoot, UserRole } from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import { ProtectedRoute } from './helpers/authHelper';



const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/unauthorized')
);



const App = ({ locale  ,appLoaded   }) => {
  const dispatch = useDispatch();
  const direction = getDirection();


  const currentAppLocale = AppLocale[locale];
  

  useEffect(()=>{
    const token = window.localStorage.getItem('current_user_token');
    if(token){
      dispatch(appLoad(token))
    }else{
      dispatch(appLoadFirst({isAuthenticated : false}))
    }
    
  },[window.localStorage.getItem('current_user_token')])



  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction]);

  return (
    <>
    { appLoaded ?  <div className="h-100">
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
          <NotificationContainer />
        <>
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <ProtectedRoute
                  path={adminRoot}
                  component={ViewApp}
                  roles={[UserRole.Admin, UserRole.Editor]}
                />
                <Route
                  path="/user"
                  render={(props) => <ViewUser {...props} />}
                />
                <Route
                  path="/error"
                  exact
                  render={(props) => <ViewError {...props} />}
                />
                <Route
                  path="/unauthorized"
                  exact
                  render={(props) => <ViewUnauthorized {...props} />}
                />
                <Redirect exact from="/" to="/user/login" />

                <Redirect to="/error" />

              </Switch>
            </Router>
          </Suspense>
        </>
      </IntlProvider>
    </div> : <div className="loading" /> }
    </>
  );
};

const mapStateToProps = ({ authUser, settings , common }) => {
  const { currentUser , isAuthenticated  } = authUser;
  const { locale } = settings;
  const {appLoaded } = common;
  return { currentUser, locale ,appLoaded, isAuthenticated};
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
