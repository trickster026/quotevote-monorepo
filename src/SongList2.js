import React, { Component } from 'react';
import './App.css';
import RecItemEmpty2 from './RecItemEmpty2';
import RecItemJayZ2 from './RecItemJayZ2';
import RecItemNas2 from './RecItemNas2';
import RecItemBIG2 from './RecItemBIG2';
import RecItem2pac2 from './RecItem2pac2';


export default class SongList2 extends Component {

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    
    return (
      <div className="SongList2" style={baseStyle}>
        <div className="compContent">
          <div className='hasNestedComps elRecItemEmpty2'>
            <RecItemEmpty2 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemJayZ2'>
            <RecItemJayZ2 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemNas2'>
            <RecItemNas2 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemBIG2'>
            <RecItemBIG2 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItem2pac2'>
            <RecItem2pac2 appActions={this.props.appActions} />
          </div>
        </div>
      </div>
    )
  }

}
