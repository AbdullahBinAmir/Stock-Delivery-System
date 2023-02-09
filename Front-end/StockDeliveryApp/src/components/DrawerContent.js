import React from 'react'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../global/Styles'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../features/auth/AuthSlice'
import { imageURL } from '../global/API_Source_URL'

export default function DrawerContent(props) {
    const {userInfo} = useSelector(state => state.user);
   // console.log(props.navigation)
    const dispatch=useDispatch()
    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={{height:150,backgroundColor:colors.buttons}}>
                   <Image
                        source={{uri:imageURL+userInfo.image}}
                        style={{height:80,width:80,borderRadius:40,marginHorizontal:25,marginVertical:10}}
                   />
                  <Text 
                  style={{padding:10,marginHorizontal:10,fontWeight:'bold',
                    fontSize:18,color:colors.cardbackground}}>{userInfo.name}</Text>
                </View>
                <View style={{flex:1,backgroundColor:colors.cardbackground,paddingTop:10}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{borderTopWidth:1,padding:20,borderTopColor:colors.grey2}}>
                <TouchableOpacity style={{paddingVertical:15,flexDirection:'row',paddingHorizontal:10}}
                 onPress={()=>{
                    dispatch(Logout())
                    props.navigation.replace('SignInScreen')
                }}
                >
                    <Icon name='sign-out' size={24} /> 
                    <Text style={{marginLeft:10,fontSize:16}}>SignOut</Text>
                </TouchableOpacity>    
            </View>
        </View>
    )
  }

