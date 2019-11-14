import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  NetInfo,
  Linking,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styles from './Style.js';
import store from 'react-native-simple-store';
import PropTypes from 'prop-types';
import Button from 'react-native-button';
import MaterialTabs from 'react-native-material-tabs';
import Carousel from 'react-native-banner-carousel';
import ImageCarousel from 'react-native-image-carousel';
import AutoHeightWebView from 'react-native-autoheight-webview'
import ImageZoom from 'react-native-image-pan-zoom';
import { OfflineImage, OfflineImageStore } from 'react-native-image-offline';
import Pdf from 'react-native-pdf';


const GLOBAL = require('./Global');
import HTML from 'react-native-render-html';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');
const BannerWidth =  width-10 ;
const BannerHeight = 200;

const equalWidth =  (width -20 )

 class Detail extends Component {
 renderPage(image, index) {
        return (
            <TouchableOpacity key={index} onPress={()=>this.openGallery()}>

                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }} source={{ uri: image }} />

            </TouchableOpacity>
        );
    }

   openGallery=(item)=>{
      GLOBAL.gallery= this.state.moviesList
      this.props.navigation.navigate('Gallery')
   }

 renderPageOff(image, index) {
        return (
            <View key={index}>
            <ImageZoom cropWidth={BannerWidth}
                       cropHeight={BannerHeight}
                       imageWidth={BannerWidth}
                       imageHeight={BannerHeight}>
 {this.state.offlineProductid==1 && (
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }} source={require('./a.jpg')} />

  )}
                         <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }} source={require('./b.jpg')} />

            </ImageZoom>
            </View>
        );
    }


 static navigationOptions =({navigation})=> ({
          title: 'Product Details',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 18,
            width:200
          },
      });





  setTab = selectedTab => {
   //alert(JSON.stringify(this.state.htmlArray[selectedTab]))
    this.setState({ selectedTab :selectedTab})

  }

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      name : '',
      subtitle :'',
      broucher :'',
      selectedTab :0,
      myItem :[],
      htmlArray :[],
      reviews:'',
      moviesList: [], isOffline:0,
      offlineProductid:GLOBAL.productid
    }
//    alert(GLOBAL.productid)
  }

  _keyExtractor = (item, index) => item.id;

  renderRowItem = (itemData) => {
    return (

      <View style={{  flexDirection: 'row',flex : 1, backgroundColor:'white',height: 150,borderRadius:20,  width : equalWidth ,margin : 10}}>
      <Image
          style={{ width: 100, height : 130,marginTop :10,marginLeft :10 }}
          source={{ uri: itemData.item.image }}
        />

     <View style={{ flex: 1, alignSelf: 'auto' }}>
          <Text style={{ fontSize: 20, margin: 6 }}>{itemData.item.date}</Text>
          <Text style={{  margin: 15 }}>{itemData.item.title}</Text>
          <Text style={{  margin: 15 }}>{itemData.item.title}</Text>
        </View>
      </View>

    )
  }

getOFF =(responseJson)=>{

//alert(JSON.stringify(responseJson.images))
//     alert(JSON.stringify( GLOBAL.review))

// var aasd=[]
// aasd =  AsyncStorage.getItem("imageUri");
// alert(JSON.parse(aasd))
this.showLoading()
this.timeoutCheck = setTimeout(() => {
//   this.setTimePassed();
     GLOBAL.review = responseJson.reviews
    this.setState({isOffline:1})
      this.setState({ moviesList: responseJson.images})
      this.setState({ name: responseJson.product_name})
      this.setState({ subtitle: responseJson.product_caption})
      this.setState({ htmlArray: responseJson.receive_array_with_data})
       this.setState({ myItem: responseJson.receive_array})
       this.setState({ broucher: responseJson.broucher})
       this.setState({reviews:responseJson.receive_array_with_data[4]})
       this.hideLoading()

   }, 500);



}

  _handleStateChange = state => {
   //alert('hoho')
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){
   var so = 'de' + GLOBAL.productid
 this.getOFF(GLOBAL.description)

  }else{
    this.getMoviesFromApiAsync()
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

//   this.getMoviesFromApiAsync()
 };

//   componentWillMount() {


