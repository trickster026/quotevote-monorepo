import React, { Component } from 'react';
import './App.css';
import CSearchBar from './CSearchBar';
import img_elLine from './images/CNavBarUnAuth100M_elLine.png';
import img_elHHSBLyricPageA_06 from './images/CNavBarUnAuth100M_elHHSBLyricPageA_06.jpg';


export default class CNavBarUnAuth100M extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      scoreboard: (<div>SCOREBOARD</div>),
      scoreboard_plainText: "SCOREBOARD",
      signin: (<div>SIGN IN </div>),
      signin_plainText: "SIGN IN ",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_background = {
        background: 'rgba(215, 215, 215, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_SCOREBOARD = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'center',
        pointerEvents: 'none',
     };
    const style_line = {
        background: 'url('+img_elLine+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_SIGNIN = {
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
      <div className="CNavBarUnAuth100M" style={baseStyle}>
        <div className="compContent">
          <div className='elBackground' style={style_background} />
          <div className='hasNestedComps elCSearchBar'>
            <CSearchBar appActions={this.props.appActions} />
          </div>
          <div className='elSCOREBOARD' style={style_SCOREBOARD}>
            <div>{this.state.scoreboard}</div>
          </div>
          <div className='elLine' style={style_line} />
          <div className='elSIGNIN' style={style_SIGNIN}>
            <div>{this.state.signin}</div>
          </div>
          <div className='elHHSBLyricPageA_06' style={style_HHSBLyricPageA_06} />
        </div>
      </div>
    )
  }

}
