
import ClientNavbar from '../shares/ClientNavbar';
import ClientFooter from '../shares/ClientFooter';
import Login from '../views/login';
import Dashboard from '../views/Dashboard';
import ProtectedRoute from '../shares/ProtectedRoute';
import { dashboard,login, statistical,subUrl,insertStatiscal,updateStatiscal,log,users} from '../api/SubUrl';
import Statistical from '../views/Statistical';
import UpdataStatiscal from '../views/Statistical/Update';
import { CheckTOkenRule } from '../shares/Func/index'
import Properties from '../views/Properties';
import InsertStatiscal from '../views/Statistical/Insert';
import { properties } from '../api/SubUrl';
import History from '../views/History';
import Users from '../views/Users';
import {
    BrowserRouter,
    Route, Switch, Redirect
} from 'react-router-dom';


ClientLayout.propTypes = {

};

function ClientLayout(props) {
    const userInfo = CheckTOkenRule()
    return (
        <>
            {
                userInfo && <ClientNavbar />
            }

            <div className="bg-admin flex-grow-1">
                <Switch>
                    <Route exact path={login} component={Login} />
                  
                    <Route exact path={insertStatiscal} component={InsertStatiscal} />
                    <ProtectedRoute exact path={subUrl} component={Dashboard} />
                    <ProtectedRoute exact path={dashboard} component={Dashboard} />
                    <ProtectedRoute exact path={statistical} component={Statistical} />
                    <ProtectedRoute exact path={updateStatiscal} component={UpdataStatiscal} />
                    <ProtectedRoute exact path={properties} component={Properties} />
                    <ProtectedRoute exact path={log} component={History} />
                    <ProtectedRoute exact path={users} component={Users} />
                    {/* <ProtectedRoute exact path={register} component={Register} />
                    <ProtectedRoute exact path={dashboard} component={Dashboard} />
                    <ProtectedRoute exact path={profileMem} component={ProfileMem} />
                    <ProtectedRoute exact path={updateMem} component={UpdateMem} />
                    <ProtectedRoute exact path={log} component={Log} />
                    <ProtectedRoute exact path={users} component={Users} /> */}

                </Switch>
            </div>
            {
                userInfo && <ClientFooter />
            }

        </>
    );
}

export default ClientLayout;