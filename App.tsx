import {useEffect, useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import {
  Button,
  Card,
  DefaultTheme,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from './src/screens/homeScreen';
import {MovieDetailsScreen} from './src/screens/movieDetailsScreen';
import api from './src/util/api';

const Stack = createNativeStackNavigator();

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [screen, setScreen] = useState('Login');
  const theme = useTheme();

  const onPressOspite = () => {
    setScreen('Menu');
  };

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      {screen != 'Login' ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen
              name="movieDetails"
              options={{
                title: 'Movie Details',
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.onPrimary,
                headerTitleAlign: 'center',
              }}>
              {({navigation}) => (
                <MovieDetailsScreen navigation={navigation} route={'home'} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="home"
              options={{
                title: 'Home',
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.onPrimary,
                headerTitleAlign: 'center',
              }}>
              {({navigation}) => (
                <HomeScreen navigation={navigation} route={'home'} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="favorite"
              options={{
                title: 'Favorites',
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.onPrimary,
                headerTitleAlign: 'center',
              }}>
              {({navigation}) => (
                <HomeScreen navigation={navigation} route={'home'} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="watchlist"
              options={{
                title: 'Watchlist',
                headerStyle: {
                  backgroundColor: theme.colors.primary,
                },
                headerTintColor: theme.colors.onPrimary,
                headerTitleAlign: 'center',
              }}>
              {({navigation}) => (
                <HomeScreen navigation={navigation} route={'home'} />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Card.Content>
          <View style={{paddingTop: 50}}>
            <Image
              style={{
                width: Dimensions.get('screen').width / 3,
                height: Dimensions.get('window').height / 3,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tmdb.new.logo.svg/1280px-Tmdb.new.logo.svg.png',
              }}
            />
          </View>
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            mode="outlined"
            label="Senha"
            value={password}
            onChangeText={password => setPassword(password)}
          />
          <View style={{paddingTop: 20}}>
            <Button mode="contained" onPress={() => {}}>
              Login
            </Button>
          </View>
          <View style={{paddingTop: 5}}>
            <Button
              mode="outlined"
              onPress={() => {
                onPressOspite();
              }}>
              Accedere come ospite
            </Button>
          </View>
        </Card.Content>
      )}
    </View>
  );
}
