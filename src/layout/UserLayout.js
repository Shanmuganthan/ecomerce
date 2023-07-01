import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';



const UserLayout = ({ children , isAuthenticated  , history}) => {
  
  useEffect(() => {

    if(isAuthenticated){
      history.push('/app/dashboards/default');
    }

  },[isAuthenticated])
  
  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);

  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">{children}</div>
      </main>
    </>
  );
};
const mapStateToProps = ({authUser}) => {
  const {  isAuthenticated} = authUser;
  return { isAuthenticated };
}
export   default withRouter(connect(mapStateToProps,{})(UserLayout));;