//  this.props.navigation.addListener('willFocus',this._handleStateChange);


// //   this.getMoviesFromApiAsync()
//   }

   showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    componentDidMount() {
     this.props.navigation.addListener('willFocus',this._handleStateChange);


    // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    // NetInfo.isConnected.fetch().done(
    //   (isConnected) => { this.setState({ status: isConnected }); }
    // );
}
componentWillUnmount() {
//    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}

handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')

        }else {

        }
        console.log(`is connected: ${this.state.status}`);
}

  render() {
//  alert(this.state.offlineProductid)
   if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

       size="large" color="#e41582" />
        </View>
      )
    }

    if(this.state.isOffline==1){
      return(
        <ScrollView>
 <View style={{ flex: 1,flexDirection: 'column'}}>




{this.state.offlineProductid ==1 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./one.png')}/>

  )}

{this.state.offlineProductid ==2 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./two.jpg')}/>

  )}

{this.state.offlineProductid ==3 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./three.jpg')}/>

  )}

{this.state.offlineProductid ==4 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./four.jpg')}/>

  )}

{this.state.offlineProductid ==5 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./five.jpg')}/>

  )}

{this.state.offlineProductid ==6 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./six.jpg')}/>

  )}
{this.state.offlineProductid ==7 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./seven.png')}/>

  )}

  {this.state.offlineProductid ==8 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./eight.jpg')}/>

  )}

  {this.state.offlineProductid ==9 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./nine.png')}/>

  )}

{this.state.offlineProductid ==11 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./eleven.jpg')}/>

  )}

{this.state.offlineProductid ==12 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twelve.jpg')}/>

  )}

{this.state.offlineProductid ==13 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirteen.jpg')}/>

  )}


{this.state.offlineProductid ==14 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fourteen.jpg')}/>

  )}


{this.state.offlineProductid ==16 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./sixteen.jpg')}/>

  )}


{this.state.offlineProductid ==17 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./seventeen.jpg')}/>

  )}

{this.state.offlineProductid ==18 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./eighteen.jpg')}/>

  )}


{this.state.offlineProductid ==19 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./nineteen.jpg')}/>

  )}

{this.state.offlineProductid ==20 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twenty.jpg')}/>

  )}


{this.state.offlineProductid ==21 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twentyone.jpg')}/>

  )}

{this.state.offlineProductid ==22 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twentytwo.jpg')}/>

  )}

{this.state.offlineProductid ==23 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twentythree.jpg')}/>

  )}


{this.state.offlineProductid ==24 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twentyfour.jpg')}/>

  )}



{this.state.offlineProductid ==28 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twentyeight.jpg')}/>

  )}


{this.state.offlineProductid ==29 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twentynine.jpg')}/>

  )}


{this.state.offlineProductid ==30 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirty.jpg')}/>

  )}


{this.state.offlineProductid ==31 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirtyone.jpg')}/>

  )}


{this.state.offlineProductid ==32 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirtytwo.jpg')}/>

  )}



{this.state.offlineProductid ==33 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirtythree.jpg')}/>

  )}




{this.state.offlineProductid ==34 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirtyfour.jpg')}/>

  )}




{this.state.offlineProductid ==35 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirtyfive.jpg')}/>

  )}


{this.state.offlineProductid ==36 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirtysix.jpg')}/>

  )}


{this.state.offlineProductid ==37 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirtyseven.jpg')}/>

  )}



{this.state.offlineProductid ==38 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirtyeight.jpg')}/>

  )}

{this.state.offlineProductid ==39 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./thirtynine.jpg')}/>

  )}

{this.state.offlineProductid ==40 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./forty.jpg')}/>

  )}


{this.state.offlineProductid ==41 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fortyone.jpg')}/>

  )}


{this.state.offlineProductid ==42 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fortytwo.jpg')}/>

  )}



{this.state.offlineProductid ==43 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fortythree.jpg')}/>

  )}


{this.state.offlineProductid ==44 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fortyfour.jpg')}/>

  )}


{this.state.offlineProductid ==45 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fortyfive.jpg')}/>

  )}

{this.state.offlineProductid ==46 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fortysix.jpg')}/>

  )}




{this.state.offlineProductid ==47 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fortyseven.jpg')}/>

  )}


