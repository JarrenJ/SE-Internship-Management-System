import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import {AdminView, FacultyView, Home, StudentView} from "pages";
import {SampleComponent} from "components";

const App = () => {
    // Allow only authenticated users to view a protected route
    const authGuard = (Component) => () => {
        return sessionStorage.getItem("token") ? (
            <Component />
        ) : (
            <Redirect to="/" />
        );
    };

    const role = sessionStorage.getItem('role')

    const showView = (role) => {
        console.log(role)
        switch (role){
            case 'Admin':
                return AdminView
            case 'Faculty':
                return FacultyView
            case 'Student':
                return StudentView
            default:
                return StudentView
        }
    }

  return (
    <Router>
        {/*<Navbar />*/}
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/playground' component={authGuard(SampleComponent)} />
            <Route path='/dash' component={authGuard(showView(role))} />
            {/*<Route component={error404} />*/}
        </Switch>
        {/*<Footer />*/}
    </Router>
  );
}

export default App;
