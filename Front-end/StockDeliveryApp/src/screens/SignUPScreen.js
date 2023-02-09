import React, { useState } from 'react'
import { Text, StyleSheet, View, ScrollView,
   TouchableWithoutFeedback, TouchableOpacity, Keyboard, KeyboardAvoidingView, Button, Image } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import avatarImage from '../assets/avatar.png'
import DropDownPicker from 'react-native-dropdown-picker';
import { TextInput } from 'react-native-paper';
import { colors } from '../global/Styles';
import { useDispatch } from 'react-redux';
import { userRegistration } from '../features/auth/AuthSlice';

export default function SignUPScreen({navigation}) {

  const dispatch=useDispatch()

  const options={
      title:'Select Image',
      type:'library',
      options:{
        maxHeight:200,
        maxWidth:200,
        selectionLimit:1,
        mediaType:'photo',
        includeBase64:false
      }
   }

   const SaveUser=()=>{
      let data = new FormData()
      data.append('file', image)
      data.append('uname',name)
      data.append('uemail',emailAddress)
      data.append('upassword',password)
      data.append('baddress',baddress)
      data.append('ucity',city)
      data.append('umobileno',mno)
      data.append('userType',value)
      dispatch(userRegistration(data))
   }

  const openGallery=async ()=>{
      const result=await launchImageLibrary(options)
      setImagesrc(result.assets[0].uri)
      setImage({
        uri:result.assets[0].uri ,
        type: result.assets[0].type, 
        name:result.assets[0].fileName
      })
      console.log(result)
  }

  const [imgsrc,setImagesrc]=useState(Image.resolveAssetSource(avatarImage).uri)
  const [name,setName]=useState('')
  const [emailAddress,setEmailAddress]=useState('')
  const [password,setPassword]=useState('')
  const [mno,setMno]=useState('')
  const [city,setCity]=useState('')
  const [baddress,setBAddress]=useState('')
  const [image,setImage]=useState()

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'vendor', value: 'Vendor'},
    {label: 'distributor', value: 'Distributor'},
    {label: 'shopkeeper', value: 'ShopKeeper'}
  ]);

    return (

      <KeyboardAvoidingView style={styles.container} behavior={'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
                <Text style={styles.titleBarText}>Registration Form</Text>
            </View>
            <View style={{margin:10,justifyContent:'center',alignItems:'center'}}>
                <Image source={{uri:imgsrc}} style={{width:100,height:100}}/>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
                <Button title='upload image' onPress={openGallery}/>
            </View>
            <View style={styles.textInputView}>
                <TextInput 
                  style={styles.textInput} label='Enter Your Name' keyboardType='name-phone-pad'
                  mode='outlined' value={name} onChangeText={(t)=>setName(t)}
                />
                <TextInput 
                  style={styles.textInput} label='Enter Email Address' keyboardType='email-address'
                  mode='outlined' value={emailAddress} onChangeText={(t)=>setEmailAddress(t)}
                />
                <TextInput  
                  style={styles.textInput} label='Enter Mobile Number' keyboardType='number-pad'
                  mode='outlined' value={mno} onChangeText={(t)=>setMno(t)}
                />
                <TextInput 
                  style={styles.textInput} label='Enter City' keyboardType='name-phone-pad'
                  mode='outlined'  value={city} onChangeText={(t)=>setCity(t)}
                 />
                 <TextInput
                    style={styles.textInput} label='Enter Business Address' 
                    mode='outlined' value={baddress} onChangeText={(t)=>setBAddress(t)} keyboardType='name-phone-pad'
                  />
                <TextInput style={styles.textInput} label='Enter Password'  
                   mode='outlined' value={password} onChangeText={(t)=>setPassword(t)} keyboardType='default'
                />
                <View style={styles.dropdown}>
                  <Text style={styles.titleText}>Which describes You Best ?</Text>
                    <DropDownPicker
                     style={{borderColor:colors.buttons,padding:10,marginTop:open? 80 : null}}
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      listMode="SCROLLVIEW"
                      dropDownDirection='TOP'
                    />
                </View>
            </View>
            <View style={{alignItems:'center',justifyContent:'center',marginHorizontal:15,marginVertical:5}}>
              <TouchableOpacity style={styles.sButton} onPress={SaveUser}>
                <Text style={styles.btnText}>Sign UP</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{...styles.signin,marginVertical:25,padding:10}}
                onPress={()=>navigation.goBack()}
            >
                  <Text style={styles.signinText}>Login</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>  
      </KeyboardAvoidingView>
    )
  }

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.cardbackground
    },
    titleBar:{
        width:'100%',
        height:90,
        backgroundColor:colors.buttons,
        justifyContent:'center',
        alignItems:'center'
    },
    titleBarText:{
        fontSize:24,
        fontWeight:'bold',
        color:colors.cardbackground
    },
    textInputView:{
        margin:10,
        justifyContent:'center'
    },
    textInput:{
      fontSize:18,
      marginVertical:10,
      marginHorizontal:5
    },
    dropdown:{
      padding:10,
      margin:10,
      borderRadius:25,
      color:colors.grey2,
      fontSize:18,
  },
    sButton:{
        width:'100%',
        height:60,
        backgroundColor:colors.buttons,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
    },
    btnText:{
        fontSize:18,
        fontWeight:'bold',
        color:colors.cardbackground
    },
    signin:{
        alignItems:'center',
        margin:10,
        borderWidth:2,
        borderColor:colors.buttons,
        borderRadius:15,
        marginHorizontal:25,
        margin:10
    },
    signinText:{
        color:colors.buttons,
        fontSize:18,
        fontWeight:'bold'
    },
    titleText:{
      fontSize:16,
      color:colors.buttons,
      padding:10
  }
})
