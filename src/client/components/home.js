import React, { Component } from 'react';

import Nav from './nav';
export default class Home extends Component{
  constructor(){
    super();
    this.state={
      user : 1,
      userInfo : []
    }
  }

  componentDidMount(){
    this.getUserInfo();
  }

  getUserInfo=()=>{
    fetch(`http://localhost:3030/api/user?user_id=${this.state.user}`)
      .then( res => res.json())
      .then( res => this.setState({ userInfo : res.data }))
  }

  displayDashboard=(usr)=>{
    return(
      <div key={usr.CONG_ID} className="ßrow bg-light pb-5">
        
        <div className="section-header col-12 pt-5 pb-2 pl-5">
          {`${usr.LAST_NAME}, ${usr.FIRST_NAME}`}
        </div>
        
        <div className="info-title col-12 mt-5 mb-3 pb-1 pl-5">Congregation Info</div>

        <div className="col-12 pl-5">
          <table className="info-table">
            <tbody>
              
              <tr className="info-table-row">
                <td className="info-table-label py-2 pr-3">Name:</td>
                <td className="info-table-data py-2">{usr.CONG_NAME}</td>
              </tr>

              <tr className="info-table-row">
                <td className="info-table-label py-2 pr-3">Address:</td>
                <td className="info-table-data py-2">{`${usr.ADDRESS} ${usr.CITY}, ${usr.STATE}, ${usr.ZIP}`}</td>
              </tr>

              <tr className="info-table-row">
                <td className="info-table-label py-2 pr-3">Circuit:</td>
                <td className="info-table-data py-2">{usr.CIRCUIT}</td>
              </tr>

              <tr className="info-table-row">
                <td className="info-table-label py-2 pr-3">Meeting Day:</td>
                <td className="info-table-data py-2">{usr.MEETING_DAY}</td>
              </tr>

              <tr className="info-table-row">
                <td className="info-table-label py-2 pr-3">Language:</td>
                <td className="info-table-data py-2">{usr.LAN}</td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="col-12 my-3 pl-5">
          <button className="btn btn-outline-primary py-2 px-3"><i className="fa fa-edit"></i> Edit Info</button>
        </div>
        
      </div>
    )
  }

  render(){
    const {userInfo} = this.state;
    return(
      <div className="container-fluid">
        <Nav congId={userInfo.CONG_ID}/>
        <div className="container-fluid bg-light-grey full-ht">
          <div className="container p-1">
            <div className="row justify-content-center">
              
              <div className="col-12 pt-lg-4">
                {userInfo.map( usr => this.displayDashboard(usr))}
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
