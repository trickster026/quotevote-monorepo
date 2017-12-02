import React, { Component } from 'react';
import './App.css';
import CEmbededSong from './CEmbededSong';


export default class CMediaInfoBar66M extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      artistandsong: (<div>Artist Name - Song Name<br />Score: # Up: #  Down: #</div>),
      artistandsong_plainText: "Artist Name - Song Name\nScore: # Up: #  Down: #",
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
    const style_cBackground = {
        background: 'rgba(255, 255, 255, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_artistAndSong = {
        fontSize: 38.0,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CMediaInfoBar66M" style={baseStyle}>
        <div className="compContent">
          <div className='elBackground' style={style_background} />
          <div className='elCBackground' style={style_cBackground} />
          <div className='hasNestedComps elCEmbededSong'>
            <CEmbededSong appActions={this.props.appActions} />
          </div>
          <div className='elArtistAndSong' style={style_artistAndSong}>
            <div>{this.state.artistandsong}</div>
          </div>
        </div>
      </div>
    )
  }

}
