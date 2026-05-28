import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {LocationCard} from '../components/LocationCards';
import {locations} from '../data/locations';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';

type Percent = `${number}%`;

const markerPositions: Record<string, {left: Percent; top: Percent}> = {
  'lake-maracaibo': {left: '18%', top: '34%'},
  'catatumbo-river-mouth': {left: '13%', top: '38%'},
  'ologa-village': {left: '28%', top: '42%'},
  'congo-mirador': {left: '23%', top: '32%'},
  'sierra-de-perija': {left: '16%', top: '29%'},
  'merida-andes': {left: '45%', top: '56%'},
  'henri-pittier-storm': {left: '86%', top: '40%'},
  'orinoco-river': {left: '60%', top: '72%'},
  'canaima-national-park': {left: '78%', top: '68%'},
  'amazon-rainforest': {left: '68%', top: '78%'},
  'el-avila': {left: '82%', top: '34%'},
};

const markerColor = {
  lightning: colors.blue,
  lake: colors.cyan,
  jungle: '#ad5cff',
};

export function StormMapScreen({
  selectedLocationId,
}: {
  selectedLocationId?: string;
}) {
  const {navigate} = useNavigation();
  const firstSelected = selectedLocationId
    ? locations.find(item => item.id === selectedLocationId)
    : undefined;
  const [selectedId, setSelectedId] = useState(firstSelected?.id);
  const [zoom, setZoom] = useState(1);
  const selected = useMemo(
    () => locations.find(item => item.id === selectedId),
    [selectedId],
  );

  return (
    <AppScreen eyebrow="Live Storm Tracker" title="Storm Map" scroll={false}>
      <View style={styles.mapCard}>
        <View style={styles.controls}>
          <Pressable onPress={() => setZoom(value => Math.min(1.4, value + 0.1))} style={styles.controlButton}>
            <Text style={styles.controlText}>+</Text>
          </Pressable>
          <Pressable onPress={() => setZoom(value => Math.max(0.8, value - 0.1))} style={styles.controlButton}>
            <Text style={styles.controlText}>−</Text>
          </Pressable>
        </View>
        <View style={[styles.land, {transform: [{scale: zoom}]}]}>
          <View style={styles.landLineTop} />
          <View style={styles.landLineMid} />
          <View style={styles.landLineBottom} />
          <Text style={styles.country}>VENEZUELA</Text>
          {locations.slice(0, 16).map(location => {
            const position = markerPositions[location.id] ?? {
              left: `${18 + ((location.coordinates.longitude + 73) * 12) % 68}%` as Percent,
              top: `${24 + ((11 - location.coordinates.latitude) * 10) % 54}%` as Percent,
            };
            const active = selectedId === location.id;
            return (
              <Pressable
                key={location.id}
                onPress={() => setSelectedId(location.id)}
                style={[
                  styles.marker,
                  position,
                  {
                    backgroundColor: markerColor[location.markerType],
                    transform: [{scale: active ? 1.35 : 1}],
                  },
                ]}>
                <View style={styles.markerGlow} />
              </Pressable>
            );
          })}
        </View>
        <View style={styles.scale}>
          <View style={styles.scaleLine} />
          <Text style={styles.scaleText}>200 km</Text>
        </View>
        {selected ? (
          <View style={styles.selectedCard}>
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
      <View style={styles.legend}>
        <LegendDot color={colors.blue} label="Lightning Zone" />
        <LegendDot color={colors.cyan} label="Storm Lake" />
        <LegendDot color="#ad5cff" label="Jungle Storm" />
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

const styles = StyleSheet.create({
  mapCard: {
    flex: 1,
    minHeight: 460,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#030916',
    overflow: 'hidden',
  },
  controls: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 4,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  controlText: {
    color: '#4f91ff',
    fontSize: 18,
    fontWeight: '900',
  },
  land: {
    position: 'absolute',
    left: '7%',
    right: '7%',
    top: '23%',
    height: '52%',
    borderRadius: 120,
    borderWidth: 1,
    borderColor: 'rgba(45, 117, 255, 0.58)',
    backgroundColor: 'rgba(13, 41, 82, 0.34)',
  },
  landLineTop: {
    position: 'absolute',
    left: '5%',
    right: '10%',
    top: '22%',
    height: 1,
    backgroundColor: 'rgba(45, 117, 255, 0.22)',
  },
  landLineMid: {
    position: 'absolute',
    left: '20%',
    right: '18%',
    top: '50%',
    height: 1,
    backgroundColor: 'rgba(45, 117, 255, 0.16)',
  },
  landLineBottom: {
    position: 'absolute',
    left: '28%',
    right: '24%',
    bottom: '22%',
    height: 1,
    backgroundColor: 'rgba(45, 117, 255, 0.16)',
  },
  country: {
    position: 'absolute',
    left: '38%',
    top: '46%',
    color: 'rgba(79, 145, 255, 0.5)',
    fontWeight: '900',
    fontSize: 13,
  },
  marker: {
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(230, 244, 255, 0.45)',
  },
  markerGlow: {
    position: 'absolute',
    left: -10,
    right: -10,
    top: -10,
    bottom: -10,
    borderRadius: 20,
    backgroundColor: 'rgba(79, 145, 255, 0.08)',
  },
  scale: {
    position: 'absolute',
    left: 12,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scaleLine: {
    width: 48,
    height: 2,
    backgroundColor: '#4f91ff',
    marginRight: 9,
  },
  scaleText: {
    color: colors.dim,
    fontSize: 11,
    fontWeight: '800',
  },
  selectedCard: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 8,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
    marginBottom: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 7,
  },
  legendText: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '800',
  },
});
