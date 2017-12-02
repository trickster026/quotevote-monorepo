import React, { Component } from 'react';
import './App.css';


export default class AvatarPic extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      default: (<div>Artist Pic</div>),
      default_plainText: "Artist Pic",
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
    const style_default = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="AvatarPic" style={baseStyle}>
        <div className="compContent">
          <div className='elBackground' style={style_background} />
          <div className='elDefault' style={style_default}>
            <div>{this.state.default}</div>
          </div>
        </div>
      </div>
    )
  }

}
