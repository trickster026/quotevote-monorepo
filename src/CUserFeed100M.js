import React, { Component } from 'react';
import './App.css';
import VoteEventItem from './VoteEventItem';
import NewSongItem from './NewSongItem';


export default class CUserFeed100M extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      header: (<div>User News Feed</div>),
      header_plainText: "User News Feed",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_background = {
        background: 'rgba(215, 215, 215, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_header = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CUserFeed100M" style={baseStyle}>
        <div className="compContent">
          <div className='elBackground' style={style_background} />
          <div className='hasNestedComps elVoteEventItem'>
            <VoteEventItem appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elNewSongItem'>
            <NewSongItem appActions={this.props.appActions} />
          </div>
          <div className='elHeader' style={style_header}>
            <div>{this.state.header}</div>
          </div>
        </div>
      </div>
    )
  }

}
