import React, { Component } from 'react';
import './App.css';
import Lyrics from './Lyrics';
import CShareButton from './CShareButton';
import CVoteButton from './CVoteButton';


export default class CLyricBox extends Component {

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_background = {
        background: 'rgba(215, 215, 215, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CLyricBox" style={baseStyle}>
        <div className="compContent">
          <div className='elBackground' style={style_background} />
          <div className='hasNestedComps elLyrics'>
            <Lyrics appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elCShareButton'>
            <CShareButton appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elCVoteButton'>
            <CVoteButton appActions={this.props.appActions} />
          </div>
        </div>
      </div>
    )
  }

}
