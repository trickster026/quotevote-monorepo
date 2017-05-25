import React, { Component } from 'react';
import './App.css';
import LabelItemNas from './LabelItemNas';
import LabelItemBIG from './LabelItemBIG';
import LabelItem2pac from './LabelItem2pac';


export default class CFantasyLabel33M extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      ctext: (<div>5) [Artist Name]</div>),
      ctext_plainText: "5) [Artist Name]",
      ctext2: (<div>4) Jay Z</div>),
      ctext2_plainText: "4) Jay Z",
      header: (<div>My Record Label</div>),
      header_plainText: "My Record Label",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_backGround = {
        background: 'rgba(215, 215, 215, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_cBox100M = {
        background: 'rgba(255, 255, 255, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_cText = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    const style_cBox100M2 = {
        background: 'rgba(255, 255, 255, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_cText2 = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    const style_header = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CFantasyLabel33M" style={baseStyle}>
        <div className="compContent">
          <div className='elBackGround' style={style_backGround} />
          <div className='elCBox100M' style={style_cBox100M} />
          <div className='elCText' style={style_cText}>
            <div>{this.state.ctext}</div>
          </div>
          <div className='elCBox100M2' style={style_cBox100M2} />
          <div className='elCText2' style={style_cText2}>
            <div>{this.state.ctext2}</div>
          </div>
          <div className='hasNestedComps elLabelItemNas'>
            <LabelItemNas appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elLabelItemBIG'>
            <LabelItemBIG appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elLabelItem2pac'>
            <LabelItem2pac appActions={this.props.appActions} />
          </div>
          <div className='elHeader' style={style_header}>
            <div>{this.state.header}</div>
          </div>
        </div>
      </div>
    )
  }

}
