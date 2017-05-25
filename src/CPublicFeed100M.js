import React, { Component } from 'react';
import './App.css';
import FeedItem from './FeedItem';


export default class CPublicFeed100M extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      header: (<div>Public News Feed</div>),
      header_plainText: "Public News Feed",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_header = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CPublicFeed100M" style={baseStyle}>
        <div className="compContent">
          <div className='hasNestedComps elFeedItem'>
            <FeedItem appActions={this.props.appActions} />
          </div>
          <div className='elHeader' style={style_header}>
            <div>{this.state.header}</div>
          </div>
        </div>
      </div>
    )
  }

}