{this.state.offlineProductid ==48 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fortyeight.jpg')}/>

  )}



{this.state.offlineProductid ==50 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fifty.jpg')}/>

  )}

{this.state.offlineProductid ==51 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fiftyone.jpg')}/>

  )}


{this.state.offlineProductid ==52 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fiftytwo.jpg')}/>

  )}

{this.state.offlineProductid ==53 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fiftythree.jpg')}/>

  )}


{this.state.offlineProductid ==54 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fiftyfour.jpg')}/>

  )}

{this.state.offlineProductid ==55 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fiftyfive.jpg')}/>

  )}

{this.state.offlineProductid ==56 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./fiftysix.jpg')}/>

  )}


{this.state.offlineProductid ==91 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./ninetyone.jpg')}/>

  )}

{this.state.offlineProductid ==92 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./ninetytwo.jpg')}/>

  )}

{this.state.offlineProductid ==93 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./ninetythree.jpg')}/>

  )}

{this.state.offlineProductid ==94 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./ninetyfour.jpg')}/>

  )}

{this.state.offlineProductid ==95 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./ninetyfive.jpg')}/>

  )}

{this.state.offlineProductid ==96 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./ninetysix.jpg')}/>

  )}

{this.state.offlineProductid ==97 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./ninetyseven.jpg')}/>

  )}

{this.state.offlineProductid ==98 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./ninetyeight.jpg')}/>

  )}


{this.state.offlineProductid ==99 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./ninetynine.jpg')}/>

  )}


{this.state.offlineProductid ==100 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onezerozero.jpg')}/>

  )}


{this.state.offlineProductid ==101 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onezeroone.jpg')}/>

  )}

{this.state.offlineProductid ==102 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onezerotwo.jpg')}/>

  )}

{this.state.offlineProductid ==103 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onezerothree.jpg')}/>

  )}

{this.state.offlineProductid ==104 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onezerofour.jpg')}/>

  )}


{this.state.offlineProductid ==105 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onezerofive.jpg')}/>

  )}


{this.state.offlineProductid ==106 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onezerosix.jpg')}/>

  )}

{this.state.offlineProductid ==107 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onezeroseven.jpg')}/>

  )}

{this.state.offlineProductid ==108 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onezeroeight.jpg')}/>

  )}

{this.state.offlineProductid ==110 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneonezero.jpg')}/>

  )}


{this.state.offlineProductid ==111 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneoneone.jpg')}/>

  )}


{this.state.offlineProductid ==112 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneonetwo.jpg')}/>

  )}

{this.state.offlineProductid ==113 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneonethree.jpg')}/>

  )}

{this.state.offlineProductid ==114 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneonefour.jpg')}/>

  )}

{this.state.offlineProductid ==115 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneonefive.jpg')}/>

  )}

{this.state.offlineProductid ==116 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneonesix.jpg')}/>

  )}

{this.state.offlineProductid ==117 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneoneseven.jpg')}/>

  )}

{this.state.offlineProductid ==118 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneoneeight.jpg')}/>

  )}

{this.state.offlineProductid ==119 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneonenine.jpg')}/>

  )}

{this.state.offlineProductid ==120 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onetwozero.jpg')}/>

  )}

{this.state.offlineProductid ==121 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onetwoone.jpg')}/>

  )}

{this.state.offlineProductid ==122 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onetwotwo.jpg')}/>

  )}

{this.state.offlineProductid ==123 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onetwothree.jpg')}/>

  )}

{this.state.offlineProductid ==124 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onetwofour.jpg')}/>

  )}

{this.state.offlineProductid ==141 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefourone.jpg')}/>

  )}


{this.state.offlineProductid ==142 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefourtwo.jpg')}/>

  )}


{this.state.offlineProductid ==144 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefourfour.jpg')}/>

  )}

{this.state.offlineProductid ==145 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefourfive.jpg')}/>

  )}

{this.state.offlineProductid ==146 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefoursix.jpg')}/>

  )}

{this.state.offlineProductid ==149 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefournine.jpg')}/>

  )}


{this.state.offlineProductid ==150 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefivezero.jpg')}/>

  )}

