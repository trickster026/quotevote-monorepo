import React, { Component } from 'react';
import './App.css';


export default class RecItemNas3 extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      rectitle: (<div>3) Username - Points</div>),
      rectitle_plainText: "3) Username - Points",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_cBox100M = {
        background: 'rgba(255, 255, 255, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_recTitle = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="RecItemNas3" style={baseStyle}>
        <div className="compContent">
          <div className='elCBox100M' style={style_cBox100M} />
          <div className='elRecTitle' style={style_recTitle}>
            <div>{this.state.rectitle}</div>
          </div>
        </div>
      </div>
    )
  }

}
