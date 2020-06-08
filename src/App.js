import React, {useEffect, useState} from 'react';

import './App.css';

import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from './page/Jobs';
import Login from './page/Login';
import Detail from './page/Detail'
import FourOhFourPage from './page/FourOhFourPage'


function App() {
  let [user, setUser] = useState(true)

  const ProtectedRoute = (props) => {
    if (user === true) {
      return <Route {...props} />
    } else {
      return <Redirect to="/login"/>;
    }

  }
  return (
    <div>
      <Switch>
        <ProtectedRoute path="/jobs/:id" render={(props)=> <Detail{...props}/>}/>
        <Route path="/jobs/:id" component={Detail}/>
        <Route exact path="/jobs" component={Jobs}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Jobs}/>
        <Route path="*" component={FourOhFourPage} />
      </Switch>
    </div>
  );
}

export default App;
