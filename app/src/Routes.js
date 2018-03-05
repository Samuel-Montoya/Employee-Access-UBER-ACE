import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Components/Login/Login';
import {authenticateUser} from './Components/Authenticate';
import Dashboard from './Components/Dashboard/Dashboard';
import Certificate from './Components/Certificate/Certificate';

export default(
    <Switch>
        <Route exact path='/login' component={Login}/>
        <Route path='/search' component={authenticateUser(Dashboard)} />
        <Route path='/certificate/:certificate_number' component={authenticateUser(Certificate)} />
    </Switch>
)