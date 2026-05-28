import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-maps', () => {
  const ReactMock = require('react');
  const {View} = require('react-native');
  const MockMap = ({children}: {children?: unknown}) =>
    ReactMock.createElement(View, null, children);
  const MockChild = ({children}: {children?: unknown}) =>
    ReactMock.createElement(View, null, children);
  const MockNull = () => null;

  return {
    __esModule: true,
    default: MockMap,
    Marker: MockChild,
    UrlTile: MockNull,
    PROVIDER_GOOGLE: 'google',
  };
});

test('renders correctly', async () => {
  jest.useFakeTimers();
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(async () => {
    renderer = ReactTestRenderer.create(<App />);
    await Promise.resolve();
  });

  await ReactTestRenderer.act(async () => {
    renderer?.unmount();
  });

  jest.useRealTimers();
});
