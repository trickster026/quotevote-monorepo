import React, { Component } from 'react';
import './App.css';


export default class CSearchBar extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      search: (<div>Search</div>),
      search_plainText: "Search",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_box = {
        background: 'rgba(255, 255, 255, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_search = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'center',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CSearchBar" style={baseStyle}>
        <div className="compContent">
          <div className='elBox' style={style_box} />
          <div className='elSearch' style={style_search}>
            <div>{this.state.search}</div>
          </div>
        </div>
      </div>
    )
  }

}
