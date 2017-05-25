import React, { Component } from 'react';
import './App.css';
import img_elHHSBLyricPageA_06 from './images/CNavBarUnAuth100M_elHHSBLyricPageA_06.jpg';


export default class HHSBIcon extends Component {

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_HHSBLyricPageA_06 = {
        background: 'url('+img_elHHSBLyricPageA_06+')',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        pointerEvents: 'none',
     };
    
    return (
      <div className="HHSBIcon" style={baseStyle}>
        <div className="compContent">
          <div className='elHHSBLyricPageA_06' style={style_HHSBLyricPageA_06} />
        </div>
      </div>
    )
  }

}
