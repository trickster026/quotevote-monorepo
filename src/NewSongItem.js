import React, { Component } from 'react';
import './App.css';


export default class NewSongItem extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      userFeedBody: (<div>Follow User Event: “lyric string here” was voted up/down by username [link to song]</div>),
      userFeedBody_plainText: "Follow User Event: “lyric string here” was voted up/down by username [link to song]",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_box100M = {
        background: 'rgba(255, 255, 255, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_userFeedBody = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="NewSongItem" style={baseStyle}>
        <div className="compContent">
          <div className='elBox100M' style={style_box100M} />
          <div className='elUserFeedBody' style={style_userFeedBody}>
            <div>{this.state.userFeedBody}</div>
          </div>
        </div>
      </div>
    )
  }

}
