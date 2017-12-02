import React, { Component } from 'react';
import './App.css';
import img_elBackground from './images/CVoteButton_elBackground.png';
import img_elNeutrCircle from './images/CVoteButton_elNeutrCircle.png';
import img_elDownCircle from './images/CVoteButton_elDownCircle.png';
import img_elUpCircle from './images/CVoteButton_elUpCircle.png';


export default class CVoteButton extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      _: (<div>_</div>),
      __plainText: "_",
      v: (<div>+</div>),
      v_plainText: "+",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_background = {
        background: 'url('+img_elBackground+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_neutrCircle = {
        background: 'url('+img_elNeutrCircle+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_downCircle = {
        background: 'url('+img_elDownCircle+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style__ = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    const style_upCircle = {
        background: 'url('+img_elUpCircle+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_v = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CVoteButton" style={baseStyle}>
        <div className="compContent">
          <div className='elBackground' style={style_background} />
          <div className='elNeutrCircle' style={style_neutrCircle} />
          <div className='elDownCircle' style={style_downCircle} />
          <div className='el_' style={style__}>
            <div>{this.state._}</div>
          </div>
          <div className='elUpCircle' style={style_upCircle} />
          <div className='elV' style={style_v}>
            <div>{this.state.v}</div>
          </div>
        </div>
      </div>
    )
  }

}