{this.state.offlineProductid ==151 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefiveone.jpg')}/>

  )}

{this.state.offlineProductid ==152 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefivetwo.jpg')}/>

  )}

{this.state.offlineProductid ==153 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefivethree.jpg')}/>

  )}

{this.state.offlineProductid ==154 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefivefour.jpg')}/>

  )}

{this.state.offlineProductid ==155 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefivefive.jpg')}/>

  )}


{this.state.offlineProductid ==156 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefivesix.jpg')}/>

  )}

{this.state.offlineProductid ==157 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefiveseven.jpg')}/>

  )}


{this.state.offlineProductid ==158 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefiveeight.jpg')}/>

  )}


{this.state.offlineProductid ==159 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onefivenine.jpg')}/>

  )}


{this.state.offlineProductid ==160 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesixzero.jpg')}/>

  )}

{this.state.offlineProductid ==161 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesixone.jpg')}/>

  )}


{this.state.offlineProductid ==162 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesixtwo.jpg')}/>

  )}

{this.state.offlineProductid ==163 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesixthree.jpg')}/>

  )}

{this.state.offlineProductid ==164 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesixfour.jpg')}/>

  )}


{this.state.offlineProductid ==166 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesixsix.jpg')}/>

  )}


{this.state.offlineProductid ==167 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesixseven.jpg')}/>

  )}

{this.state.offlineProductid ==168 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesixeight.jpg')}/>

  )}


{this.state.offlineProductid ==169 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesixnine.jpg')}/>

  )}

{this.state.offlineProductid ==170 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesevenzero.jpg')}/>

  )}

{this.state.offlineProductid ==171 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesevenone.jpg')}/>

  )}

{this.state.offlineProductid ==172 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneseventwo.jpg')}/>

  )}

{this.state.offlineProductid ==173 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneseventhree.jpg')}/>

  )}


{this.state.offlineProductid ==174 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesevenfour.jpg')}/>

  )}


{this.state.offlineProductid ==175 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesevenfive.jpg')}/>

  )}

{this.state.offlineProductid ==176 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesevensix.jpg')}/>

  )}

{this.state.offlineProductid ==177 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesevenseven.jpg')}/>

  )}

{this.state.offlineProductid ==178 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneseveneight.jpg')}/>

  )}

{this.state.offlineProductid ==179 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onesevennine.jpg')}/>

  )}


{this.state.offlineProductid ==180 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneeightzero.jpg')}/>

  )}

{this.state.offlineProductid ==181 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneeightone.jpg')}/>

  )}

{this.state.offlineProductid ==182 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneeighttwo.jpg')}/>

  )}


{this.state.offlineProductid ==183 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneeightthree.jpg')}/>

  )}

{this.state.offlineProductid ==184 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneeightfour.jpg')}/>

  )}


{this.state.offlineProductid ==185 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneeightfive.jpg')}/>

  )}

{this.state.offlineProductid ==186 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneeightsix.jpg')}/>

  )}


{this.state.offlineProductid ==187 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneeightseven.jpg')}/>

  )}

{this.state.offlineProductid ==188 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneeighteight.jpg')}/>

  )}

{this.state.offlineProductid ==189 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneeightnine.jpg')}/>

  )}

{this.state.offlineProductid ==190 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneninezero.jpg')}/>

  )}


{this.state.offlineProductid ==191 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onenineone.jpg')}/>

  )}

{this.state.offlineProductid ==192 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneninetwo.jpg')}/>

  )}

{this.state.offlineProductid ==193 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneninethree.jpg')}/>

  )}

{this.state.offlineProductid ==194 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneninefour.jpg')}/>

  )}

{this.state.offlineProductid ==195 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneninefive.jpg')}/>

  )}

{this.state.offlineProductid ==196 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneninesix.jpg')}/>

  )}


{this.state.offlineProductid ==197 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onenineseven.jpg')}/>

  )}


{this.state.offlineProductid ==198 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./onenineeight.jpg')}/>

  )}

{this.state.offlineProductid ==199 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./oneninenine.jpg')}/>

  )}


{this.state.offlineProductid ==200 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twozerozero.jpg')}/>

  )}

{this.state.offlineProductid ==201 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twozeroone.jpg')}/>

  )}

