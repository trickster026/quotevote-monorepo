import React, { Component } from 'react';
import './App.css';
import RecItemEmpty from './RecItemEmpty';
import RecItemJayZ from './RecItemJayZ';
import RecItemNas from './RecItemNas';
import RecItemBIG from './RecItemBIG';
import RecItem2pac from './RecItem2pac';


export default class SongList4 extends Component {

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    
    return (
      <div className="SongList4" style={baseStyle}>
        <div className="compContent">
          <div className='hasNestedComps elRecItemEmpty'>
            <RecItemEmpty appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemJayZ'>
            <RecItemJayZ appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemNas'>
            <RecItemNas appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemBIG'>
            <RecItemBIG appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItem2pac'>
            <RecItem2pac appActions={this.props.appActions} />
          </div>
        </div>
      </div>
    )
  }

}
