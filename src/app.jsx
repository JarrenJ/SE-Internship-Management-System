import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { Home } from "pages";
import {SampleComponent} from "components";

const App = () => {

    // Allow only authenticated users to view a protected route
    const authGuard = (Component) => () => {
        return localStorage.getItem("token") ? (
            <Component />
        ) : (
            <Redirect to="/" />
        );
    };

  return (
    <Router>
        {/*<Navbar />*/}
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/playground' component={authGuard(SampleComponent)} />
            {/*<Route component={error404} />*/}
        </Switch>
        {/*<Footer />*/}
    </Router>
  );
}

export default App;
