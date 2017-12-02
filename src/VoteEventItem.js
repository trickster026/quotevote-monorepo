import React, { Component } from 'react';
import './App.css';


export default class VoteEventItem extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      newsongitem: (<div>Follow Artist Event: New Song: Kanye West - Can’t Tell Me Nothing</div>),
      newsongitem_plainText: "Follow Artist Event: New Song: Kanye West - Can’t Tell Me Nothing",
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
    const style_newSongItem = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="VoteEventItem" style={baseStyle}>
        <div className="compContent">
          <div className='elBox100M' style={style_box100M} />
          <div className='elNewSongItem' style={style_newSongItem}>
            <div>{this.state.newsongitem}</div>
          </div>
        </div>
      </div>
    )
  }

}
