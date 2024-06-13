import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {Dimensions, Image, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Button, Icon, Text} from 'react-native-paper';

import api from '../util/api';
import {FormatDate, accountId} from '../util/utils';
import {DefaultScreenProps} from '../routes/defaultProps';

export const MovieDetailsScreen = ({navigation}: DefaultScreenProps) => {
  const route = useRoute();
  const {params} = route;
  const {item}: any = params;
  const idMovie = item.id;
  const average = Math.trunc(item.vote_average * 100) / 100;
  const dateRelease = FormatDate(item.release_date);
  const [loading, setLoading] = useState(true);
  const idSession = useSelector(state => state.idSession);
  const [favoriteButton, setFavoriteButton] = useState('Add Favorite');
  const [watchlistButton, setWatchlistButton] = useState('Add Watchlist');

  useEffect(() => {
    getStatusMovie();
  }, []);

  const getStatusMovie = async () => {
    await api
      .get(`movie/${idMovie}/account_states`)
      .then(response => {
        setFavoriteButton(
          response.data.favorite === false ? 'Add Favorite' : 'Remove Favorite',
        );
        setWatchlistButton(
          response.data.watchlist === false
            ? 'Add Watchlist'
            : 'Remove Watchlist',
        );
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  const setFavoriteList = async () => {
    const body = {
      media_type: 'movie',
      media_id: idMovie,
      favorite: favoriteButton === 'Add Favorite',
      session_id: idSession,
    };
    await api
      .post(`account/${accountId}/favorite`, body)
      .then(response => {
        console.log(response.data);
        setFavoriteButton(
          favoriteButton === 'Add Favorite'
            ? 'Remove Favorite'
            : 'Add Favorite',
        );
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  const setWatchList = async () => {
    const body = {
      media_type: 'movie',
      media_id: idMovie,
      watchlist: watchlistButton === 'Add Watchlist' ? true : false,
      session_id: idSession,
    };
    await api
      .post(`account/${accountId}/watchlist`, body)
      .then(response => {
        console.log(response.data);
        setWatchlistButton(
          watchlistButton === 'Add Watchlist'
            ? 'Remove Watchlist'
            : 'Add Watchlist',
        );
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  return loading === false ? (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          maxWidth: Dimensions.get('screen').width * 0.94,
          alignItems: 'stretch',
          alignSelf: 'center',
        }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path}`,
          }}
          style={{
            width: Dimensions.get('screen').width * 0.94,
            height: Dimensions.get('screen').height / 5,
          }}
        />
        <Text
          style={{
            fontSize: 36,
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
        <Text
          style={{
            fontSize: 18,
            textAlign: 'justify',
          }}>{`${item.overview}`}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: '90%',
          alignSelf: 'center',
        }}>
        <Button
          style={{bottom: 10}}
          mode="contained"
          onPress={() => {
            setFavoriteList();
          }}>
          {favoriteButton}
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            setWatchList();
          }}>
          {watchlistButton}
        </Button>
      </View>
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
