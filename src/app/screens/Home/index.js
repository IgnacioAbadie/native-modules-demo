import React, { Component } from 'react';
import { TouchableOpacity, NativeModules } from 'react-native';

import Home from './layout';
import styles from './styles';

const { ScreenshotHelperModule } = NativeModules;

const areas = [
  { id: 0, ref: React.createRef() },
  { id: 1, ref: React.createRef() },
  { id: 2, ref: React.createRef() },
  { id: 3, ref: React.createRef() },
  { id: 4, ref: React.createRef() },
  { id: 5, ref: React.createRef() },
  { id: 6, ref: React.createRef() },
  { id: 7, ref: React.createRef() },
  { id: 8, ref: React.createRef() }
];

class HomeContainer extends Component {
  state = { selected: areas[0] };

  callback = result => {
    console.log(result);
  };

  handleTakeScreenshot = () => {
    ScreenshotHelperModule.takeScreenshot(this.callback);//, this.state.selected.ref);
  };

  handleSelected = selected => {
    console.log(NativeModules);
    this.setState({ selected });
  };

  renderSquare = ({ item, index }) => (
    <TouchableOpacity
      ref={item.ref}
      onPress={() => this.handleSelected(item)}
      style={[styles.squared, this.state.selected.id === item.id && styles.highlight]}
    />
  );

  keyExtractor = item => `${item.id}`;

  render() {
    return (
      <Home
        areas={areas}
        onTakeScreenshot={this.handleTakeScreenshot}
        selected={this.state.selected.id}
        renderSquare={this.renderSquare}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default HomeContainer;
