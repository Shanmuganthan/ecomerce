import React   from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink , withRouter  } from 'react-router-dom';
import { connect ,useDispatch} from 'react-redux';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { loginUser } from 'redux/actions';
import { login } from 'services/auth';
import { NotificationManager } from 'components/common/react-notifications';
import { appLoad, setIsAuthenicated } from 'redux/auth/actions';




const loginSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});


const Login = ({ loading  }) => {
  const dispatch = useDispatch();
  const onUserLogin = async(values) => {
    
    try{
    let res = await login(values);
     res = res.data;
     NotificationManager.success( "Sucessfully Logined." , "Success" ,  3000)
     window.localStorage.setItem('current_user_token',res.token);
     dispatch(appLoad(res.token))
    }catch(err){
      NotificationManager.error( "Invalid Email & Password." , "Error" ,  3000)
    }
  }



  const initialValues = { email : '', password  : ''};
 
  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
        
          <div className="form-side">
           
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues}   
                 validationSchema={loginSchema}
                 onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                       loading ? 'show-spinner' : ''
                      }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser  }) => {
  const { loading, error , isAuthenticated} = authUser;
  return { loading, error,isAuthenticated };
};

export default withRouter(connect(mapStateToProps, {
  loginUserAction: loginUser,
  setIsAuthenicatedAction: setIsAuthenicated
})(Login));
