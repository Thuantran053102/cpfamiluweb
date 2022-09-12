
import ClientNavbar from '../shares/ClientNavbar';
import ClientFooter from '../shares/ClientFooter';
import Login from '../views/login';
import Dashboard from '../views/Dashboard';
import { dashboard } from '../api/SubUrl';

import {
    BrowserRouter,
    Route, Switch,Redirect
  } from 'react-router-dom';


ClientLayout.propTypes = {
    
};

function ClientLayout(props) {
  
    return (
        <>

        <ClientNavbar/>
            <div className=" flex-grow-1">
                <Switch>
                   
                    {/* <Route exact path="/" component={Login}/> */}
                    <Route exact path={dashboard} component={Dashboard}/>
                </Switch>
            </div>
        <ClientFooter/>
        </>
    );
}

export default ClientLayout;