import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
import OfflineNotice from './OfflineNotice.js';
const GLOBAL = require('./Global');
import UserAvatar from 'react-native-user-avatar';
import DeviceInfo from 'react-native-device-info';
import store from 'react-native-simple-store';

import ImagePicker from 'react-native-image-picker';

type Props = {};

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

 class EditProfile extends Component<Props> {


navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);

  }



 	static navigationOptions = {
          title: 'Edit Profile',
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
      business: '',
      name: GLOBAL.name,
      email: GLOBAL.email,
      gst:'',
      businessaddress:'',
      status :'',
      ipAdd : '',
      loading:'',
      avatarSource : '',
      results: [],

    }
}

   componentWillMount() {

    this.getMoviesFromApiAsync();
//    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
getMoviesFromApiAsync = () => {
 const url = GLOBAL.BASE_URL +  'get_profile'
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: GLOBAL.userid,
  }),
}).then((response) => response.json())
    .then((responseJson) => {


       this.hideLoading()
       if (responseJson.status == true) {
    this.setState({name:responseJson.user_detail.name})
    this.setState({gst:responseJson.user_detail.gst})
    this.setState({businessaddress:responseJson.user_detail.businessaddress})
    this.setState({business:responseJson.user_detail.organisation})

       }
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });


  }


 bookmarks = () => {
ImagePicker.showImagePicker(options, (response) => {
  console.log('Response = ', response);

  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else {

    const source = { uri: response.uri };

    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    this.setState({
      avatarSource: source,
    });

    GLOBAL.profile = 'data:image/jpeg;base64,' + response.data
this.setState({
      avatarSource: source,
    });
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };


  }
});
 }
showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    buttonClickListener = () =>{

    if (this.state.name == ''){
      alert('Please Enter Name')
    }   else {
      this.showLoading()
 const url = GLOBAL.BASE_URL +  GLOBAL.update_profile_patient
 const data = new FormData();
data.append('user_id', GLOBAL.userid);
data.append('name', this.state.name);
data.append('flag', '0');
data.append('business',this.state.business);
data.append('gst',this.state.gst);
data.append('businessaddress',this.state.businessaddress);
// you can append anyone.

fetch(url, {
  method: 'post',
  body: data,
  headers: {
      'Content-Type': 'multipart/form-data',
    }

}).then((response) => response.json())
      .then((responseJson) => {
  this.hideLoading()
   if (responseJson.status == true){
    alert('Profile Sucessfully Updated!')
    AsyncStorage.setItem('name', this.state.name);
    // AsyncStorage.setItem('compName', this.state.business);
    // AsyncStorage.setItem('compAddr', this.state.businessaddress);
    // AsyncStorage.setItem('gstno', this.state.gst);

   }

    this.setState({
      name: responseJson.name,
    });

  this.setState({
      avatarSource: responseJson.image,
    });
  GLOBAL.name = this.state.name
   GLOBAL.profile = this.state.avatarSource
  console.log(responseJson)
});
  }

}




  render() {



    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

       size="large" color="#e41582" />
        </View>
      )
    }

    return (
    <KeyboardAwareScrollView style={styles.containers} keyboardShouldPersistTaps='always'>


           <UserAvatar style={{marginTop:15,alignSelf:'center'}}
           size="80" name={GLOBAL.name} colors={['#e41582']}/>

        <Text style = {{margin : 10 ,color :'#000000',textAlign :'center', fontWeight:'bold'}} >
        {GLOBAL.mobile}
        </Text>

        <Text style = {{marginLeft : 10 ,marginRight:10,color :'#000000',textAlign :'center',fontWeight:'bold'}} >
        {GLOBAL.email}
        </Text>


                                <TextInput   style= {{marginTop:30, marginLeft:15, width:window.width-30, height:40,borderRadius:1, borderBottomColor:'black'}}
                                   placeholder="Name"
                                   value={this.state.name}
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({name:text})}
                                   />
                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:20,marginRight:20}}/>



                                 <TextInput   style={{marginTop:20,marginLeft:15, borderBottomColor:'black', width:window.width-30, height:40,borderRadius:1}}
                                    placeholder="Company Name"
                                    value={this.state.business}
                                    placeholderTextColor='grey'
                                   onChangeText={(text) => this.setState({business:text})}
                                    />
                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:20,marginRight:20}}/>


                                    <TextInput   style={{marginTop:20,marginLeft:15, borderBottomColor:'black', width:window.width-30, height:40,borderRadius:1}}
                                    placeholder="Company Address"
                                    placeholderTextColor='grey'
                                    value={this.state.businessaddress}
                                   onChangeText={(text) => this.setState({businessaddress:text})}
                                    />

                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:20,marginRight:20}}/>
                                    <TextInput   style={{marginTop:20,marginLeft:15, borderBottomColor:'black', width:window.width-30, height:40,borderRadius:1}}
                                    placeholder="GST Number"
                                    placeholderTextColor='grey'
                                    value={this.state.gst}
                                   onChangeText={(text) => this.setState({gst:text})}
                                    />

                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:20,marginRight:20}}/>
          <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 70,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

            style={{fontSize: 14, color: 'white'}}
          onPress={this.buttonClickListener}
        >

         UPDATE
        </Button>
<Text></Text>




     </KeyboardAwareScrollView>
    );
  }
}
export default EditProfile;
