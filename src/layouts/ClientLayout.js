
import ClientNavbar from '../shares/ClientNavbar';
import ClientFooter from '../shares/ClientFooter';
import Login from '../views/login';
import Dashboard from '../views/Dashboard';
import ProtectedRoute from '../shares/ProtectedRoute';
import { dashboard,member,register,profileMem,updateMem,log,users } from '../api/SubUrl';
import Member from '../views/Member';
import Register from '../views/Register';
import ProfileMem from '../views/ProfileMem';
import UpdateMem from '../views/Member/Update';
import Log from '../views/log';
import Users from '../views/User';
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
        <div className="bg-admin flex-grow-1">
                <Switch>
             
                    <Route exact path="/login" component={Login}/>
              
                    <ProtectedRoute exact path="/" component={Dashboard}/>
                    <ProtectedRoute exact path={register} component={Register}/>
                    <ProtectedRoute exact path={dashboard} component={Dashboard}/>
                    <ProtectedRoute exact path={profileMem} component={ProfileMem}/>
                    <ProtectedRoute exact path={updateMem} component={UpdateMem}/>
                    <ProtectedRoute exact path={member} component={Member}/>
                    <ProtectedRoute exact path={log} component={Log}/>
                    <ProtectedRoute exact path={users} component={Users}/>
                    
                </Switch>
            </div>
        <ClientFooter/>
        </>
    );
}

export default ClientLayout;