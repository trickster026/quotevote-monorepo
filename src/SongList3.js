import React, { Component } from 'react';
import './App.css';
import RecItemEmpty3 from './RecItemEmpty3';
import RecItemJayZ3 from './RecItemJayZ3';
import RecItemNas3 from './RecItemNas3';
import RecItemBIG3 from './RecItemBIG3';
import RecItem2pac3 from './RecItem2pac3';


export default class SongList3 extends Component {

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    
    return (
      <div className="SongList3" style={baseStyle}>
        <div className="compContent">
          <div className='hasNestedComps elRecItemEmpty3'>
            <RecItemEmpty3 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemJayZ3'>
            <RecItemJayZ3 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemNas3'>
            <RecItemNas3 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItemBIG3'>
            <RecItemBIG3 appActions={this.props.appActions} />
          </div>
          <div className='hasNestedComps elRecItem2pac3'>
            <RecItem2pac3 appActions={this.props.appActions} />
          </div>
        </div>
      </div>
    )
  }

}
