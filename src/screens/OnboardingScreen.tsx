import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Button} from '../components/Buttons';
import {onboardingSlides} from '../data/onboarding';
import {colors, layout, shadow} from '../theme';

export function OnboardingScreen({onFinish}: {onFinish: () => void}) {
  const [index, setIndex] = useState(0);
  const {width, height} = useWindowDimensions();
  const slide = onboardingSlides[index];
  const isTiny = height < 700;
  const isShort = height < 780;
  const imageSize = useMemo(
    () =>
      Math.min(
        width - (isTiny ? 84 : 64),
        height * (isTiny ? 0.34 : isShort ? 0.36 : 0.35),
        318,
      ),
    [height, isShort, isTiny, width],
  );
  const last = index === onboardingSlides.length - 1;
  const vertical = isTiny
    ? styles.compact
    : isShort
    ? styles.short
    : styles.regular;

  const next = () => {
    if (last) {
      onFinish();
      return;
    }
    setIndex(current => current + 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.content, vertical]}>
        <Pressable onPress={onFinish} style={styles.skipHit}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
        <View style={[styles.imageWrap, isTiny && styles.imageWrapCompact]}>
          <Image
            source={slide.image}
            style={[styles.image, {width: imageSize, height: imageSize}]}
          />
        </View>
        <View style={[styles.copy, isTiny && styles.copyCompact]}>
          <Text style={[styles.title, isTiny && styles.titleCompact]}>
            {slide.title}
          </Text>
          <Text
            style={[styles.body, isTiny && styles.bodyCompact]}
            numberOfLines={isTiny ? 4 : 5}>
            {slide.body}
          </Text>
        </View>
        <View style={[styles.dots, isTiny && styles.dotsCompact]}>
          {onboardingSlides.map((_, dotIndex) => (
            <View
              key={dotIndex}
              style={[styles.dot, dotIndex === index && styles.activeDot]}
            />
          ))}
        </View>
        <Button
          title={last ? 'Get Started' : 'Next  ›'}
          onPress={next}
          style={[styles.button, isTiny && styles.buttonCompact]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: layout.androidInset + layout.statusTopGap,
    paddingBottom: layout.androidInset,
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
  },
  regular: {
    paddingTop: 28,
    paddingBottom: 22,
  },
  short: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  compact: {
    paddingTop: 6,
    paddingBottom: 12,
  },
  skipHit: {
    alignSelf: 'flex-end',
    padding: 10,
    marginRight: 4,
  },
  skip: {
    color: colors.dim,
    fontSize: 13,
    fontWeight: '800',
  },
  imageWrap: {
    alignItems: 'center',
    marginTop: 40,
  },
  imageWrapCompact: {
    marginTop: 12,
  },
  image: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(72, 135, 255, 0.3)',
    ...shadow,
  },
  copy: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 8,
  },
  copyCompact: {
    marginTop: 18,
    paddingHorizontal: 4,
  },
  title: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 31,
    textAlign: 'center',
    fontWeight: '900',
  },
  titleCompact: {
    fontSize: 22,
    lineHeight: 27,
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 22,
  },
  bodyCompact: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 14,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  dotsCompact: {
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#20304f',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 24,
    backgroundColor: '#4f91ff',
  },
  button: {
    marginTop: 26,
  },
  buttonCompact: {
    minHeight: 50,
    marginTop: 14,
  },
});
