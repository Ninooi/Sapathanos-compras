import React from 'react';
import {  BrowserRouter, Route, Switch  } from 'react-router-dom';

import Logon from './pages/logon'
import Register from './pages/register/index'
import Profile from './pages/profile/index'
import NewIncident from './pages/NewIncident/index'
import NewProvider from './pages/NewProvider/index'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile}/>
                <Route path="/requests/new" component={NewIncident}/>
                <Route path="/provider/new" component={NewProvider}/>
            </Switch>
        </BrowserRouter>
    );
}