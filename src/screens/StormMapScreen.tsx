import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {AppScreen} from '../components/AppScreen';
import {LocationCard} from '../components/LocationCards';
import {locations} from '../data/locations';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';
import {StormLocation} from '../types';

const venezuelaRegion: Region = {
  latitude: 7.25,
  longitude: -66.45,
  latitudeDelta: 8.8,
  longitudeDelta: 12.5,
};

const markerColor: Record<StormLocation['markerType'], string> = {
  lightning: colors.blue,
  lake: colors.cyan,
  jungle: '#ad5cff',
};

const markerEmoji: Record<StormLocation['markerType'], string> = {
  lightning: '⚡',
  lake: '🌊',
  jungle: '🌴',
};

function regionFor(location: StormLocation): Region {
  return {
    latitude: location.coordinates.latitude,
    longitude: location.coordinates.longitude,
    latitudeDelta: 1.6,
    longitudeDelta: 2,
  };
}

export function StormMapScreen({
  selectedLocationId,
}: {
  selectedLocationId?: string;
}) {
  const {navigate} = useNavigation();
  const mapRef = useRef<MapView | null>(null);
  const initialLocation = useMemo(
    () =>
      selectedLocationId
        ? locations.find(item => item.id === selectedLocationId)
        : undefined,
    [selectedLocationId],
  );
  const initialRegion = useMemo(
    () => (initialLocation ? regionFor(initialLocation) : venezuelaRegion),
    [initialLocation],
  );
  const currentRegionRef = useRef<Region>(initialRegion);
  const [selectedId, setSelectedId] = useState(initialLocation?.id);
  const selected = useMemo(
    () => locations.find(item => item.id === selectedId),
    [selectedId],
  );

  const moveToRegion = useCallback((nextRegion: Region, duration = 280) => {
    currentRegionRef.current = nextRegion;
    mapRef.current?.animateToRegion(nextRegion, duration);
  }, []);

  useEffect(() => {
    if (selectedLocationId) {
      const nextLocation = locations.find(item => item.id === selectedLocationId);
      if (nextLocation) {
        setSelectedId(nextLocation.id);
        moveToRegion(regionFor(nextLocation));
      }
    }
  }, [moveToRegion, selectedLocationId]);

  const focusLocation = useCallback((location: StormLocation) => {
    const nextRegion = regionFor(location);
    setSelectedId(location.id);
    moveToRegion(nextRegion);
  }, [moveToRegion]);

  const zoom = useCallback((factor: number) => {
    const current = currentRegionRef.current;
    moveToRegion({
      ...current,
      latitudeDelta: Math.max(0.45, Math.min(13, current.latitudeDelta * factor)),
      longitudeDelta: Math.max(
        0.55,
        Math.min(16, current.longitudeDelta * factor),
      ),
    }, 180);
  }, [moveToRegion]);

  const resetMap = useCallback(() => {
    setSelectedId(undefined);
    moveToRegion(venezuelaRegion);
  }, [moveToRegion]);

  return (
    <AppScreen eyebrow="Live Storm Tracker" title="Storm Map" scroll={false}>
      <View style={styles.mapCard}>
        <MapView
          ref={mapRef}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          style={StyleSheet.absoluteFill}
          initialRegion={initialRegion}
          onRegionChangeComplete={nextRegion => {
            currentRegionRef.current = nextRegion;
          }}
          mapType="standard"
          userInterfaceStyle="dark"
          loadingEnabled
          loadingBackgroundColor={colors.bg}
          loadingIndicatorColor={colors.cyan}
          toolbarEnabled={false}
          showsCompass
          rotateEnabled={false}
          pitchEnabled={false}>
          {locations.map(location => (
            <StormMarker
              key={location.id}
              active={selectedId === location.id}
              location={location}
              onPress={focusLocation}
            />
          ))}
        </MapView>
        <View pointerEvents="none" style={styles.topShade} />
        <View style={styles.controls}>
          <Pressable onPress={() => zoom(0.55)} style={styles.controlButton}>
            <Text style={styles.controlText}>+</Text>
          </Pressable>
          <Pressable onPress={() => zoom(1.65)} style={styles.controlButton}>
            <Text style={styles.controlText}>−</Text>
          </Pressable>
          <Pressable onPress={resetMap} style={styles.controlButton}>
            <Text style={styles.resetText}>⌂</Text>
          </Pressable>
        </View>
        <View style={styles.legend}>
          <LegendDot color={colors.blue} label="Lightning Zone" />
          <LegendDot color={colors.cyan} label="Storm Lake" />
          <LegendDot color="#ad5cff" label="Jungle Storm" />
        </View>
        {selected ? (
          <View style={styles.selectedCard}>
            <Pressable
              hitSlop={12}
              onPress={() => setSelectedId(undefined)}
              style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </Pressable>
            <LocationCard
              compact
              location={selected}
              onPress={() =>
                navigate({name: 'locationDetail', locationId: selected.id})
              }
            />
          </View>
        ) : null}
      </View>
    </AppScreen>
  );
}

