import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Card, Icon, Text} from 'react-native-paper';
import {
  Dimensions,
  FlatList,
  Image,
  TouchableHighlight,
  View,
} from 'react-native';

import api from '../util/api';
import {FormatDate, accountId} from '../util/utils';
import {DefaultScreenProps} from '../routes/defaultProps';

export const FavoriteScreen = ({navigation}: DefaultScreenProps) => {
  const [loading, setLoading] = useState(true);
  const [listMovies, setListMovies] = useState<any[]>([]);

  useEffect(() => {
    getLisMovies();
  }, []);

  const getLisMovies = async () => {
    await api
      .get(`account/${accountId}/favorite/movies`)
      .then(response => {
        setListMovies(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  const renderItem = ({item}: any) => {
    const average = Math.trunc(item.vote_average * 100) / 100;
    const dateRelease = FormatDate(item.release_date);
    return (
      <View
        style={{
          alignItems: 'stretch',
          alignSelf: 'center',
        }}>
        <Card
          mode="outlined"
          style={{width: Dimensions.get('screen').width * 0.95}}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            key={item.key}
            onPress={() => {
              navigation.navigate('movieDetails', {item});
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
                    fontSize: 26,
                    fontWeight: '700',
                  }}>{`${item.original_title}`}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Icon source="star" size={20} />
                  <Text style={{fontSize: 16}}>{`${average}`}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon source="calendar-month" size={20} />
                  <Text style={{fontSize: 16}}>{`${dateRelease}`}</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        </Card>
      </View>
    );
  };

  return loading === false ? (
    <SafeAreaView style={{flex: 1}}>
      <Text
        style={{paddingStart: 20, paddingTop: 10, paddingBottom: 10}}
        variant="headlineLarge">
        Favorites
      </Text>
      <FlatList
        data={listMovies}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <ActivityIndicator animating={true} color={'gray'} />
    </SafeAreaView>
  );
};
