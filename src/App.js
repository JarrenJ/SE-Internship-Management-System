import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from "./pages/Home";
import './App.css';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
        {/*<Navbar />*/}
        <Switch>
            <Route path='/' exact component={Home} />
            {/*<Route component={error404} />*/}
        </Switch>
        {/*<Footer />*/}
    </Router>
  );
}

export default App;
