import {Platform} from 'react-native';

export const colors = {
  bg: '#04060d',
  bgSoft: '#070b18',
  panel: '#0b1022',
  panelSoft: '#101735',
  border: '#18305c',
  borderStrong: '#2d75ff',
  blue: '#2d75ff',
  cyan: '#23d9f2',
  violet: '#8d39ff',
  yellow: '#ffd229',
  text: '#f2f6ff',
  muted: '#8290b4',
  dim: '#4f5b7e',
  danger: '#ff4b6e',
  green: '#20d66b',
};

export const layout = {
  pageX: 20,
  statusTopGap: 10,
  androidInset: Platform.OS === 'android' ? 30 : 0,
  tabGap: Platform.OS === 'android' ? 30 : 20,
  tabHeight: 70,
};

export function getNavigationMetrics(width: number, height: number) {
  const compact = height < 700 || width < 360;
  const tabHeight = compact ? 62 : layout.tabHeight;
  const tabGap = layout.tabGap;
  const pageX = compact ? 16 : layout.pageX;

  return {
    compact,
    pageX,
    tabGap,
    tabHeight,
    sideInset: compact ? 10 : 14,
    iconSize: compact ? 30 : 34,
    iconRadius: compact ? 12 : 13,
    iconFont: compact ? 16 : 18,
    labelFont: compact ? 9 : 10,
    contentBottom: tabHeight + tabGap + (compact ? 58 : 42),
  };
}

export const shadow = {
  shadowColor: colors.blue,
  shadowOpacity: 0.45,
  shadowRadius: 18,
  shadowOffset: {width: 0, height: 0},
  elevation: 8,
};
