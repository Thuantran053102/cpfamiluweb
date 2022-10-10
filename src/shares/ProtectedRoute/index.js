import React from 'react';
import PropTypes from 'prop-types';
import { CheckTOkenRule } from '../Func';
import { Route,Redirect  } from 'react-router-dom';


ProtectedRoute.propTypes = {
    
};

function ProtectedRoute({component: Component, role, ...restOfProps}) {
    
    console.log()
    const userInfo = CheckTOkenRule()
   
    return (
        <Route
            {...restOfProps}
            render = {
                (props) => userInfo ? <Component {...props} /> : ( <Redirect to="/login"/>)         
            }
        />
    );
}

export default ProtectedRoute;