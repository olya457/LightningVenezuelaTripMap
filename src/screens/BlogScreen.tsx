import React from 'react';
import {Image, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '../components/AppScreen';
import {articles} from '../data/blog';
import {useNavigation} from '../navigation/NavigationContext';
import {colors} from '../theme';

export function BlogScreen() {
  const {navigate} = useNavigation();
  const [featured, ...rest] = articles;

  return (
    <AppScreen eyebrow="Storm Journal" title="Blog">
      <Pressable
        onPress={() => navigate({name: 'blogDetail', articleId: featured.id})}
        style={styles.featured}>
        <ImageBackground source={featured.image} style={styles.featuredImage} imageStyle={styles.imageRadius}>
          <View style={styles.shade} />
          <View style={styles.tag}>
            <Text style={styles.tagText}>Featured</Text>
          </View>
        </ImageBackground>
        <View style={styles.featuredBody}>
          <Text style={styles.featuredTitle}>{featured.title}</Text>
          <Text numberOfLines={2} style={styles.subtitle}>
            {featured.subtitle}
          </Text>
          <Text style={styles.meta}>{featured.date}   {featured.readTime}</Text>
        </View>
      </Pressable>
      {rest.map(article => (
        <Pressable
          key={article.id}
          onPress={() => navigate({name: 'blogDetail', articleId: article.id})}
          style={styles.row}>
          <Image source={article.image} style={styles.rowImage} />
          <View style={styles.rowBody}>
            <Text numberOfLines={2} style={styles.rowTitle}>
              {article.title}
            </Text>
            <Text style={styles.rowMeta}>{article.date}   {article.readTime}</Text>
          </View>
          <Text style={styles.rowArrow}>›</Text>
        </Pressable>
      ))}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  featured: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featuredImage: {
    height: 190,
  },
  imageRadius: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  shade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
  },
  tag: {
    alignSelf: 'flex-start',
    margin: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(29, 97, 255, 0.24)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagText: {
    color: '#4f91ff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  featuredBody: {
    padding: 16,
  },
  featuredTitle: {
    color: colors.text,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    marginTop: 6,
  },
  meta: {
    color: colors.dim,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 12,
  },
  row: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.panel,
    marginBottom: 12,
    overflow: 'hidden',
  },
  rowImage: {
    width: 92,
    height: 82,
  },
  rowBody: {
    flex: 1,
    paddingHorizontal: 12,
  },
  rowTitle: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '900',
  },
  rowMeta: {
    color: colors.dim,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 6,
  },
  rowArrow: {
    color: colors.dim,
    fontSize: 26,
    paddingRight: 14,
  },
});
