import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FloatingTabBar} from '../components/FloatingTabBar';
import {BlogDetailScreen} from '../screens/BlogDetailScreen';
import {BlogScreen} from '../screens/BlogScreen';
import {CategoryListScreen} from '../screens/CategoryListScreen';
import {ExploreScreen} from '../screens/ExploreScreen';
import {FactsScreen} from '../screens/FactsScreen';
import {LocationDetailScreen} from '../screens/LocationDetailScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {QuizScreen} from '../screens/QuizScreen';
import {SavedScreen} from '../screens/SavedScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {StormMapScreen} from '../screens/StormMapScreen';
import {NavigationProvider, useNavigation} from './NavigationContext';

const ONBOARDING_KEY = 'stormAtlas.hasSeenOnboarding';

type Flow = 'splash' | 'onboarding' | 'app';

export function AppNavigator() {
  const [flow, setFlow] = useState<Flow>('splash');
  const [timerDone, setTimerDone] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), 5000);
    AsyncStorage.getItem(ONBOARDING_KEY)
      .then(value => setHasSeenOnboarding(value === 'true'))
      .catch(() => setHasSeenOnboarding(false));
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (timerDone && hasSeenOnboarding !== null) {
      setFlow(hasSeenOnboarding ? 'app' : 'onboarding');
    }
  }, [hasSeenOnboarding, timerDone]);

  const finishOnboarding = () => {
    AsyncStorage.setItem(ONBOARDING_KEY, 'true').finally(() => setFlow('app'));
  };

  if (flow === 'splash') {
    return <SplashScreen />;
  }

  if (flow === 'onboarding') {
    return <OnboardingScreen onFinish={finishOnboarding} />;
  }

  return (
    <NavigationProvider>
      <AppShell />
    </NavigationProvider>
  );
}

function AppShell() {
  const {route} = useNavigation();

  return (
    <View style={styles.root}>
      {route.name === 'explore' ? <ExploreScreen /> : null}
      {route.name === 'category' ? (
        <CategoryListScreen categoryId={route.categoryId} />
      ) : null}
      {route.name === 'locationDetail' ? (
        <LocationDetailScreen locationId={route.locationId} />
      ) : null}
      {route.name === 'saved' ? <SavedScreen /> : null}
      {route.name === 'map' ? (
        <StormMapScreen selectedLocationId={route.selectedLocationId} />
      ) : null}
      {route.name === 'facts' ? <FactsScreen /> : null}
      {route.name === 'blog' ? <BlogScreen /> : null}
      {route.name === 'blogDetail' ? (
        <BlogDetailScreen articleId={route.articleId} />
      ) : null}
      {route.name === 'quiz' ? <QuizScreen /> : null}
      <FloatingTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
