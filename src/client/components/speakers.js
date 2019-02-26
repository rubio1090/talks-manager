import React, { Component } from 'react';
import Nav from './nav';

export default class Speakers extends Component{
  constructor(props){
    super(props);
    this.state = {
      congId : 1,
      congInfo : [],
      clickedSpeakerId : 1,
      selectedId : 1,
      speakers : [],
      talks : [],
      switchToMobile : false
    }
  }

  componentDidMount(){
    this.updateState();
    this.waitForProps();
    // this.getSpeakers();
    // this.getTalks();
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

  waitForProps=()=>{
    var checkForId = setInterval(()=>{
      if(this.state.congId!==null){
        const {congId} = this.state;
        this.getCongInfo(congId);
        this.getSpeakers(congId);
        this.getTalks(congId);
        clearInterval(checkForId);
      }
    }, 200);
  }
  getSpeakers=(congId)=>{
    fetch(`http://localhost:3030/api/speakers?cong_id=${congId}`)
      .then(res => res.json())
      .then(res => this.setState({ speakers : res.data }))
  }

  getTalks=(congId)=>{
    fetch(`http://localhost:3030/api/cong/talks?cong_id=${congId}`)
      .then(res => res.json())
      .then(res => this.setState({ talks : res.data }))
  }

  getCongInfo=(congId)=>{
    fetch(`http://localhost:3030/api/cong?cong_id=${congId}`)
      .then(res => res.json())
      .then(res => this.setState({ congInfo : res.data }))
  }

  handleSelection=(ev)=>{
    this.setState({ selectedId : ev.target.value, clickedSpeakerId : Number(ev.target.value) });
  }

  setSpeakerId=(speakerId)=>{
    this.setState({ clickedSpeakerId : speakerId });
  }

  renderSpeakers=(speaker)=>{
    return(
      <div key={speaker.ID} className="card" onClick={this.setSpeakerId.bind(this, speaker.ID)}>
        <div className="card-body py-1 px-3">
          <p className={speaker.TALKS > 0 ? `active-speaker h5 font-weight-bold` : `inactive-speaker h5 font-weight-bold`}>
            {`${speaker.LAST_NAME}, ${speaker.FIRST_NAME}`}
          </p>
          <p className="h6">{`${speaker.PRIVILEGE}`}</p>
          <p className="h6">{`Available talks: ${speaker.TALKS}`}</p>
        </div>
      </div>
    )
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
          <div className="card-body py-1">
            <p className="h5">{talk.TALK_TITLE}</p>
            <p className="h6">{`Talk number: `}{talk.TALK_NUMBER}</p>
          </div>
        </div>
      )
    }
  }

  render(){
    
    const {switchToMobile,speakers,talks,congInfo} = this.state;
    return(
      <div className="container-fluid">
      <Nav congId={this.state.congId}/>
      <div className="container-fluid bg-light-grey py-5">
        <div className="container">
          {congInfo.map( c => (
              <div key={c.CONG_ID} className="hr h2 pb-3">{c.CONG_NAME}</div>
            ))} 
            <div className="row">
              
              <div className="col-lg-4">
                <p className="h4 text-uppercase my-0 py-3 pl-3">Speakers</p>
                {switchToMobile ? this.renderSpeakerOptions(speakers) : speakers.map( speaker => this.renderSpeakers(speaker))}
              </div>

              <div className="col-lg-8">
                <p className="h4 text-uppercase my-0 py-3 pl-3">Available Talks</p>
                {talks.map( talk => this.renderTalks(talk) )}
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

}