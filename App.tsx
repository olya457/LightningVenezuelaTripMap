import React from 'react';
import {AppNavigator} from './src/navigation/AppNavigator';
import {SavedLocationsProvider} from './src/storage/SavedLocationsContext';

function App(): React.JSX.Element {
  return (
    <SavedLocationsProvider>
      <AppNavigator />
    </SavedLocationsProvider>
  );
}

export default App;
