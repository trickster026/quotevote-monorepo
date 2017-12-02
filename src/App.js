import React, { Component } from 'react';
import './App.css';
import HomepageDesktopUnAuthScreen from './HomepageDesktopUnAuthScreen.js';
import HomepageDesktopAuthScreen from './HomepageDesktopAuthScreen.js';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.dataSheets = {};

    this.dataSlots = {};

    this.state = {
      currentScreen: 'homepagedesktopunauth',
      currentScreenProps: {},
    }
    this.screenHistory = [ {...this.state} ];
  }

  goToScreen = (screenId, props) => {
    // This is the default implementation and could be customized by a navigation plugin.
    if ( !props)
      props = {};
    let screenState = {currentScreen: screenId, currentScreenProps: props};
    this.setState(screenState);
    this.screenHistory.push(screenState);
    window.scrollTo(0, 0);
  }

  goBack = () => {
    // This is the default implementation and could be customized by a navigation plugin.
    if (this.screenHistory.length < 2)
      return;

    this.screenHistory.splice(this.screenHistory.length - 1, 1);
    let prevScreenState = this.screenHistory[this.screenHistory.length - 1];
    this.setState(prevScreenState);
    window.scrollTo(0, 0);
  }

  getDataSheet = (sheetId) => {
    // This is the default implementation and could be customized by a state management plugin.
    return this.dataSheets[sheetId];
  }

  addToDataSheet = (sheetId, row, actionId) => {
    // This is the default implementation and could be customized by a state management plugin.
    let sheet = this.dataSheets[sheetId];
    if (sheet && row) {
      sheet.addItem(row);
    }
    this.setState(this.state);
  }

  updateDataSlot = (slotId, value, actionId) => {
    // This is the default implementation and could be customized by a state management plugin.
    this.dataSlots[slotId] = value;
    this.setState(this.state);
  }

  render() {
    // Base app-level props passed to all screens
    let screenProps = {
      ...this.state.currentScreenProps,
      appActions: this,
      dataSheets: this.dataSheets,
    };
    let screenEl;
    // eslint-disable-next-line default-case
    switch (this.state.currentScreen) {
    case 'homepagedesktopunauth':
      screenEl = (<HomepageDesktopUnAuthScreen {...screenProps} />)
      break;
    case 'homepagedesktopauth':
      screenEl = (<HomepageDesktopAuthScreen {...screenProps} />)
      break;
    }

    return (
      <div className="App">
        {screenEl}
      </div>
    );
  }
}
