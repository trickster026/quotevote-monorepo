import React, { Component } from 'react';
import './App.css';
import CUserFeed100M from './CUserFeed100M';
import CRecommendedSongs50M from './CRecommendedSongs50M';
import CTrendingSongs50M from './CTrendingSongs50M';
import CTopArtists33M from './CTopArtists33M';
import CWelcome66M from './CWelcome66M';
import CNavBarAuth100M from './CNavBarAuth100M';

// UI framework component imports
import Container from 'muicss/lib/react/container';


export default class HomepageDesktopAuthScreen extends Component {

  // Properties used by this component:
  // appActions

  render() {
    const baseStyle = {};
    
    return (
      <Container fluid={true} className="AppScreen HomepageDesktopAuthScreen" style={baseStyle}>
        <div className="screenFgContainer">
          <div className="foreground">
            <div className='hasNestedComps elCUserFeed100M'>
              <CUserFeed100M appActions={this.props.appActions} />
            </div>
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
            <div className='hasNestedComps elCNavBarAuth100M'>
              <CNavBarAuth100M appActions={this.props.appActions} />
            </div>
          </div>
        </div>
      </Container>
    )
  }

}
