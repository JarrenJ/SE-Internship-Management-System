import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {Home, Dashboard, /*ApplicationForm */} from "pages";
import {ApplicationForm1} from "components"

const App = () => {
    // Allow only authenticated users to view a protected route
    const authGuard = (Component, props) => () => {
        return sessionStorage.getItem("token") ? (
            <Component />
        ) : (
            <Redirect to="/" />
        );
    };

  return (
    <Router>
        <Switch>
            <Route path='/' exact component={Home} />
            {/* Leaving this in so we have a version of appForm that is single page will most likely end up deleting*/}
            {/*<Route path='/appForm' component={ApplicationForm} />*/}
            <Route path='/playground2' component={ApplicationForm1} />
            <Route path='/dashboard' component={authGuard(Dashboard)} />
            {/*<Route component={error404} />*/}
        </Switch>
        {/*<Footer />*/}
    </Router>
  );
}

export default App;
