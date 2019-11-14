import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,NetInfo,FlatList,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import store from 'react-native-simple-store';
import ImageZoom from 'react-native-image-pan-zoom';

import Button from 'react-native-button';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar';
import { Rating, AirbnbRating } from 'react-native-ratings';

import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
 class Gallery extends Component<Props> {



static navigationOptions = {
          title: 'Gallery',
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
       userid : '',photoZoom:GLOBAL.gallery

    }
}
  _keyExtractor = (item, index) => item.productID;

 

showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }

getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))

       this.setState({reviews : responseJson})

}

  _handleStateChange = state => {
   //alert('hoho')
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){

 this.getOFF(GLOBAL.review)

  }

});
function handleFirstConnectivityChange(isConnected) {
 // alert('Then, is ' + (isConnected ? 'online' : 'offline'));
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}
NetInfo.isConnected.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);

   this.getReviews()
 };


componentWillMount(){
//  alert(GLOBAL.productid)
 //this.props.navigation.addListener('willFocus',this._handleStateChange);

//  this.getReviews()
}

  _renderItem = ({item,index}) => {
//alert(item)
  return (
    <View style={{backgroundColor:'black'}}>
  <ImageZoom cropWidth={Dimensions.get('window').width}
                         cropHeight={Dimensions.get('window').height}
                         imageWidth={Dimensions.get('window').width}
                         imageHeight={Dimensions.get('window').height}
                        onSwipeDown ={()=>this._goback()}

                        swipeDownThreshold  ={230}
                         >
          <Image
            style={{ width: window.width , height: 250, position: 'absolute',top:window.height/4, resizeMode:'stretch' }}
            source={{ uri: item }}
          />

              </ImageZoom>

</View>

  )
}

  render() {

    return (
      <View style={{flex:1, backgroundColor:'black'}}>

            <FlatList
                 data={this.state.photoZoom}
                 numColumns={1}
                 horizontal={true}
                 keyExtractor = { (item, index) => index.toString() }
                 renderItem={this._renderItem}
                 extraData={this.state}
               />

      </View>



    );
  }
}
export default Gallery;
