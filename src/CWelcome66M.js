import React, { Component } from 'react';
import './App.css';
import img_elBox100M from './images/CWelcome66M_elBox100M.png';


export default class CWelcome66M extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      body: (<div>Here you can vote on hip hop lyrics, see which rappers are scoring the best, and share your favorite lines.<br /><br />This site is best used with Spotify, without Spotify you will not be able to stream music from within the site.  You will have to use an external music app</div>),
      body_plainText: "Here you can vote on hip hop lyrics, see which rappers are scoring the best, and share your favorite lines.\n\nThis site is best used with Spotify, without Spotify you will not be able to stream music from within the site.  You will have to use an external music app",
      header: (<div>Welcome to HHSB!</div>),
      header_plainText: "Welcome to HHSB!",
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
    const style_box100M = {
        background: 'url('+img_elBox100M+')',
        backgroundSize: '100% 100%',
        pointerEvents: 'none',
     };
    const style_body = {
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
        textAlign: 'center',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CWelcome66M" style={baseStyle}>
        <div className="compContent">
          <div className='elRectangle' style={style_rectangle} />
          <div className='elBox100M' style={style_box100M} />
          <div className='elBody' style={style_body}>
            <div>{this.state.body}</div>
          </div>
          <div className='elHeader' style={style_header}>
            <div>{this.state.header}</div>
          </div>
        </div>
      </div>
    )
  }

}
