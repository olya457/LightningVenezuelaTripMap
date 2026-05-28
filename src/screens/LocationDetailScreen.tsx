import React from 'react';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button} from '../components/Buttons';
import {getLocation} from '../data/locations';
import {useNavigation} from '../navigation/NavigationContext';
import {useSavedLocations} from '../storage/SavedLocationsContext';
import {colors, layout} from '../theme';

export function LocationDetailScreen({locationId}: {locationId: string}) {
  const {goBack, navigate} = useNavigation();
  const {isSaved, toggleSaved} = useSavedLocations();
  const location = getLocation(locationId);

  if (!location) {
    return null;
  }

  const saved = isSaved(location.id);

  const shareLocation = () => {
    Share.share({
      title: location.title,
      message: `${location.title}\n${location.place}\n${location.description}`,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <ImageBackground source={location.image} style={styles.hero}>
          <View style={styles.heroShade} />
          <View style={styles.heroActions}>
            <Pressable onPress={() => goBack({name: 'explore'})} style={styles.topButton}>
              <Text style={styles.topButtonText}>‹ Back</Text>
            </Pressable>
            <Pressable onPress={shareLocation} style={styles.roundButton}>
              <Text style={styles.roundButtonText}>🔗</Text>
            </Pressable>
          </View>
        </ImageBackground>
        <View style={styles.body}>
          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{location.tag}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Natural Wonder</Text>
            </View>
          </View>
          <Text style={styles.title}>{location.title}</Text>
          <Text style={styles.place}>◎ {location.place}</Text>
          <View style={styles.coordinates}>
            <Text style={styles.coordinatesText}>
              🧭 {Math.abs(location.coordinates.latitude).toFixed(4)}° N,{' '}
              {Math.abs(location.coordinates.longitude).toFixed(4)}° W
            </Text>
          </View>
          <Text style={styles.description}>{location.description}</Text>
          <View style={styles.actionRow}>
            <Button
              title={saved ? 'Saved' : 'Save'}
              emoji={saved ? '💙' : '♡'}
              variant={saved ? 'cyan' : 'ghost'}
              onPress={() => toggleSaved(location.id)}
              style={styles.rowButton}
            />
            <Button
              title="Share"
              emoji="🔗"
              variant="ghost"
              onPress={shareLocation}
              style={styles.rowButton}
            />
          </View>
          <Button
            title="Open in Map"
            emoji="🗺️"
            onPress={() => navigate({name: 'map', selectedLocationId: location.id})}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: layout.androidInset,
  },
  content: {
    paddingBottom: layout.tabHeight + layout.tabGap + 30,
  },
  hero: {
    height: 282,
    justifyContent: 'flex-start',
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  heroActions: {
    marginTop: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topButton: {
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: 'rgba(7, 13, 31, 0.78)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  topButtonText: {
    color: '#4f91ff',
    fontWeight: '900',
    fontSize: 15,
  },
  roundButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(7, 13, 31, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonText: {
    fontSize: 18,
  },
  body: {
    paddingHorizontal: 20,
    marginTop: -36,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(29, 97, 255, 0.18)',
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#4f91ff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: colors.text,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '900',
  },
  place: {
    color: colors.dim,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 6,
  },
  coordinates: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  coordinatesText: {
    color: colors.cyan,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '600',
    marginTop: 18,
    marginBottom: 22,
  },
  actionRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  rowButton: {
    flex: 1,
    marginRight: 10,
  },
});
