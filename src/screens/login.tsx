import {useNavigation} from '@react-navigation/native';
import {Button, View} from 'react-native';
import {DefaultScreenProps} from '../routes/defaultProps';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Login = ({navigation, route}: DefaultScreenProps) => {
  return (
    <View style={{flex: 1}}>
      <Button title="Login" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};
