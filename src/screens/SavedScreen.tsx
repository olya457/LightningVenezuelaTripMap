import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets/images';
import {AppScreen} from '../components/AppScreen';
import {Button} from '../components/Buttons';
import {LocationCard} from '../components/LocationCards';
import {locations} from '../data/locations';
import {useNavigation} from '../navigation/NavigationContext';
import {useSavedLocations} from '../storage/SavedLocationsContext';
import {colors, shadow} from '../theme';

export function SavedScreen() {
  const {openTab, navigate} = useNavigation();
  const {savedIds} = useSavedLocations();
  const savedLocations = locations.filter(item => savedIds.includes(item.id));

  if (savedLocations.length === 0) {
    return (
      <AppScreen eyebrow="Your Collection" title="Saved Locations">
        <View style={styles.empty}>
          <Image source={images.onboardingLocations} style={styles.emptyImage} />
          <Text style={styles.emptyTitle}>No saved locations yet</Text>
          <Text style={styles.emptyBody}>
            Explore locations and save your favourites
          </Text>
          <Button
            title="Go to Explore"
            onPress={() => openTab('explore')}
            style={styles.emptyButton}
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
    paddingTop: 70,
  },
  emptyImage: {
    width: '96%',
    maxWidth: 330,
    aspectRatio: 1,
    borderRadius: 22,
    marginBottom: 38,
    ...shadow,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyBody: {
    color: '#b5b5be',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 28,
  },
  emptyButton: {
    width: '100%',
  },
});