{this.state.offlineProductid ==202 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twozerotwo.jpg')}/>

  )}

{this.state.offlineProductid ==203 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twozerothree.jpg')}/>

  )}

{this.state.offlineProductid ==204 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twozerofour.jpg')}/>

  )}

{this.state.offlineProductid ==205 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twozerofive.jpg')}/>

  )}


{this.state.offlineProductid ==206 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twozerosix.jpg')}/>

  )}

{this.state.offlineProductid ==207 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twozeroseven.jpg')}/>

  )}

{this.state.offlineProductid ==208 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twozeroeight.jpg')}/>

  )}

{this.state.offlineProductid ==209 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twozeronine.jpg')}/>

  )}

{this.state.offlineProductid ==210 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoonezero.jpg')}/>

  )}

{this.state.offlineProductid ==211 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twooneone.jpg')}/>

  )}

{this.state.offlineProductid ==212 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoonetwo.jpg')}/>

  )}


{this.state.offlineProductid ==213 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoonethree.jpg')}/>

  )}


{this.state.offlineProductid ==214 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoonefour.jpg')}/>

  )}

{this.state.offlineProductid ==215 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoonefive.jpg')}/>

  )}


{this.state.offlineProductid ==216 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoonesix.jpg')}/>

  )}


{this.state.offlineProductid ==217 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twooneseven.jpg')}/>

  )}

{this.state.offlineProductid ==218 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twooneeight.jpg')}/>

  )}


{this.state.offlineProductid ==219 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoonenine.jpg')}/>

  )}

{this.state.offlineProductid ==220 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twotwozero.jpg')}/>

  )}

{this.state.offlineProductid ==221 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twotwoone.jpg')}/>

  )}


{this.state.offlineProductid ==222 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twotwotwo.jpg')}/>

  )}


{this.state.offlineProductid ==223 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twotwothree.jpg')}/>

  )}


{this.state.offlineProductid ==224 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twotwofour.jpg')}/>

  )}


{this.state.offlineProductid ==225 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twotwofive.jpg')}/>

  )}


{this.state.offlineProductid ==226 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twotwosix.jpg')}/>

  )}



{this.state.offlineProductid ==227 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twotwoseven.jpg')}/>

  )}



{this.state.offlineProductid ==228 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twotwoeight.jpg')}/>

  )}


{this.state.offlineProductid ==229 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twotwonine.jpg')}/>

  )}

{this.state.offlineProductid ==230 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twothreezero.jpg')}/>

  )}

{this.state.offlineProductid ==231 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twothreeone.jpg')}/>

  )}

{this.state.offlineProductid ==232 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twothreetwo.jpg')}/>

  )}

{this.state.offlineProductid ==233 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twothreethree.jpg')}/>

  )}


{this.state.offlineProductid ==234 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twothreefour.jpg')}/>

  )}


{this.state.offlineProductid ==235 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twothreefive.jpg')}/>

  )}


{this.state.offlineProductid ==236 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twothreesix.jpg')}/>

  )}

{this.state.offlineProductid ==237 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twothreeseven.jpg')}/>

  )}


{this.state.offlineProductid ==238 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twothreeeight.jpg')}/>

  )}


{this.state.offlineProductid ==239 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twothreenine.jpg')}/>

  )}


{this.state.offlineProductid ==240 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofourzero.jpg')}/>

  )}


{this.state.offlineProductid ==241 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofourone.jpg')}/>

  )}

{this.state.offlineProductid ==242 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofourtwo.jpg')}/>

  )}

{this.state.offlineProductid ==243 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofourthree.jpg')}/>

  )}


{this.state.offlineProductid ==244 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofourfour.jpg')}/>

  )}


{this.state.offlineProductid ==245 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofourfive.jpg')}/>

  )}


{this.state.offlineProductid ==246 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofoursix.jpg')}/>

  )}



{this.state.offlineProductid ==247 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofourseven.jpg')}/>

  )}

{this.state.offlineProductid ==248 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofoureight.jpg')}/>

  )}

{this.state.offlineProductid ==249 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofournine.jpg')}/>

  )}


{this.state.offlineProductid ==250 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofivezero.jpg')}/>

  )}

