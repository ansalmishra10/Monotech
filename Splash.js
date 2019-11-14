import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text,ScrollView, View,NetInfo,FlatList,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import store from 'react-native-simple-store';

import NotifService from './NotifService';
import appConfig from './app.json';
import PushNotification from 'react-native-push-notification';
import { OfflineImage, OfflineImageStore } from 'react-native-image-offline';


import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import * as Progress from 'react-native-progress';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar';
import { Rating, AirbnbRating } from 'react-native-ratings';
import RNFetchBlob from 'react-native-fetch-blob'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
import Pdf from 'react-native-pdf';

const GLOBAL = require('./Global');
import { createStyles, maxHeight } from 'react-native-media-queries';

type Props = {};
export default class Splash extends Component<Props> {

static navigationOptions = {
          title: 'Reviews',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:200
          },
          header:null
      };





  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      name: '',
      email: '',
       message: '',
       status :'' ,
       loading : '',
       userid : '',
       reviews:[],      senderId: appConfig.senderID,

    }

}

onRegister(token) {
    AsyncStorage.setItem('token', token.token);
    GLOBAL._token= token.token
//        alert(GLOBAL._token)

    console.log( 'TOKEN:', token );
    this.setState({ registerToken: token.token, fcmRegistered: true });
  }

  onNotif=(notif)=> {
    console.log(notif);
        const {navigate} = this.props.navigation
    var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{

    if (e == '' || e == null ){
      alert('Please Login first to continue..')
         this.props.navigation.replace('Login')

    }else {
      GLOBAL.productid = notif.productID
      GLOBAL.userid = e
      replace("Detail")
    }

    })

//    navigate("Brand")
//    Alert.alert(notif.productID);

  }

  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }

  _keyExtractor = (item, index) => item.productID;

  renderRowItem = (itemData) => {

var linkss = itemData.item
    return (
      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    justifyContent: 'space-between',
    shadowRadius: 0.5,flexDirection:'column',
    shadowOpacity: 0.5, backgroundColor:'white',  width : 0.001 ,marginLeft : 10,marginRight:10,marginTop:10, marginBottom:1, elevation:1, height:0.001}}>

<Image style={{width:0.001, height:0.001,}}
source={{uri :linkss.toString()}}
/>
</View>
    )
  }

showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }

// getOFF =(responseJson)=>{
// //  alert(JSON.stringify(responseJson))
//
//        this.setState({reviews : responseJson.reviews})
//
// }
//
//   _handleStateChange = state => {
//    //alert('hoho')
//        NetInfo.isConnected.fetch().then(isConnected => {
//  // alert('First, is ' + (isConnected ? 'online' : 'offline'));
//   if(isConnected ==false){
//  var so = 'lre'+GLOBAL.productid
//   store.get(so) .then((res) => this.getOFF(res) )
//
//   }
//
// });
// function handleFirstConnectivityChange(isConnected) {
//  // alert('Then, is ' + (isConnected ? 'online' : 'offline'));
//   NetInfo.isConnected.removeEventListener(
//     'connectionChange',
//     handleFirstConnectivityChange
//   );
// }
// NetInfo.isConnected.addEventListener(
//   'connectionChange',
//   handleFirstConnectivityChange
// );
//
//    this.getReviews()
//  };

loadImage=()=>{
                  this.showLoading()

this.timeoutHandle = setTimeout(()=>{
     var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{

    if (e == '' || e == null ){
         this.props.navigation.replace('Login')
                  this.showLoading()

    }else {
       this.props.navigation.replace('DrawerNavigator')
    }

    })


  }, 5000);
         this.hideLoading()

}

componentDidMount(){
//  alert(GLOBAL.productid)
 //this.props.navigation.addListener('willFocus',this._handleStateChange);
 GLOBAL.loginmobile=''
  this.getReviews()
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));

}

   getReviews= () =>{
      this.showLoading();
      const url = GLOBAL.BASE_URL +  'whole_data_api'
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: '5'


  }),
}).then((response) => response.json())
    .then((responseJson) => {
//    alert(JSON.stringify(responseJson))

       this.hideLoading()
       if (responseJson.status == true) {
           store.update('brandsim',responseJson)
//           alert(responseJson.all_images.length)
           this.setState({ reviews: responseJson.all_images
            }, () =>  this.loadImage())
//           alert(sizeOf(this.state.reviews))
//          alert(responseJson.all_images[1])
//          AsyncStorage.setItem("imageUri", responseJson.all_images);
        store.update('allimagesarray',responseJson.all_images)

    //     OfflineImageStore.restore({
    //   name: 'My_Image_gallery',
    //   imageRemoveTimeout: 120, // expire image after 120 seconds, default is 3 days if you don't provide this property.
    //   debugMode: true,
    // }, () => {
    //   alert('Restore completed and callback called !');
    //   // Restore completed!!
    //   this.setState({ reStoreCompleted: true });

    //   // Preload images
    //   // Note: We recommend call this method on `restore` completion!
    //   OfflineImageStore.preLoad(responseJson.all_images);
    // });

//       AsyncStorage.setItem('imageUri', JSON.stringify(responseJson.all_images));

       }

    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
       var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{

    if (e == '' || e == null ){
         this.props.navigation.replace('Login')
                  this.showLoading()

    }else {
       this.props.navigation.replace('DrawerNavigator')
    }

    })
    });
    }

  render() {


    return (


    <View style={{flex:1, flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
        <Image style={{width:window.width, height:window.height,flex:1,position:'absolute', bottom:0, top:0}}
        source={require('./launch_screen.png')}/>

      <ActivityIndicator style = {{position: 'absolute',
            left: 0,
            right: 0,
            top: window.height/2,
            bottom: 0,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center'
}}

       size="large" color="#e41582"/>
          <FlatList style= {{backgroundColor:'transparent',}}
          data={this.state.reviews}
          numColumns={1}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          extraData={this.state}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={this.renderRowItem}
        />

             </View>

    );
  }
}
