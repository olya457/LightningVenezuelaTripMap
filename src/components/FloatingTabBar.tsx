import React from 'react';
import {Pressable, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {colors, getNavigationMetrics} from '../theme';
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
  const {width, height} = useWindowDimensions();
  const metrics = getNavigationMetrics(width, height);

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrap,
        {
          left: metrics.sideInset,
          right: metrics.sideInset,
          bottom: metrics.tabGap,
        },
      ]}>
      <View
        style={[
          styles.bar,
          metrics.compact ? styles.barCompact : styles.barRegular,
          {minHeight: metrics.tabHeight},
        ]}>
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
              <View
                style={[
                  styles.iconWrap,
                  {
                    width: metrics.iconSize,
                    height: metrics.iconSize,
                    borderRadius: metrics.iconRadius,
                  },
                  active && styles.activeIconWrap,
                ]}>
                <Text
                  style={[
                    styles.icon,
                    {fontSize: metrics.iconFont},
                    active && styles.activeIcon,
                  ]}>
                  {tab.emoji}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={[
                  styles.label,
                  {fontSize: metrics.labelFont},
                  active && styles.activeLabel,
                ]}>
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
  },
  bar: {
    backgroundColor: 'rgba(6, 9, 28, 0.96)',
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barRegular: {
    borderRadius: 26,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  barCompact: {
    borderRadius: 22,
    paddingHorizontal: 6,
    paddingVertical: 4,
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
    opacity: 0.5,
  },
  activeIcon: {
    opacity: 1,
  },
  label: {
    color: colors.dim,
    fontWeight: '800',
    marginTop: 1,
  },
  activeLabel: {
    color: '#4f91ff',
  },
});
