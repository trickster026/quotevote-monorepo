import React, { Component } from 'react';
import './App.css';


export default class FollowButton extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      clabel: (<div>Follow</div>),
      clabel_plainText: "Follow",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_cBackground = {
        background: 'rgba(215, 215, 215, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_cLabel = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="FollowButton" style={baseStyle}>
        <div className="compContent">
          <div className='elCBackground' style={style_cBackground} />
          <div className='elCLabel' style={style_cLabel}>
            <div>{this.state.clabel}</div>
          </div>
        </div>
      </div>
    )
  }

}
