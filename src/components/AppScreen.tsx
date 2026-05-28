import React, {ReactNode} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {colors, getNavigationMetrics, layout} from '../theme';

type AppScreenProps = {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  scroll?: boolean;
  noHorizontalPadding?: boolean;
};

export function AppScreen({
  eyebrow,
  title,
  children,
  scroll = true,
  noHorizontalPadding = false,
}: AppScreenProps) {
  const {width, height} = useWindowDimensions();
  const metrics = getNavigationMetrics(width, height);
  const contentStyle = [
    styles.content,
    {
      paddingHorizontal: noHorizontalPadding ? 0 : metrics.pageX,
      paddingBottom: metrics.contentBottom,
    },
    !scroll && styles.fill,
  ];

  const header = (eyebrow || title) && (
    <View style={[styles.header, metrics.compact && styles.headerCompact]}>
      {eyebrow ? (
        <Text style={[styles.eyebrow, metrics.compact && styles.eyebrowCompact]}>
          {eyebrow}
        </Text>
      ) : null}
      {title ? (
        <Text style={[styles.title, metrics.compact && styles.titleCompact]}>
          {title}
        </Text>
      ) : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentStyle}>
          {header}
          {children}
        </ScrollView>
      ) : (
        <View style={contentStyle}>
          {header}
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingTop: layout.androidInset + layout.statusTopGap,
  },
  content: {
  },
  fill: {
    flex: 1,
  },
  header: {
    marginTop: 14,
    marginBottom: 24,
  },
  headerCompact: {
    marginTop: 8,
    marginBottom: 16,
  },
  eyebrow: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  eyebrowCompact: {
    fontSize: 10,
    letterSpacing: 3,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    marginTop: 4,
  },
  titleCompact: {
    fontSize: 24,
    lineHeight: 29,
  },
});
