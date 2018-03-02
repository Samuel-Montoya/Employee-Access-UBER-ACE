import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Components/Login/Login';
import Authenticate from './Components/Authenticate';
import Dashboard from './Components/Dashboard/Dashboard';
import Certificate from './Components/Certificate/Certificate';

export default(
    <Switch>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/authenticate' component={Authenticate}/>
        <Route path='/search' component={Dashboard} />
        <Route path='/certificate/:certificate_number' component={Certificate} />
    </Switch>
)