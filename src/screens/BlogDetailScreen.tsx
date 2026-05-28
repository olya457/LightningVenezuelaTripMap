import React from 'react';
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Button} from '../components/Buttons';
import {getArticle} from '../data/blog';
import {useNavigation} from '../navigation/NavigationContext';
import {colors, getNavigationMetrics, layout} from '../theme';

export function BlogDetailScreen({articleId}: {articleId: string}) {
  const {goBack} = useNavigation();
  const {width, height} = useWindowDimensions();
  const metrics = getNavigationMetrics(width, height);
  const article = getArticle(articleId);

  if (!article) {
    return null;
  }

  const shareArticle = () => {
    Share.share({
      title: article.title,
      message: `${article.title}\n${article.subtitle}`,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {paddingBottom: metrics.contentBottom},
        ]}>
        <ImageBackground
          source={article.image}
          style={[styles.hero, metrics.compact && styles.heroCompact]}>
          <View style={styles.heroShade} />
          <View style={styles.heroActions}>
            <Pressable onPress={() => goBack({name: 'blog'})} style={styles.topButton}>
              <Text style={styles.topButtonText}>‹ Blog</Text>
            </Pressable>
            <Pressable onPress={shareArticle} style={styles.roundButton}>
              <Text style={styles.roundButtonText}>🔗</Text>
            </Pressable>
          </View>
        </ImageBackground>
        <View style={[styles.body, {paddingHorizontal: metrics.pageX}]}>
          <View style={styles.tags}>
            {article.tags.map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.title, metrics.compact && styles.titleCompact]}>
            {article.title}
          </Text>
          <Text style={styles.meta}>{article.date}   {article.readTime}</Text>
          <View style={styles.divider} />
          {article.body.map(paragraph => (
            <Text key={paragraph} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
          <Button
            title="Share Article"
            emoji="🔗"
            variant="ghost"
            onPress={shareArticle}
            style={styles.shareButton}
          />
        </View>
      </ScrollView>
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
  hero: {
    height: 250,
  },
  heroCompact: {
    height: 214,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.46)',
  },
  heroActions: {
    marginTop: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topButton: {
    borderRadius: 18,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: 'rgba(7, 13, 31, 0.78)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  topButtonText: {
    color: '#4f91ff',
    fontWeight: '900',
    fontSize: 15,
  },
  roundButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(7, 13, 31, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonText: {
    fontSize: 18,
  },
  body: {
    marginTop: -22,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: 'rgba(29, 97, 255, 0.2)',
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#4f91ff',
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '900',
  },
  titleCompact: {
    fontSize: 21,
    lineHeight: 27,
  },
  meta: {
    color: colors.cyan,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#102044',
    marginVertical: 18,
  },
  paragraph: {
    color: '#aab8d8',
    fontSize: 16,
    lineHeight: 27,
    fontWeight: '600',
    marginBottom: 18,
  },
  shareButton: {
    marginTop: 12,
  },
});
