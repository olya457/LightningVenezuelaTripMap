import React from 'react';
import {Image, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, shadow} from '../theme';
import {LocationCategory, StormLocation} from '../types';

export function CategoryCard({
  category,
  count,
  onPress,
}: {
  category: LocationCategory;
  count: number;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.category,
        {backgroundColor: category.gradient[0], borderColor: category.gradient[1]},
        pressed && styles.pressed,
      ]}>
      <View>
        <Text style={styles.categoryEmoji}>{category.emoji}</Text>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryCount}>{count} Locations</Text>
      </View>
      <View style={styles.categoryArrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </Pressable>
  );
}

export function LocationCard({
  location,
  onPress,
  compact = false,
  saved = false,
}: {
  location: StormLocation;
  onPress: () => void;
  compact?: boolean;
  saved?: boolean;
}) {
  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [styles.compact, pressed && styles.pressed]}>
        <Image source={location.image} style={styles.compactImage} />
        <View style={styles.compactBody}>
          <Text numberOfLines={1} style={styles.locationTitle}>
            {location.title}
          </Text>
          <Text numberOfLines={1} style={styles.locationPlace}>
            ◎ {location.place}
          </Text>
          <View style={styles.smallTag}>
            <Text style={styles.smallTagText}>{location.tag}</Text>
          </View>
        </View>
        {saved ? <Text style={styles.savedIcon}>💙</Text> : null}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      <ImageBackground source={location.image} style={styles.cardImage} imageStyle={styles.cardImageRadius}>
        <View style={styles.imageShade} />
        <View style={styles.tag}>
          <Text style={styles.tagText}>{location.tag}</Text>
        </View>
      </ImageBackground>
      <View style={styles.cardBody}>
        <Text style={styles.locationTitle}>{location.title}</Text>
        <Text style={styles.locationPlace}>◎ {location.place}</Text>
        <Text numberOfLines={3} style={styles.locationDescription}>
          {location.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.82,
    transform: [{scale: 0.99}],
  },
  category: {
    minHeight: 130,
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  categoryEmoji: {
    fontSize: 29,
    marginBottom: 16,
  },
  categoryTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    maxWidth: 230,
  },
  categoryCount: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 8,
  },
  categoryArrow: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(45, 117, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(70, 151, 255, 0.4)',
  },
  arrowText: {
    color: '#54a2ff',
    fontSize: 32,
    lineHeight: 35,
  },
  card: {
    borderRadius: 18,
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    overflow: 'hidden',
  },
  cardImage: {
    height: 150,
    justifyContent: 'flex-start',
  },
  cardImageRadius: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  tag: {
    alignSelf: 'flex-start',
    margin: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(29, 97, 255, 0.22)',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  tagText: {
    color: '#4f91ff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardBody: {
    padding: 16,
  },
  locationTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  locationPlace: {
    color: colors.dim,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  locationDescription: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '600',
    marginTop: 10,
  },
  compact: {
    minHeight: 90,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    padding: 10,
    marginBottom: 12,
  },
  compactImage: {
    width: 78,
    height: 68,
    borderRadius: 12,
  },
  compactBody: {
    flex: 1,
    marginLeft: 12,
  },
  smallTag: {
    alignSelf: 'flex-start',
    marginTop: 9,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  smallTagText: {
    color: '#4f91ff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  savedIcon: {
    fontSize: 20,
    marginLeft: 8,
    ...shadow,
  },
});
