import * as React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import {PaperProvider} from 'react-native-paper';

import {name as appName} from './app.json';
import store from './store';
import App from './App';

export const theme = {
  colors: {
    primary: 'rgb(13, 37, 63)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(211, 228, 255)',
    onPrimaryContainer: 'rgb(0, 28, 56)',
    secondary: 'rgb(1, 180, 228)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(189, 233, 255)',
    onSecondaryContainer: 'rgb(0, 31, 42)',
    tertiary: 'rgb(144, 206, 161)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(152, 247, 182)',
    onTertiaryContainer: 'rgb(0, 33, 14)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(253, 252, 255)',
    onBackground: 'rgb(26, 28, 30)',
    surface: 'rgb(253, 252, 255)',
    onSurface: 'rgb(26, 28, 30)',
    surfaceVariant: 'rgb(223, 226, 235)',
    onSurfaceVariant: 'rgb(67, 71, 78)',
    outline: 'rgb(115, 119, 127)',
    outlineVariant: 'rgb(195, 198, 207)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 48, 51)',
    inverseOnSurface: 'rgb(241, 240, 244)',
    inversePrimary: 'rgb(162, 201, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(241, 244, 251)',
      level2: 'rgb(234, 240, 248)',
      level3: 'rgb(227, 235, 245)',
      level4: 'rgb(225, 233, 244)',
      level5: 'rgb(220, 230, 242)',
    },
    surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
    backdrop: 'rgba(44, 49, 55, 0.4)',
  },
};

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
