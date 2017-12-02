import React, { Component } from 'react';
import './App.css';


export default class RecItem2pac3 extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      recttitle: (<div>1) Username - Points</div>),
      recttitle_plainText: "1) Username - Points",
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
    const style_rectTitle = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="RecItem2pac3" style={baseStyle}>
        <div className="compContent">
          <div className='elBox100M' style={style_box100M} />
          <div className='elRectTitle' style={style_rectTitle}>
            <div>{this.state.recttitle}</div>
          </div>
        </div>
      </div>
    )
  }

}
