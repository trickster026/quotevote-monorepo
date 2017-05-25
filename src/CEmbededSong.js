import React, { Component } from 'react';
import './App.css';
import img_elOval from './images/CEmbededSong_elOval.png';
import img_elTriangle from './images/CEmbededSong_elTriangle.png';
import img_elLine from './images/CEmbededSong_elLine.png';
import img_elLine2 from './images/CEmbededSong_elLine2.png';


export default class CEmbededSong extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      httpyoutube: (<div>http://youtu.be/#### (edit)</div>),
      httpyoutube_plainText: "http://youtu.be/#### (edit)",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_httpyoutube = {
        fontSize: 19.0,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    const style_oval = {
        background: 'url('+img_elOval+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_triangle = {
        background: 'url('+img_elTriangle+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_line = {
        background: 'url('+img_elLine+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_line2 = {
        background: 'url('+img_elLine2+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_line3 = {
        borderTop: '1px solid #969696',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CEmbededSong" style={baseStyle}>
        <div className="compContent">
          <div className='elHttpyoutube' style={style_httpyoutube}>
            <div>{this.state.httpyoutube}</div>
          </div>
          <div className='elOval' style={style_oval} />
          <div className='elTriangle' style={style_triangle} />
          <div className='elLine' style={style_line} />
          <div className='elLine2' style={style_line2} />
          <div className='elLine3' style={style_line3} />
        </div>
      </div>
    )
  }

}
