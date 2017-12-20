import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import Certificate from './Components/Certificate/Certificate';

export default(
    <Switch>
        <Route exact path='/login' component={Login}/>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/certificate/:certificate_number' component={Certificate} />
    </Switch>
)