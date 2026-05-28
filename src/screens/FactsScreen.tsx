import React, {useMemo, useState} from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {Button} from '../components/Buttons';
import {factCategories, facts, getFactsByCategory} from '../data/facts';
import {colors, shadow} from '../theme';

export function FactsScreen() {
  const [categoryId, setCategoryId] = useState('lightning');
  const categoryFacts = getFactsByCategory(categoryId);
  const [factId, setFactId] = useState(categoryFacts[0]?.id);
  const currentFact = useMemo(
    () => facts.find(fact => fact.id === factId) ?? categoryFacts[0],
    [categoryFacts, factId],
  );
  const index = categoryFacts.findIndex(fact => fact.id === currentFact.id);

  const selectCategory = (nextCategoryId: string) => {
    const nextFacts = getFactsByCategory(nextCategoryId);
    setCategoryId(nextCategoryId);
    setFactId(nextFacts[0]?.id);
  };

  const randomFact = () => {
    const item = categoryFacts[Math.floor(Math.random() * categoryFacts.length)];
    setFactId(item.id);
  };

  const shareFact = () => {
    Share.share({
      title: currentFact.title,
      message: `${currentFact.title}\n${currentFact.body}`,
    });
  };

  return (
    <AppScreen eyebrow="Did You Know" title="Facts">
      <View style={styles.tabs}>
        {factCategories.map(category => {
          const active = category.id === categoryId;
          return (
            <Pressable
              key={category.id}
              onPress={() => selectCategory(category.id)}
              style={[styles.tab, active && styles.activeTab]}>
              <Text style={[styles.tabText, active && styles.activeTabText]}>
                {category.emoji} {category.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.feature}>
        <View style={styles.factIcon}>
          <Text style={styles.factIconText}>
            {factCategories.find(item => item.id === categoryId)?.emoji}
          </Text>
        </View>
        <Text style={styles.count}>
          {index + 1}/{categoryFacts.length}
        </Text>
        <Text style={styles.factBody}>{currentFact.body}</Text>
      </View>
      <View style={styles.factList}>
        {categoryFacts.map(fact => (
          <Pressable
            key={fact.id}
            onPress={() => setFactId(fact.id)}
            style={[
              styles.factRow,
              fact.id === currentFact.id && styles.activeFactRow,
            ]}>
            <Text
              numberOfLines={2}
              style={[
                styles.factRowText,
                fact.id === currentFact.id && styles.activeFactRowText,
              ]}>
              ⚡ {fact.body}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.actions}>
        <Button
          title="Share Fact"
          emoji="🔗"
          variant="ghost"
          onPress={shareFact}
          style={styles.action}
        />
        <Button
          title="Random"
          emoji="🔀"
          variant="ghost"
          onPress={randomFact}
          style={styles.action}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    paddingHorizontal: 7,
  },
  activeTab: {
    borderColor: colors.borderStrong,
    backgroundColor: '#0d244f',
  },
  tabText: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '900',
  },
  activeTabText: {
    color: '#4f91ff',
  },
  feature: {
    minHeight: 218,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    padding: 22,
    marginBottom: 18,
    ...shadow,
  },
  factIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f1a38',
  },
  factIconText: {
    fontSize: 27,
  },
  count: {
    position: 'absolute',
    top: 24,
    right: 24,
    color: '#4f91ff',
    fontWeight: '900',
  },
  factBody: {
    color: '#aab8d8',
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '600',
    marginTop: 24,
  },
  factList: {
    marginBottom: 28,
  },
  factRow: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#101b3a',
    backgroundColor: '#080c1d',
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 10,
  },
  activeFactRow: {
    borderColor: colors.border,
    backgroundColor: colors.panel,
  },
  factRowText: {
    color: colors.dim,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '800',
  },
  activeFactRowText: {
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    marginRight: 12,
  },
});
