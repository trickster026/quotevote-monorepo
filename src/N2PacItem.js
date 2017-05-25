import React, { Component } from 'react';
import './App.css';
import img_elCRemoveX from './images/N2PacItem_elCRemoveX.png';


export default class N2PacItem extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      cquotetext: (<div>“I\'m a self-made millionaire Thug livin\', out of prison, pistols in the air” [linkto: Artist Name - Song Name]</div>),
      cquotetext_plainText: "“I'm a self-made millionaire Thug livin', out of prison, pistols in the air” [linkto: Artist Name - Song Name]",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_cBackground = {
        background: 'rgba(255, 255, 255, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_cQuoteText = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    const style_cRemoveX = {
        background: 'url('+img_elCRemoveX+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    
    return (
      <div className="N2PacItem" style={baseStyle}>
        <div className="compContent">
          <div className='elCBackground' style={style_cBackground} />
          <div className='elCQuoteText' style={style_cQuoteText}>
            <div>{this.state.cquotetext}</div>
          </div>
          <div className='elCRemoveX' style={style_cRemoveX} />
        </div>
      </div>
    )
  }

}
