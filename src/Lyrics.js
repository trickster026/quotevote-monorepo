import React, { Component } from 'react';
import './App.css';


export default class Lyrics extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      lyrics: (<div><br />[Verse 1: Kendrick Lamar]<br />I woke up this morning and figured I\'d call you<br />In case I\'m not here tomorrow<br />I\'m hoping that I can borrow a piece of mind<br />I\'m behind on what\'s really important<br />My mind is really distorted<br />I find nothing but trouble in my life<br />I\'m fortunate you believe in a dream<br />This orphanage we call a ghetto is quite a routine<br />And last night was just another distraction<br />Or a reaction of what we consider madness<br />I know exactly what happened<br />You ran outside when you heard my brother cry for help<br />Held him like a newborn baby and made him feel<br />Like everything was alright<br />And a fight he tried to put up, but the type<br /></div>),
      lyrics_plainText: "\n[Verse 1: Kendrick Lamar]\nI woke up this morning and figured I'd call you\nIn case I'm not here tomorrow\nI'm hoping that I can borrow a piece of mind\nI'm behind on what's really important\nMy mind is really distorted\nI find nothing but trouble in my life\nI'm fortunate you believe in a dream\nThis orphanage we call a ghetto is quite a routine\nAnd last night was just another distraction\nOr a reaction of what we consider madness\nI know exactly what happened\nYou ran outside when you heard my brother cry for help\nHeld him like a newborn baby and made him feel\nLike everything was alright\nAnd a fight he tried to put up, but the type\n",
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
    const style_lyrics = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Regular', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="Lyrics" style={baseStyle}>
        <div className="compContent">
          <div className='elBackground' style={style_background} />
          <div className='elLyrics' style={style_lyrics}>
            <div>{this.state.lyrics}</div>
          </div>
        </div>
      </div>
    )
  }

}
