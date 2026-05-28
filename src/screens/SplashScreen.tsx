import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {images} from '../assets/images';
import {colors, layout} from '../theme';

const stars = Array.from({length: 26}, (_, index) => ({
  id: index,
  left: `${(index * 37) % 94}%` as `${number}%`,
  top: `${(index * 53) % 88}%` as `${number}%`,
  opacity: 0.25 + ((index * 11) % 60) / 100,
}));

export function SplashScreen() {
  const pulse = useRef(new Animated.Value(0)).current;
  const {width, height} = useWindowDimensions();
  const iconSize = Math.min(Math.min(width, height) * 0.78, 306);
  const scale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.96, 1.04],
  });
  const opacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.86, 1],
  });

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1150,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1150,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

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
      <Animated.Image
        source={images.loaderIcon}
        style={[
          styles.icon,
          {
            width: iconSize,
            height: iconSize,
            opacity,
            transform: [{scale}],
          },
        ]}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: layout.statusTopGap,
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(85, 146, 255, 0.28)',
  },
});
