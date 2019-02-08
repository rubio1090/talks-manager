import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component{
  constructor(props){
    super(props);
    this.state={
      isLoggedIn : true
    }
  }
  render(){
    return(
      <div className="container-fluid pt-4">
        <nav className="navbar navbar-expand-md">
          <div className="container">
  
            <Link className="navbar-brand" to="/">
              <i className="fa fa-microphone"></i> Podium
            </Link>

              <div className="row justify-content-end">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse my-3" id="collapsibleNavbar">
                <ul className="navbar-nav">
                  
                  <li className="nav-item px-2">
                    <Link className="nav-link" to="/">
                      <span>HOME</span>
                    </Link>
                  </li>

                  <li className="nav-item px-2">
                    <Link className="nav-link" to="/">
                      <span>SPEAKERS</span>
                    </Link>
                  </li>

                  <li className="nav-item px-2">
                    <Link className="nav-link" to="/">
                      <span>NETWORK</span>
                    </Link>
                  </li> 

                  {
                    this.state.isLoggedIn ? 
                    <button className="ml-3 btn btn-outline-primary">LOG OUT</button> : null
                  }

                </ul>
              </div> 
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
