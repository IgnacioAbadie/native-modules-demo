import React from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, FlatList, SafeAreaView } from 'react-native';
import CustomButton from '@components/CustomButton';
import CustomText from '@app/components/CustomText';
import BackgroundImage from '@assets/background.jpg';

import styles from './styles';

export default function Home({
  areas,
  onTakeScreenshot,
  selected,
  renderSquare,
  keyExtractor,
  screenshotsTaken
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ImageBackground source={BackgroundImage} style={styles.background}>
          <FlatList
            data={areas}
            extraData={selected}
            keyExtractor={keyExtractor}
            style={styles.grid}
            renderItem={renderSquare}
            numColumns={3}
          />
        </ImageBackground>
        <CustomButton onPress={onTakeScreenshot} green title="Take!" style={styles.mainButton} />
        <CustomText white big style={styles.screenshotTaken}>
          Taken {screenshotsTaken}
        </CustomText>
      </View>
    </SafeAreaView>
  );
}

Home.propTypes = {
  keyExtractor: PropTypes.func.isRequired,
  renderSquare: PropTypes.func.isRequired,
  onTakeScreenshot: PropTypes.func.isRequired,
  areas: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number })),
  screenshotsTaken: PropTypes.number,
  selected: PropTypes.number
};
