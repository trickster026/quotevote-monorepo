import React, { Component } from 'react';
import './App.css';
import CSearchBar from './CSearchBar';
import img_elLine from './images/CNavBarAuth100M_elLine.png';
import img_elLine2 from './images/CNavBarAuth100M_elLine2.png';
import img_elHHSBLyricPageA_06 from './images/CNavBarUnAuth100M_elHHSBLyricPageA_06.jpg';


export default class CNavBarAuth100M extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      signout: (<div>SIGN OUT</div>),
      signout_plainText: "SIGN OUT",
      account: (<div>ACCOUNT</div>),
      account_plainText: "ACCOUNT",
      scoreboard: (<div>SCOREBOARD</div>),
      scoreboard_plainText: "SCOREBOARD",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_rectangle = {
        background: 'rgba(215, 215, 215, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_SIGNOUT = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    const style_line = {
        background: 'url('+img_elLine+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_ACCOUNT = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'center',
        pointerEvents: 'none',
     };
    const style_line2 = {
        background: 'url('+img_elLine2+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_SCOREBOARD = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'center',
        pointerEvents: 'none',
     };
    const style_HHSBLyricPageA_06 = {
        background: 'url('+img_elHHSBLyricPageA_06+')',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CNavBarAuth100M" style={baseStyle}>
        <div className="compContent">
          <div className='elRectangle' style={style_rectangle} />
          <div className='hasNestedComps elCSearchBar'>
            <CSearchBar appActions={this.props.appActions} />
          </div>
          <div className='elSIGNOUT' style={style_SIGNOUT}>
            <div>{this.state.signout}</div>
          </div>
          <div className='elLine' style={style_line} />
          <div className='elACCOUNT' style={style_ACCOUNT}>
            <div>{this.state.account}</div>
          </div>
          <div className='elLine2' style={style_line2} />
          <div className='elSCOREBOARD' style={style_SCOREBOARD}>
            <div>{this.state.scoreboard}</div>
          </div>
          <div className='elHHSBLyricPageA_06' style={style_HHSBLyricPageA_06} />
        </div>
      </div>
    )
  }

}
