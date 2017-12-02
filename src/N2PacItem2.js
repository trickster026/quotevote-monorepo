import React, { Component } from 'react';
import './App.css';


export default class N2PacItem2 extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      quotetext: (<div>“I\'m a self-made millionaire Thug livin\', out of prison, pistols in the air” [linkto: Artist Name - Song Name]</div>),
      quotetext_plainText: "“I'm a self-made millionaire Thug livin', out of prison, pistols in the air” [linkto: Artist Name - Song Name]",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_background = {
        background: 'rgba(255, 255, 255, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_quoteText = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="N2PacItem2" style={baseStyle}>
        <div className="compContent">
          <div className='elBackground' style={style_background} />
          <div className='elQuoteText' style={style_quoteText}>
            <div>{this.state.quotetext}</div>
          </div>
        </div>
      </div>
    )
  }

}
