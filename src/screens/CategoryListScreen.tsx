import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {LocationCard} from '../components/LocationCards';
import {categories, getCategory, getLocationsByCategory, locations} from '../data/locations';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';

export function CategoryListScreen({categoryId}: {categoryId: string}) {
  const {goBack, navigate} = useNavigation();
  const category = getCategory(categoryId);
  const items = categoryId === 'all' ? locations : getLocationsByCategory(categoryId);
  const title = category?.title ?? 'All Locations';

  return (
    <AppScreen scroll>
      <View style={styles.header}>
        <Pressable onPress={() => goBack({name: 'explore'})} style={styles.back}>
          <Text style={styles.backText}>‹ Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.backSpace} />
      </View>
      <Text style={styles.count}>
        {items.length} locations found
      </Text>
      {categoryId === 'all' ? (
        <View style={styles.categoryRow}>
          {categories.map(item => (
            <View key={item.id} style={styles.categoryPill}>
              <Text style={styles.categoryPillText}>{item.emoji} {item.title}</Text>
            </View>
          ))}
        </View>
      ) : null}
      {items.map(item => (
        <LocationCard
          key={item.id}
          location={item}
          onPress={() => navigate({name: 'locationDetail', locationId: item.id})}
        />
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    minWidth: 76,
    paddingVertical: 8,
  },
  backText: {
    color: '#4f91ff',
    fontSize: 16,
    fontWeight: '800',
  },
  backSpace: {
    width: 76,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  count: {
    color: colors.dim,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 16,
  },
  categoryRow: {
    marginBottom: 12,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 11,
    paddingVertical: 7,
    marginBottom: 8,
  },
  categoryPillText: {
    color: colors.muted,
    fontWeight: '800',
    fontSize: 12,
  },
});
