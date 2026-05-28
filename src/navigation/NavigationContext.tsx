import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';
import {Route, TabKey} from '../types';

type NavigationValue = {
  route: Route;
  activeTab: TabKey;
  navigate: (route: Route) => void;
  openTab: (tab: TabKey) => void;
  goBack: (fallback?: Route) => void;
};

const initialRoute: Route = {name: 'explore'};

const NavigationContext = createContext<NavigationValue | undefined>(undefined);

const tabRoutes: Record<TabKey, Route> = {
  explore: {name: 'explore'},
  saved: {name: 'saved'},
  map: {name: 'map'},
  facts: {name: 'facts'},
  blog: {name: 'blog'},
  quiz: {name: 'quiz'},
};

function getTab(route: Route): TabKey {
  if (route.name === 'saved') {
    return 'saved';
  }
  if (route.name === 'map') {
    return 'map';
  }
  if (route.name === 'facts') {
    return 'facts';
  }
  if (route.name === 'blog' || route.name === 'blogDetail') {
    return 'blog';
  }
  if (route.name === 'quiz') {
    return 'quiz';
  }
  return 'explore';
}

export function NavigationProvider({children}: {children: ReactNode}) {
  const [stack, setStack] = useState<Route[]>([initialRoute]);
  const route = stack[stack.length - 1];
  const activeTab = getTab(route);

  const value = useMemo<NavigationValue>(
    () => ({
      route,
      activeTab,
      navigate: next => setStack(current => [...current, next]),
      openTab: tab => setStack([tabRoutes[tab]]),
      goBack: fallback =>
        setStack(current =>
          current.length > 1 ? current.slice(0, -1) : [fallback ?? initialRoute],
        ),
    }),
    [activeTab, route],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const value = useContext(NavigationContext);
  if (!value) {
    throw new Error('useNavigation must be used inside NavigationProvider');
  }
  return value;
}
