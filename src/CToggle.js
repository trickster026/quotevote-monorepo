import React, { Component } from 'react';
import './App.css';
import img_elToggleOn from './images/CToggle_elToggleOn.jpg';


export default class CToggle extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      global: (<div>global</div>),
      global_plainText: "global",
      local: (<div>local</div>),
      local_plainText: "local",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_toggleOn = {
        background: 'url('+img_elToggleOn+')',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        pointerEvents: 'none',
     };
    const style_global = {
        fontSize: 22.8,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    const style_local = {
        fontSize: 22.8,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CToggle" style={baseStyle}>
        <div className="compContent">
          <div className='elToggleOn' style={style_toggleOn} />
          <div className='elGlobal' style={style_global}>
            <div>{this.state.global}</div>
          </div>
          <div className='elLocal' style={style_local}>
            <div>{this.state.local}</div>
          </div>
        </div>
      </div>
    )
  }

}
