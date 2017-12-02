import React, { Component } from 'react';
import './App.css';
import CRecommendedSongs50M from './CRecommendedSongs50M';
import CTrendingSongs50M from './CTrendingSongs50M';
import CTopArtists33M from './CTopArtists33M';
import CWelcome66M from './CWelcome66M';
import CNavBarUnAuth100M from './CNavBarUnAuth100M';

// UI framework component imports
import Container from 'muicss/lib/react/container';


export default class HomepageDesktopUnAuthScreen extends Component {

  // Properties used by this component:
  // appActions

  render() {
    const baseStyle = {};
    
    return (
      <Container fluid={true} className="AppScreen HomepageDesktopUnAuthScreen" style={baseStyle}>
        <div className="screenFgContainer">
          <div className="foreground">
            <div className='hasNestedComps elCRecommendedSongs50M'>
              <CRecommendedSongs50M appActions={this.props.appActions} />
            </div>
            <div className='hasNestedComps elCTrendingSongs50M'>
              <CTrendingSongs50M appActions={this.props.appActions} />
            </div>
            <div className='hasNestedComps elCTopArtists33M'>
              <CTopArtists33M appActions={this.props.appActions} />
            </div>
            <div className='hasNestedComps elCWelcome66M'>
              <CWelcome66M appActions={this.props.appActions} />
            </div>
            <div className='hasNestedComps elCNavBarUnAuth100M'>
              <CNavBarUnAuth100M appActions={this.props.appActions} />
            </div>
          </div>
        </div>
      </Container>
    )
  }

}
