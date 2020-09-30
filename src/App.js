import React from 'react';
import './App.css';
import FormConversor from './components/FormConversor';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SobreMi from './components/SobreMi';

function App() {



  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route path="/about-me">
            <SobreMi/>
          </Route>
          <Route path="/">
            <FormConversor/> 
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
