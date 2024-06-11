import {
  Dimensions,
  FlatList,
  Image,
  TouchableHighlight,
  View,
} from 'react-native';
import {DefaultScreenProps} from '../routes/defaultProps';
import {Card, Text} from 'react-native-paper';
import {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import api from '../util/api';

export const Home = ({navigation, route}: DefaultScreenProps) => {
  const [listMovies, setListMovies] = useState<any[]>([]);
  const [screenMode, setScreenMode] = useState('List');
  const idGuest = useRef(null);

  useEffect(() => {
    getAIdGuest();
  }, []);

  const getAIdGuest = async () => {
    await api
      .get('authentication/guest_session/new')
      .then(response => {
        idGuest.current = response.data.guest_session_id;
        getLisMovies();
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  const getLisMovies = async () => {
    await api
      .get('discover/movie')
      .then(response => {
        setListMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  };

  const renderItem = ({item}: any) => (
    <View
      style={{
        maxWidth: Dimensions.get('screen').width * 0.94,
        alignItems: 'stretch',
        alignSelf: 'center',
      }}>
      <Card mode="outlined">
        <TouchableHighlight
          key={item.key}
          onPress={() => {
            setScreenMode('Details');
          }}>
          <View
            style={{
              flexDirection: 'row',
              maxWidth: Dimensions.get('screen').width * 0.95,
              paddingStart: 20,
            }}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={{
                width: Dimensions.get('screen').width / 3,
                height: Dimensions.get('window').height / 3,
                resizeMode: 'center',
              }}
            />
            <View
              style={{
                padding: 30,
                alignContent: 'center',
                alignSelf: 'flex-start',
                maxWidth: Dimensions.get('screen').width * 0.6,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                }}>{`${item.original_title}`}</Text>
              <Text style={{fontSize: 12}}>{`${item.overview}`}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </Card>
    </View>
  );

  return screenMode == 'List' ? (
    <SafeAreaView style={{flex: 1}}>
      <Text
        style={{paddingStart: 20, paddingTop: 10, paddingBottom: 10}}
        variant="headlineLarge">
        Movies
      </Text>
      <FlatList
        data={listMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={{flex: 1}}>
      <Text
        style={{paddingStart: 20, paddingTop: 10, paddingBottom: 10}}
        variant="headlineLarge">
        Detail
      </Text>
    </SafeAreaView>
  );
};
