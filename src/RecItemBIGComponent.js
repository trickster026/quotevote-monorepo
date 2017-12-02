import React, { Component } from 'react';
import './App.css';


export default class RecItemBIGComponent extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      text: (<div>2) Notorious BIG - Points</div>),
      text_plainText: "2) Notorious BIG - Points",
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
    const style_text = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="RecItemBIGComponent" style={baseStyle}>
        <div className="compContent">
          <div className='elBox100M' style={style_box100M} />
          <div className='elText' style={style_text}>
            <div>{this.state.text}</div>
          </div>
        </div>
      </div>
    )
  }

}
