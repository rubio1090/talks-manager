import React, { Component } from 'react';
import Nav from './nav';

export default class Speakers extends Component{
  constructor(props){
    super(props);
    this.state = {
      congId : 1,
      clickedSpeakerId : 1,
      selectedId : 1,
      speakers : [],
      talks : [],
      switchToMobile : false
    }
  }

  componentDidMount(){
    this.updateState();
    this.getSpeakers();
    this.getTalks();
    this.checkWindowSize();
    window.addEventListener("resize", this.checkWindowSize);
  }

  updateState=()=>{
    // this.setState({ congId : this.props.location.state.congId });
    this.setState({ congId : 1 });
  }

  checkWindowSize=()=>{
    if(window.innerWidth < 992){
      this.setState({ switchToMobile : true });
    }
    if(window.innerWidth >= 992){
      this.setState({ switchToMobile : false });
    }
  }

  getSpeakers=()=>{
    var checkForId = setInterval(()=>{
      if(this.state.congId!==null){
        fetch(`http://localhost:3030/api/speakers?cong_id=${this.state.congId}`)
        .then(res => res.json())
        .then(res => this.setState({ speakers : res.data }))
        .then( clearInterval(checkForId) )
      }
    }, 200);
  }

  getTalks=()=>{
    var checkForId = setInterval(()=>{
      if(this.state.congId!==null){
        fetch(`http://localhost:3030/api/cong/talks?cong_id=${this.state.congId}`)
        .then(res => res.json())
        .then(res => this.setState({ talks : res.data }))
        .then( clearInterval(checkForId) )
      }
    }, 200);
  }

  setSpeakerId=(speakerId)=>{
    this.setState({ clickedSpeakerId : speakerId });
  }

  renderSpeakers=(speaker)=>{
    return(
      <div key={speaker.ID} className="card" onClick={this.setSpeakerId.bind(this, speaker.ID)}>
        <div className="card-body">
          <p className="h4">{`${speaker.LAST_NAME}, ${speaker.FIRST_NAME}`}</p>
          <p className="h5">{`${speaker.PRIVILEGE}`}</p>
          <p className="h5">{`Available talks: ${speaker.TALKS}`}</p>
        </div>
      </div>
    )
  }

  handleSelection=(ev)=>{
    this.setState({ selectedId : ev.target.value, clickedSpeakerId : Number(ev.target.value) });
  }

  renderSpeakerOptions=(speakers)=>{
    return(
      <div className="form-group">
        <select name="speaker" id="shell" className="form-control" value={this.state.selectedId} onChange={this.handleSelection}>
          {speakers.map( speaker => (
            <option key={speaker.ID} value={speaker.ID} >
              {speaker.LAST_NAME}{", "}{speaker.FIRST_NAME}
            </option>
          ))}
        </select>
      </div>
    )
  }

  renderTalks=(talk)=>{
    if(talk.SPEAKER_ID === this.state.clickedSpeakerId){
      return(
        <div key={talk.TALK_NUMBER} className="card">
          <div className="card-body">
            <p className="h5">{talk.TALK_TITLE}</p>
            <p className="h6">{talk.TALK_NUMBER}</p>
          </div>
        </div>
      )
    }
    
  }
  render(){
    
    const {switchToMobile,speakers,talks} = this.state;
    return(
      <div className="container-fluid">
      <Nav congId={this.state.congId}/>
      <div className="container-fluid bg-light-grey py-3">
        <div className="container">
            <div className="row">
              
              <div className="col-lg-4">
                <p className="h1">Speakers</p>
                {switchToMobile ? this.renderSpeakerOptions(speakers) : speakers.map( speaker => this.renderSpeakers(speaker))}
              </div>

              <div className="col-lg-8">
                <p className="h1">Available Talks</p>
                {/* {talks.length > 0 ? talks.map( talk => this.renderTalks(talk) ) : null } */}
                {talks.map( talk => this.renderTalks(talk) ) }
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

}