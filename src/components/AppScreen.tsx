import React, {ReactNode} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors, layout} from '../theme';

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
  const contentStyle = [
    styles.content,
    !scroll && styles.fill,
    noHorizontalPadding && styles.noHorizontalPadding,
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      {scroll ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentStyle}>
          {(eyebrow || title) && (
            <View style={styles.header}>
              {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
              {title ? <Text style={styles.title}>{title}</Text> : null}
            </View>
          )}
          {children}
        </ScrollView>
      ) : (
        <View style={contentStyle}>
          {(eyebrow || title) && (
            <View style={styles.header}>
              {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
              {title ? <Text style={styles.title}>{title}</Text> : null}
            </View>
          )}
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
    paddingTop: layout.androidInset,
  },
  content: {
    paddingHorizontal: layout.pageX,
    paddingBottom: layout.tabHeight + layout.tabGap + 28,
  },
  fill: {
    flex: 1,
  },
  noHorizontalPadding: {
    paddingHorizontal: 0,
  },
  header: {
    marginTop: 14,
    marginBottom: 24,
  },
  eyebrow: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    marginTop: 4,
  },
});
