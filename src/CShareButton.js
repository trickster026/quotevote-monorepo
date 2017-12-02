import React, { Component } from 'react';
import './App.css';
import img_elBackground from './images/CShareButton_elBackground.png';
import img_elQuotes from './images/CShareButton_elQuotes.png';
import img_elLine from './images/CShareButton_elLine.png';


export default class CShareButton extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      v5: (<div>+5</div>),
      v5_plainText: "+5",
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
    const style_quotes = {
        background: 'url('+img_elQuotes+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_line = {
        background: 'url('+img_elLine+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_v5 = {
        fontSize: 38.0,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CShareButton" style={baseStyle}>
        <div className="compContent">
          <div className='elBackground' style={style_background} />
          <div className='elQuotes' style={style_quotes} />
          <div className='elLine' style={style_line} />
          <div className='elV5' style={style_v5}>
            <div>{this.state.v5}</div>
          </div>
        </div>
      </div>
    )
  }

}
