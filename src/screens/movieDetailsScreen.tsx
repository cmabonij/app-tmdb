import {Dimensions, Image, View} from 'react-native';
import {DefaultScreenProps} from '../routes/defaultProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Card, Icon, Text} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import {FormatDate} from '../util/utils';
import api from '../util/api';
import {useState} from 'react';

export const MovieDetailsScreen = ({navigation}: DefaultScreenProps) => {
  const route = useRoute();
  const {params} = route;
  const {item}: any = params;
  const average = Math.trunc(item.vote_average * 100) / 100;
  const dateRelease = FormatDate(item.release_date);
  const [loading, setLoading] = useState(true);
  const accountId = 21317909;

  const setFavoriteList = async () => {
    const body = {media_type: 'movie', media_id: 550, favorite: true};
    await api
      .post(`account/${accountId}/favorite`, body)
      .then(response => {
        console.log(response.status)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  };

  const setWatchList = async () => {
    await api
    .get(`account/${accountId}/favorite/movies`)
    .then(response => {
      console.log(response.data)
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
      setLoading(false);
    });
  } 

  return (
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
        <Button style={{bottom: 10}} mode="contained" onPress={() => {
          console.log("PASSOU");
          setFavoriteList();
          }}>
          Add Favorite
        </Button>
        <Button mode="outlined" onPress={() => {setWatchList();}}>
          Add Watchlist
        </Button>
      </View>
    </SafeAreaView>
  );
};
