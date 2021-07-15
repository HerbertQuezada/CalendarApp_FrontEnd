import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LoginPage } from '../components/auth/LoginPage';
import { CalendarPage } from '../components/calendar/CalendarPage';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact component={LoginPage} path='/login' />
                <Route exact component={CalendarPage} path='/' />
                <Redirect to='/'/>
            </Switch>
        </Router>
    )
}
