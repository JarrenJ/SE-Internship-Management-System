import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {Home, Dashboard, ApplicationForm} from "pages";
import {SampleComponent} from "components";

const App = () => {
    // Allow only authenticated users to view a protected route
    const authGuard = (Component, role) => () => {
        return sessionStorage.getItem("token") ? (
            <Component role={role}/>
        ) : (
            <Redirect to="/" />
        );
    };

    const roleId = sessionStorage.getItem('role')
    const role = {
        "isStudent": roleId === 'Student',
        "isAdmin": roleId === 'Admin',
        "isFaculty": roleId === 'Faculty'
    }

  return (
    <Router>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/appForm' component={ApplicationForm} />
            <Route path='/playground' component={authGuard(SampleComponent)} />
            <Route path='/dashboard' component={authGuard(Dashboard, role)} />
            {/*<Route component={error404} />*/}
        </Switch>
        {/*<Footer />*/}
    </Router>
  );
}

export default App;
