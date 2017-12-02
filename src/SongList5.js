import React, { Component } from 'react';
import './App.css';
import RecItemEmpty4 from './RecItemEmpty4';
import RecItemJayZ4 from './RecItemJayZ4';
import RecItemNas4 from './RecItemNas4';
import RecItemBIG4 from './RecItemBIG4';
import RecItem2pac4 from './RecItem2pac4';


export default class SongList5 extends Component {

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    
    return (
      <div className="SongList5" style={baseStyle}>
        <div className="compContent">
          <div className='hasNestedComps elRecItemEmpty4'>
            <RecItemEmpty4 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemJayZ4'>
            <RecItemJayZ4 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemNas4'>
            <RecItemNas4 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemBIG4'>
            <RecItemBIG4 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItem2pac4'>
            <RecItem2pac4 appActions={this.props.appActions} />
          </div>
        </div>
      </div>
    )
  }

}
