import React, { Component } from 'react';
import './App.css';
import N2PacItem from './N2PacItem';


export default class CUserWallAuth100M extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      cheader: (<div>User Wall</div>),
      cheader_plainText: "User Wall",
    };
  }

  // This component doesn't use any properties

  render() {
    const baseStyle = {};
    const style_cBackground = {
        background: 'rgba(215, 215, 215, 1.000)',
        border: '3.6px solid #969696',
        pointerEvents: 'none',
     };
    const style_cHeader = {
        fontSize: 45.6,
        fontFamily: "'AvenirNext-Bold', sans-serif",
        color: 'black',
        textAlign: 'left',
        pointerEvents: 'none',
     };
    
    return (
      <div className="CUserWallAuth100M" style={baseStyle}>
        <div className="compContent">
          <div className='elCBackground' style={style_cBackground} />
          <div className='hasNestedComps elN2PacItem'>
            <N2PacItem appActions={this.props.appActions} />
          </div>
          <div className='elCHeader' style={style_cHeader}>
            <div>{this.state.cheader}</div>
          </div>
        </div>
      </div>
    )
  }

}
