import React from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import {images} from '../assets/images';
import {colors} from '../theme';

const stars = Array.from({length: 26}, (_, index) => ({
  id: index,
  left: `${(index * 37) % 94}%` as `${number}%`,
  top: `${(index * 53) % 88}%` as `${number}%`,
  opacity: 0.25 + ((index * 11) % 60) / 100,
}));

export function SplashScreen() {
  return (
    <ImageBackground source={images.loaderBackground} style={styles.root}>
      <View style={styles.starLayer}>
        {stars.map(star => (
          <View
            key={star.id}
            style={[
              styles.star,
              {left: star.left, top: star.top, opacity: star.opacity},
            ]}
          />
        ))}
      </View>
      <Image source={images.loaderIcon} style={styles.icon} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starLayer: {
    position: 'absolute',
    left: 38,
    right: 38,
    bottom: 86,
    height: 160,
  },
  star: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#d9ecff',
  },
  icon: {
    width: '78%',
    maxWidth: 306,
    aspectRatio: 1,
    borderRadius: 20,
  },
});
