import React, { Component } from 'react';
import { TouchableOpacity, NativeModules } from 'react-native';

import Home from './layout';
import styles from './styles';

const { ScreenshotHelperModule } = NativeModules;

const areas = [
  { id: '00', x: 0, y: 0, ref: React.createRef() },
  { id: '01', x: 0, y: 1, ref: React.createRef() },
  { id: '02', x: 0, y: 2, ref: React.createRef() },
  { id: '10', x: 1, y: 0, ref: React.createRef() },
  { id: '11', x: 1, y: 1, ref: React.createRef() },
  { id: '12', x: 1, y: 2, ref: React.createRef() },
  { id: '20', x: 2, y: 0, ref: React.createRef() },
  { id: '21', x: 2, y: 1, ref: React.createRef() },
  { id: '22', x: 2, y: 2, ref: React.createRef() }
];

class HomeContainer extends Component {
  state = { selected: areas[0], screenshotsTaken: 0 };

  callback = result => {
    if (result) {
      this.setState(prevState => ({ screenshotsTaken: prevState.screenshotsTaken + 1 }));
    }
  };

  handleTakeScreenshot = () => {
    ScreenshotHelperModule.takeScreenshot(this.callback);
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
        screenshotsTaken={this.state.screenshotsTaken}
        onTakeScreenshot={this.handleTakeScreenshot}
        selected={this.state.selected.id}
        renderSquare={this.renderSquare}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default HomeContainer;
