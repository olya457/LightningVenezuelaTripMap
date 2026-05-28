import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from '../components/Buttons';
import {AppScreen} from '../components/AppScreen';
import {CategoryCard} from '../components/LocationCards';
import {categories, getLocationsByCategory, locations} from '../data/locations';
import {useNavigation} from '../navigation/NavigationContext';

export function ExploreScreen() {
  const {navigate} = useNavigation();

  const openRandom = () => {
    const item = locations[Math.floor(Math.random() * locations.length)];
    navigate({name: 'locationDetail', locationId: item.id});
  };

  return (
    <AppScreen eyebrow="Venezuela Storm Atlas" title="Explore Locations">
      <View style={styles.list}>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            count={getLocationsByCategory(category.id).length}
            onPress={() => navigate({name: 'category', categoryId: category.id})}
          />
        ))}
      </View>
      <Button
        title="Show All Locations"
        emoji="◎"
        variant="ghost"
        onPress={() => navigate({name: 'category', categoryId: 'all'})}
        style={styles.action}
      />
      <Button
        title="Random Location"
        emoji="🔀"
        variant="ghost"
        onPress={openRandom}
        style={styles.action}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 4,
  },
  action: {
    marginTop: 12,
  },
});
