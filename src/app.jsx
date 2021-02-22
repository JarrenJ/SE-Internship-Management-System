import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from "pages";
import {SampleComponent} from "components";

function App() {
  return (
      // <SampleComponent />
    <Router basename={process.env.PUBLIC_URL}>
        {/*<Navbar />*/}
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/playground' component={SampleComponent} />
            {/*<Route component={error404} />*/}
        </Switch>
        {/*<Footer />*/}
    </Router>
  );
}

export default App;
