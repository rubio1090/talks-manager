import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <Router>
          <React.Fragment>
            <Switch>
              <Route exact path="/" component={ Home } /> 
              <Route exact path="/login" component={ Login } /> 
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}
