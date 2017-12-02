import React, { Component } from 'react';
import './App.css';
import CTopArtists33M from './CTopArtists33M';
import FollowButton from './FollowButton';
import AvatarPic from './AvatarPic';


export default class CArtistMast100M extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      artiststats: (<div>Kendrick Lamar<br />Score: #<br />Up:<br />Down:<br />Followers: #<br /></div>),
      artiststats_plainText: "Kendrick Lamar\nScore: #\nUp:\nDown:\nFollowers: #\n",
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
    const style_rectangle = {
        background: 'rgba(255, 255, 255, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_artistStats = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CArtistMast100M" style={baseStyle}>
        <div className="compContent">
          <div className='elBackground' style={style_background} />
          <div className='hasNestedComps elCTopArtists33M'>
            <CTopArtists33M appActions={this.props.appActions} />
          </div>
          <div className='elRectangle' style={style_rectangle} />
          <div className='elArtistStats' style={style_artistStats}>
            <div>{this.state.artiststats}</div>
          </div>
          <div className='hasNestedComps elFollowButton'>
            <FollowButton appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elAvatarPic'>
            <AvatarPic appActions={this.props.appActions} />
          </div>
        </div>
      </div>
    )
  }

}
