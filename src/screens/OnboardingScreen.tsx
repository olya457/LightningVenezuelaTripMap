import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
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
  const imageSize = useMemo(
    () => Math.min(width - 64, height < 720 ? 250 : 318),
    [height, width],
  );
  const last = index === onboardingSlides.length - 1;

  const next = () => {
    if (last) {
      onFinish();
      return;
    }
    setIndex(current => current + 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Pressable onPress={onFinish} style={styles.skipHit}>
          <Text style={styles.skip}>Skip</Text>
        </Pressable>
        <View style={styles.imageWrap}>
          <Image
            source={slide.image}
            style={[styles.image, {width: imageSize, height: imageSize}]}
          />
        </View>
        <View style={styles.copy}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.body}>{slide.body}</Text>
        </View>
        <View style={styles.dots}>
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
          style={styles.button}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: layout.androidInset,
    paddingBottom: layout.androidInset,
  },
  content: {
    minHeight: '100%',
    paddingHorizontal: 22,
    paddingTop: 34,
    paddingBottom: 28,
    justifyContent: 'space-between',
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
    marginTop: 20,
  },
  image: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(72, 135, 255, 0.3)',
    ...shadow,
  },
  copy: {
    alignItems: 'center',
    marginTop: 28,
    paddingHorizontal: 8,
  },
  title: {
    color: colors.text,
    fontSize: 25,
    lineHeight: 31,
    textAlign: 'center',
    fontWeight: '900',
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 22,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
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
    marginTop: 24,
  },
});