{this.state.offlineProductid ==251 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofiveone.jpg')}/>

  )}


{this.state.offlineProductid ==252 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofivetwo.jpg')}/>

  )}


{this.state.offlineProductid ==253 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofivethree.jpg')}/>

  )}


{this.state.offlineProductid ==254 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofivefour.jpg')}/>

  )}



{this.state.offlineProductid ==255 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofivefive.jpg')}/>

  )}


{this.state.offlineProductid ==256 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofivesix.jpg')}/>

  )}

{this.state.offlineProductid ==257 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofiveseven.jpg')}/>

  )}

{this.state.offlineProductid ==258 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofiveeight.jpg')}/>

  )}


{this.state.offlineProductid ==259 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twofivenine.jpg')}/>

  )}

{this.state.offlineProductid ==260 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosixzero.jpg')}/>

  )}


{this.state.offlineProductid ==261 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosixone.jpg')}/>

  )}

{this.state.offlineProductid ==262 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosixtwo.jpg')}/>

  )}

{this.state.offlineProductid ==263 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosixthree.jpg')}/>

  )}


{this.state.offlineProductid ==264 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosixfour.jpg')}/>

  )}

{this.state.offlineProductid ==265 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosixfive.jpg')}/>

  )}

{this.state.offlineProductid ==266 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosixsix.jpg')}/>

  )}

{this.state.offlineProductid ==267 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosixseven.jpg')}/>

  )}

{this.state.offlineProductid ==268 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosixeight.jpg')}/>

  )}



{this.state.offlineProductid ==269 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosixnine.jpg')}/>

  )}

{this.state.offlineProductid ==270 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosevenzero.jpg')}/>

  )}


{this.state.offlineProductid ==274 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosevenfour.jpg')}/>

  )}


{this.state.offlineProductid ==275 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosevenfive.jpg')}/>

  )}


{this.state.offlineProductid ==276 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosevensix.jpg')}/>

  )}

{this.state.offlineProductid ==277 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosevenseven.jpg')}/>

  )}


{this.state.offlineProductid ==278 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoseveneight.jpg')}/>

  )}

{this.state.offlineProductid ==279 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twosevennine.jpg')}/>

  )}



{this.state.offlineProductid ==280 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoeightzero.jpg')}/>

  )}



{this.state.offlineProductid ==281 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoeightone.jpg')}/>

  )}


{this.state.offlineProductid ==282 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoeighttwo.jpg')}/>

  )}



{this.state.offlineProductid ==283 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoeightthree.jpg')}/>

  )}

{this.state.offlineProductid ==286 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoeightsix.jpg')}/>

  )}


{this.state.offlineProductid ==287 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoeightseven.jpg')}/>

  )}

{this.state.offlineProductid ==288 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoeighteight.jpg')}/>

  )}

{this.state.offlineProductid ==289 &&(
                        <Image
 style={{ width: BannerWidth, height: BannerHeight, margin:5 }}

 source={require('./twoeightnine.jpg')}/>

  )}


         <Text style = {{marginLeft : 10 ,marginTop : 10,fontSize :20,color :'#000000', marginRight:10}} >
          {this.state.name}

         </Text>

                  <Text style = {{marginLeft : 10 ,marginTop : 2,fontSize :13,color :'#7e7e7e', marginRight:10}} >
          {this.state.subtitle}

         </Text>

         <View style={{marginTop :10,height: 40}} >
          <ScrollView
        horizontal={true}

        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        >

        {this.state.broucher =='' &&(
      <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  alert('Brochure not available!')}>
         Download Brochure
        </Button>

        )}

        {this.state.broucher!='' &&(
      <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  Linking.openURL(this.state.broucher)}>
         Download Brochure
        </Button>

        )}


          <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  this.props.navigation.navigate('Request')}>
        Request a Quote
        </Button>

            <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  this.props.navigation.navigate('Review')}>
          Write a Review
        </Button>

            <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  this.props.navigation.navigate('ViewReview')}>
        Reviews
        </Button>


      </ScrollView>
        </View>

      <View style = {{width : window.width ,height :45,}}>
        <MaterialTabs
          items= {this.state.myItem}
          selectedIndex={this.state.selectedTab}
          onChange={this.setTab}
          barColor="#ffffff"
          scrollable = {true}
          indicatorColor="#e41582"
          activeTextColor="#e41582"
          inactiveTextColor = "#7e7e7e"
        />
       </View>


