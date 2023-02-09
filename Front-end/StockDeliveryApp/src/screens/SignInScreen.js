import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Login, userLogin} from '../features/auth/AuthSlice';
import { globalAPI } from '../global/API_Source_URL';
import {colors} from '../global/Styles';

export default function SignInScreen({navigation}) {
  const [passView, setPassView] = useState(true);
  //const [makeLogin, setMakeLogin] = useState(false);
  const [passText, setPassText] = useState('Show');
  const [emailAddress, setEmailAddress] = useState('');
  //const [userData, setUserData] = useState([]);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {isLoading,userInfo} = useSelector(state => state.user);

  const handleLogin=async ()=>{
      const data= await dispatch(userLogin({ emailAddress: emailAddress,password: password})).unwrap()
      //console.log(data)
      if(data){
     // console.log(userInfo)
      data?.roles === 'Vendor'
      ? navigation.navigate('VendorDrawer')
      : data?.roles === 'Distributor'
      ? navigation.navigate('DistributorDrawer')
      : data?.roles === 'ShopKeeper'
      ? navigation.navigate('ShopkeeperDrawer')
      : data?.roles === 'Admin'
      ? navigation.navigate('AdminDrawer')
      : alert('user not found')
    }
  }

{/*     dispatch(userLogin({ emailAddress: emailAddress,password: password}))
    .then(() => {
      //console.log(data)
      console.log(userInfo)
        userInfo?.roles === 'Vendor'
      ? navigation.navigate('VendorDrawer')
      : userInfo?.roles === 'Distributor'
      ? navigation.navigate('DistributorDrawer')
      : userInfo?.roles === 'ShopKeeper'
      ? navigation.navigate('ShopkeeperDrawer')
      : userInfo?.roles === 'Admin'
      ? navigation.navigate('AdminDrawer')
      : alert('User not found..');
    }) */}

{/*   useEffect( ()=>{
    fetch(globalAPI + `/users/getusers`)
    .then(response=>response.json())
    .then(data=>setUserData(data))
  },[]) */}

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator visible={true} />
      </View>
    );
  } 

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Image
              source={require('../assets/sd-cover.jpg')}
              style={styles.imageStyle}
              resizeMode={'cover'}
          />
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              label="Enter Email Address"
              keyboardType="email-address"
              selectionColor="black"
              mode="outlined"
              value={emailAddress}
              onChangeText={t => setEmailAddress(t)}
            />
            <TextInput
              style={styles.textInput}
              label="Enter Password"
              secureTextEntry={passView}
              mode="outlined"
              value={password}
              onChangeText={t => setPassword(t)}
            />
          </View>
          <View style={styles.textInputView}>
            <Text
              style={{
                marginHorizontal: 20,
                color: colors.buttons,
                textDecorationLine: 'underline',
              }}
              onPress={() => {
                passView ? setPassText('Hide') : setPassText('Show');
                setPassView(!passView);
              }}>
              {passText} Password
            </Text>
          </View>
          <View
            style={{
              margin: 10,
            }}>
            <TouchableOpacity
              style={styles.sButton}
              onPress={handleLogin} >
              <Text style={styles.btnText}>Sign IN</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginHorizontal:10}}>
            <TouchableOpacity
              style={styles.signup}
              onPress={() => navigation.navigate('SignUpScreen')}>
              <Text style={styles.signupText}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  container: {
    flex: 1,
    backgroundColor: colors.cardbackground,
  },
  titleBar: {
    width: '100%',
    height: 90,
    backgroundColor: colors.buttons,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.cardbackground,
  },
  title: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
  titleText: {
    fontSize: 20,
    color: colors.buttons,
  },
  textInputView: {
    margin: 5,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  sButton: {
    width:'100%',
    padding:10,
    backgroundColor: colors.buttons,
    borderRadius: 15,
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.cardbackground,
    textTransform:'uppercase',
    textAlign:'center'
  },
  signup: {
    width:'100%',
    padding: 5,
    borderWidth: 2,
    borderColor: colors.buttons,
    borderRadius: 15,
  },
  signupText: {
    color: colors.buttons,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform:'uppercase',
    textAlign:'center'
  },
  imageStyle: {
    width: '100%',
    height: 300,
  },
});

// emailAddress=='distributor'?navigation.navigate('DistributorDrawer')
//                 :navigation.navigate('VendorDrawer')
