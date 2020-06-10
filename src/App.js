import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from './page/Jobs';
import Login from './page/Login';
import Detail from './page/Detail'
import FourOhFourPage from './page/FourOhFourPage'




function App() {
  let user = useSelector(state => state.user)

  const ProtectedRoute = (props) => {
    if (user.isAuthenticated === true) {
      return <Route {...props} />
    } else {
      return <Redirect to="/login" />;
    }
  }
  
  return (
    <div>
      <Switch>
        <ProtectedRoute exact path="/jobs" render={(props) => <Jobs{...props} />} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" render={(props) => <Jobs{...props} />} />
        <ProtectedRoute path="/jobs/:id" render={(props) => <Detail{...props} />} />
        
        <Route path="*" component={FourOhFourPage} />
      </Switch>
    </div>
  );
}

export default App;
