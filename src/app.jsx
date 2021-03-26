import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {Home, Dashboard, Dashboard1, ApplicationForm} from "pages";
import {SampleComponent} from "components";

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
            <Route path='/appForm' component={ApplicationForm} />
            <Route path='/playground' component={authGuard(SampleComponent)} />
            <Route path='/dashboard' component={authGuard(Dashboard1)} />
            {/*<Route component={error404} />*/}
        </Switch>
        {/*<Footer />*/}
    </Router>
  );
}

export default App;
