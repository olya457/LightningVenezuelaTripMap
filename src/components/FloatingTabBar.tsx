import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, layout} from '../theme';
import {TabKey} from '../types';
import {useNavigation} from '../navigation/NavigationContext';

const tabs: {key: TabKey; label: string; emoji: string}[] = [
  {key: 'explore', label: 'Explore', emoji: '📍'},
  {key: 'saved', label: 'Saved', emoji: '🔖'},
  {key: 'map', label: 'Map', emoji: '🗺️'},
  {key: 'facts', label: 'Facts', emoji: '⚡'},
  {key: 'blog', label: 'Blog', emoji: '📖'},
  {key: 'quiz', label: 'Quiz', emoji: '❔'},
];

export function FloatingTabBar() {
  const {activeTab, openTab} = useNavigation();

  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <View style={styles.bar}>
        {tabs.map(tab => {
          const active = activeTab === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => openTab(tab.key)}
              style={({pressed}) => [
                styles.item,
                pressed && styles.pressed,
              ]}>
              <View style={[styles.iconWrap, active && styles.activeIconWrap]}>
                <Text style={[styles.icon, active && styles.activeIcon]}>
                  {tab.emoji}
                </Text>
              </View>
              <Text style={[styles.label, active && styles.activeLabel]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 14,
    right: 14,
    bottom: layout.tabGap,
  },
  bar: {
    minHeight: layout.tabHeight,
    borderRadius: 26,
    backgroundColor: 'rgba(6, 9, 28, 0.96)',
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeIconWrap: {
    backgroundColor: '#102a59',
    borderColor: colors.borderStrong,
  },
  icon: {
    fontSize: 18,
    opacity: 0.5,
  },
  activeIcon: {
    opacity: 1,
  },
  label: {
    color: colors.dim,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 1,
  },
  activeLabel: {
    color: '#4f91ff',
  },
});
