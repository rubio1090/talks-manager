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
    const {congId} = this.props;
    return(
      <div className="container-fluid pt-4">
        <nav className="navbar navbar-expand-md pb-0">
          <div className="container">
  
            <Link className="navbar-brand" to="/">
              <i className="fa fa-microphone"></i> Podium
            </Link>

              <div className="row justify-content-end">
              <button className="navbar-toggler mb-1" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse mt-3" id="collapsibleNavbar">
                <ul className="navbar-nav align-middle">
                  
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <span>HOME</span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to={{
                        pathname : "/speakers",
                        state : { congId }
                      }}>
                      <span>SPEAKERS</span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      <span>NETWORK</span>
                    </Link>
                  </li> 

                  {
                    this.state.isLoggedIn ? 
                        <button className="ml-3 mb-2 btn btn-outline-primary"><i className="fa fa-sign-out-alt"></i> LOG OUT</button>
                      : null

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
