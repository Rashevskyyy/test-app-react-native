import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { GalleryComponent } from './src/components/GallaryComponent.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FullScreenImageView from './src/components/FullScreenImageView.tsx';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name='Gallery' component={GalleryComponent} />
          <Stack.Screen name='PhotoDetail' component={FullScreenImageView} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
