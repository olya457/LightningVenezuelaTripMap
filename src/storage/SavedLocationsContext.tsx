import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, ReactNode, useContext, useEffect, useMemo, useState} from 'react';

type SavedLocationsValue = {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
  removeSaved: (id: string) => void;
};

const STORAGE_KEY = 'stormAtlas.savedLocationIds';

const SavedLocationsContext = createContext<SavedLocationsValue | undefined>(
  undefined,
);

export function SavedLocationsProvider({children}: {children: ReactNode}) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value) {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            setSavedIds(parsed.filter(item => typeof item === 'string'));
          }
        }
      })
      .catch(() => undefined)
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (hydrated) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds)).catch(
        () => undefined,
      );
    }
  }, [hydrated, savedIds]);

  const value = useMemo<SavedLocationsValue>(
    () => ({
      savedIds,
      isSaved: id => savedIds.includes(id),
      toggleSaved: id =>
        setSavedIds(current =>
          current.includes(id)
            ? current.filter(item => item !== id)
            : [...current, id],
        ),
      removeSaved: id =>
        setSavedIds(current => current.filter(item => item !== id)),
    }),
    [savedIds],
  );

  return (
    <SavedLocationsContext.Provider value={value}>
      {children}
    </SavedLocationsContext.Provider>
  );
}

export function useSavedLocations() {
  const value = useContext(SavedLocationsContext);
  if (!value) {
    throw new Error('useSavedLocations must be used inside SavedLocationsProvider');
  }
  return value;
}