{this.state.htmlArray.length==0 &&(<Text></Text>)}
{this.state.htmlArray.length!=0 && (
<AutoHeightWebView
source={{ html: this.state.htmlArray[this.state.selectedTab]}}
style={{width:width-12,margin:6, }}
  scalesPageToFit={false}
  injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width-20 ,initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
  onLoadEnd={this._onLoadEnd}
  automaticallyAdjustContentInsets={true}

  startInLoadingState={false}
        scrollEnabled={true}

 />
  )}

       </View>
       </ScrollView>

      );
    }

    return (
       <ScrollView>
       <View style={{   flex: 1,flexDirection: 'column'}}>

           <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    showsPageIndicator={true}
                    index={0}
                    pageSize={BannerWidth}
                >
                    {this.state.moviesList.map((image, index) => this.renderPage(image, index))}
                </Carousel>


         <Text style = {{marginLeft : 10 ,marginTop : 10,fontSize :20,color :'#000000', marginRight:10}} >
          {this.state.name}

         </Text>


                  <Text style = {{marginLeft : 10 ,marginTop : 2,fontSize :13,color :'#7e7e7e', marginRight:10}} >
          {this.state.subtitle}

         </Text>

         <View style={{marginTop :10,height: 40}} >
          <ScrollView
        horizontal={true}

        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        >

        {this.state.broucher =='' &&(
      <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  alert('Brochure not available!')}>
         Download Brochure
        </Button>

        )}

        {this.state.broucher!='' &&(
      <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  Linking.openURL(this.state.broucher)}>
         Download Brochure
        </Button>

        )}


          <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  this.props.navigation.navigate('Request')}>
        Request a Quote
        </Button>

            <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  this.props.navigation.navigate('Review')}>
          Write a Review
        </Button>

            <Button
           containerStyle={{width :130,margin :5,padding:10, height:35, overflow:'hidden', borderRadius:12, backgroundColor: '#e41582'}}

            style={{fontSize: 11, color: 'white'}}

        onPress={() =>  this.props.navigation.navigate('ViewReview')}>
        Reviews
        </Button>


      </ScrollView>
        </View>

      <View style = {{width : window.width ,height :45,}}>
        <MaterialTabs
          items= {this.state.myItem}
          selectedIndex={this.state.selectedTab}
          onChange={this.setTab}
          barColor="#ffffff"
          scrollable = {true}
          indicatorColor="#e41582"
          activeTextColor="#e41582"
          inactiveTextColor = "#7e7e7e"
        />
       </View>


{this.state.htmlArray.length==0 &&(<Text></Text>)}
{this.state.htmlArray.length!=0 && (

<AutoHeightWebView
source={{ html: this.state.htmlArray[this.state.selectedTab]}}
style={{width:width-12,margin:6, }}
  scalesPageToFit={false}
  injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width-20 ,initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
  onLoadEnd={this._onLoadEnd}
  automaticallyAdjustContentInsets={true}

  startInLoadingState={false}
        scrollEnabled={true}

 />

  )}




       </View>
       </ScrollView>


    );
  }




  getMoviesFromApiAsync = () => {
//     store.get('allimagesarray').then((res) =>
//   alert(JSON.stringify(res))
// )
       this.showLoading();

      const url = GLOBAL.BASE_URL +  GLOBAL.product_description

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    product_id: GLOBAL.productid,

  }),
}).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == true){
        // var so = 'de' + GLOBAL.productid
        // store.update(so,responseJson)

      this.setState({ moviesList: responseJson.images})
      this.setState({ name: responseJson.product_name})
      this.setState({ subtitle: responseJson.product_caption})
      this.setState({ htmlArray: responseJson.receive_array_with_data})
       this.setState({ myItem: responseJson.receive_array})
       this.setState({ broucher: responseJson.broucher})
       this.setState({reviews:responseJson.receive_array_with_data[4]})
      }

       this.hideLoading();
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
    });
 }

}

export default Detail;
