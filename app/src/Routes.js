import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './Components/Login/Login'

export default(
    <Switch>
        <Route exact path='/login' component={Login}/>
    </Switch>
)