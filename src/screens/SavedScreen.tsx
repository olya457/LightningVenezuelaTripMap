import React from 'react';
import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {images} from '../assets/images';
import {AppScreen} from '../components/AppScreen';
import {Button} from '../components/Buttons';
import {LocationCard} from '../components/LocationCards';
import {locations} from '../data/locations';
import {useNavigation} from '../navigation/NavigationContext';
import {useSavedLocations} from '../storage/SavedLocationsContext';
import {colors, getNavigationMetrics, shadow} from '../theme';

export function SavedScreen() {
  const {openTab, navigate} = useNavigation();
  const {savedIds} = useSavedLocations();
  const {width, height} = useWindowDimensions();
  const metrics = getNavigationMetrics(width, height);
  const emptyImageSize = Math.min(
    width - metrics.pageX * 2,
    metrics.compact ? 210 : 320,
    height * (metrics.compact ? 0.3 : 0.36),
  );
  const savedLocations = locations.filter(item => savedIds.includes(item.id));

  if (savedLocations.length === 0) {
    return (
      <AppScreen eyebrow="Your Collection" title="Saved Locations">
        <View style={[styles.empty, metrics.compact && styles.emptyCompact]}>
          <Image
            source={images.onboardingLocations}
            style={[
              styles.emptyImage,
              {width: emptyImageSize, height: emptyImageSize},
              metrics.compact && styles.emptyImageCompact,
            ]}
          />
          <Text
            style={[
              styles.emptyTitle,
              metrics.compact && styles.emptyTitleCompact,
            ]}>
            No saved locations yet
          </Text>
          <Text
            style={[
              styles.emptyBody,
              metrics.compact && styles.emptyBodyCompact,
            ]}>
            Explore locations and save your favourites
          </Text>
          <Button
            title="Go to Explore"
            onPress={() => openTab('explore')}
            style={[styles.emptyButton, metrics.compact && styles.emptyButtonCompact]}
          />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen eyebrow="Your Collection" title="Saved Locations">
      {savedLocations.map(location => (
        <LocationCard
          key={location.id}
          compact
          saved
          location={location}
          onPress={() => navigate({name: 'locationDetail', locationId: location.id})}
        />
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    paddingTop: 48,
  },
  emptyCompact: {
    paddingTop: 8,
  },
  emptyImage: {
    borderRadius: 22,
    marginBottom: 30,
    ...shadow,
  },
  emptyImageCompact: {
    borderRadius: 18,
    marginBottom: 18,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyTitleCompact: {
    fontSize: 21,
    lineHeight: 26,
  },
  emptyBody: {
    color: '#b5b5be',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 28,
  },
  emptyBodyCompact: {
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
    marginBottom: 18,
  },
  emptyButton: {
    width: '100%',
  },
  emptyButtonCompact: {
    minHeight: 50,
  },
});