function LegendDot({color, label}: {color: string; label: string}) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, {backgroundColor: color}]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const StormMarker = React.memo(function StormMarker({
  active,
  location,
  onPress,
}: {
  active: boolean;
  location: StormLocation;
  onPress: (location: StormLocation) => void;
}) {
  const [tracksViewChanges, setTracksViewChanges] = useState(
    Platform.OS === 'android',
  );
  const color = markerColor[location.markerType];

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    setTracksViewChanges(true);
    const timeout = setTimeout(() => setTracksViewChanges(false), 250);

    return () => clearTimeout(timeout);
  }, [active]);

  const handlePress = useCallback(() => {
    onPress(location);
  }, [location, onPress]);

  return (
    <Marker
      coordinate={location.coordinates}
      title={location.title}
      description={location.place}
      onPress={handlePress}
      tracksViewChanges={
        Platform.OS === 'android' ? tracksViewChanges : undefined
      }>
      <View style={[styles.markerWrap, active && styles.markerWrapActive]}>
        <View style={[styles.markerGlow, {backgroundColor: color}]} />
        <View
          style={[
            styles.markerCore,
            {backgroundColor: color},
            active && styles.markerCoreActive,
          ]}>
          <Text style={styles.markerText}>
            {markerEmoji[location.markerType]}
          </Text>
        </View>
      </View>
    </Marker>
  );
});

const styles = StyleSheet.create({
  mapCard: {
    flex: 1,
    minHeight: 0,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#030916',
    overflow: 'hidden',
  },
  topShade: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 92,
    backgroundColor: 'rgba(3, 7, 18, 0.18)',
  },
  controls: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(7, 13, 31, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  controlText: {
    color: '#4f91ff',
    fontSize: 19,
    fontWeight: '900',
  },
  resetText: {
    color: '#4f91ff',
    fontSize: 18,
    fontWeight: '900',
  },
  markerWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerWrapActive: {
    transform: [{scale: 1.16}],
  },
  markerGlow: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    opacity: 0.2,
  },
  markerCore: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.72)',
  },
  markerCoreActive: {
    borderColor: colors.text,
  },
  markerText: {
    fontSize: 13,
  },
  legend: {
    position: 'absolute',
    left: 12,
    top: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(7, 13, 31, 0.88)',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  legendDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 7,
  },
  legendText: {
    color: '#b5c4e6',
    fontSize: 11,
    fontWeight: '800',
  },
  selectedCard: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 8,
    paddingTop: 2,
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: -10,
    width: 30,
    height: 30,
    borderRadius: 15,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(7, 13, 31, 0.96)',
  },
  closeText: {
    color: colors.text,
    fontSize: 22,
    lineHeight: 24,
    fontWeight: '800',
  },
});
