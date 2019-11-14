import React, {Component} from 'react';
import {Platform, StyleSheet, Text,ActivityIndicator, View, AsyncStorage,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
const GLOBAL = require('./Global');
import { DrawerActions } from 'react-navigation';
import OTPInput from 'react-native-otp';
const window = Dimensions.get('window');
import store from 'react-native-simple-store';

import DeviceInfo from 'react-native-device-info';
var randomString = require('random-string');
var count=3;
import OtpInputs from 'react-native-otp-inputs'


type Props = {};
 class Otp extends Component<Props> {

  static navigationOptions = {
    title: 'Login',
    header: null
  };

 state = {
    otp: '',loading:'',ipaddress:'',
  }


handleOTPChange = (otp) => {

    this.setState({ otp:otp })
  }

  clearOTP = () => {
    this.setState({ otp: '' })
  }

  autoFill = () => {
    this.setState({ otp: '221198' })
  }
  showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }

    buttonClickListener = () =>{
      var k = '';
    if (GLOBAL.isScreen  == "1"){
     k = GLOBAL.fmobile;
    } else {
    k = GLOBAL.mymobile;
    }
   DeviceInfo.getIPAddress().then(ip => {
     this.setState({ipaddress:ip})
});
   var x = randomString({
   length: 6,
   numeric: true,
   letters: false,
   special: false,

   });

    if (GLOBAL.mymobile == ''){
      alert('Please Enter Mobile Number')
    }     else if (this.state.status == false){
      alert('Please Connect to Internet')
    }  else {
      const url = GLOBAL.BASE_URL +  'otp'
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email : GLOBAL.myemail,
    phone: k,
    otp:x

  }),
}).then((response) => response.json())
    .then((responseJson) => {

       alert('hi')
       this.hideLoading()
       if (responseJson.status == true) {
           GLOBAL.otps =  x;
//           GLOBAL.fmobile= this.state.username;

        alert('OTP Sent Again to Your Registered Mobile Number.')

       }else {
           //alert('Your Mobile Number Is Not Registered.')
       }
    })
    .catch((error) => {
      console.error(error);
    });
    }
  }

buttonclickotp=()=>{

//alert(GLOBAL.otps)
 var k =  AsyncStorage.getItem('token');
    if (this.state.otp == ''){
      alert('Please Enter OTP')
    }     else if (this.state.status == false){
      alert('Please Connect to Internet')
    }  else if(GLOBAL.otps==this.state.otp){
      if (GLOBAL.isScreen == '1'){
      const url = GLOBAL.BASE_URL +  GLOBAL.forget_password_by_mobile
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mobile: GLOBAL.fmobile,


  }),
}).then((response) => response.json())
    .then((responseJson) => {


       this.hideLoading()
       if (responseJson.status == true) {

        alert('New Password Sent To Your Registered Mobile Number.')
        this.props.navigation.replace('Login')
       }else {
           alert('Entered OTP is Invalid.')
       }
    })
    .catch((error) => {
      console.error(error);
    });
    }
    else{
            const url = GLOBAL.BASE_URL +  GLOBAL.Signup
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },


  body: JSON.stringify({
    name: GLOBAL.myname,
    mobile: GLOBAL.mymobile,
    email: GLOBAL.myemail,
    deviceID: GLOBAL.mydeviceID,
    deviceType: GLOBAL.mydeviceType,
    deviceToken: GLOBAL._token,
    model_name: GLOBAL.mymodel_name,
    carrier_name: DeviceInfo.getCarrier(),
    device_country: DeviceInfo.getDeviceCountry(),
    device_memory: DeviceInfo.getTotalMemory(),
    has_notch: DeviceInfo.hasNotch(),
    manufacture: DeviceInfo.getManufacturer(),
    ip_address: '0',

  }),
}).then((response) => response.json())
    .then((responseJson) => {

      if (responseJson.status == true) {
 store.update('user_info',responseJson.user_detail)

      this.setState({ results: responseJson.user_detail })



       AsyncStorage.setItem('userID', this.state.results.userID);
       AsyncStorage.setItem('image', this.state.results.image);
       AsyncStorage.setItem('name', this.state.results.name);
       AsyncStorage.setItem('email', this.state.results.email);
       AsyncStorage.setItem('mobile', this.state.results.mobile);


        this.props.navigation.replace('DrawerNavigator')
       }
       this.hideLoading()
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }
  }
    else {
           alert('Entered OTP is Invalid.')
       }
  }

  buttonClickListenerlogin = () =>{

 DeviceInfo.getIPAddress().then(ip => {
   this.setState({ipaddress:ip})
});
 var x = randomString({
 length: 6,
 numeric: true,
 letters: false,
 special: false,

 });

  if (GLOBAL.loginmobile == ''){
    alert('Please Enter Mobile Number')
  }     else if (this.state.status == false){
    alert('Please Connect to Internet')
  }  else {
    const url = GLOBAL.BASE_URL +  'otp_for_login'
    this.showLoading()
    fetch(url, {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({
  mobile: GLOBAL.loginmobile,
  otp:x,
  deviceID: DeviceInfo.getUniqueID(),
  deviceType: Platform.OS,
  deviceToken: GLOBAL._token,
  model_name: DeviceInfo.getModel(),
  carrier_name: DeviceInfo.getCarrier(),
  device_country: DeviceInfo.getDeviceCountry(),
  device_memory: DeviceInfo.getTotalMemory(),
  has_notch: DeviceInfo.hasNotch(),
  manufacture: DeviceInfo.getManufacturer(),
  ip_address: '0000',

}),
}).then((response) => response.json())
  .then((responseJson) => {


     this.hideLoading()
     if (responseJson.status == true) {
         GLOBAL.loginOTP =  x;
//           GLOBAL.fmobile= this.state.username;

      alert('OTP Sent Again to Your Mobile Number.')

     }else {
         //alert('Your Mobile Number Is Not Registered.')
     }
  })
  .catch((error) => {
    console.error(error);
  });
  }
}

buttonclickotplogin=()=>{

//alert(GLOBAL.otps)
var k =  AsyncStorage.getItem('token');
  if (this.state.otp == ''){
    alert('Please Enter OTP')
  }     else if (this.state.status == false){
    alert('Please Connect to Internet')
  }  else if(GLOBAL.loginOTP==this.state.otp){

    const url = GLOBAL.BASE_URL +  'user_detail_after_otp'
    this.showLoading()
    fetch(url, {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({
  mobile: GLOBAL.loginmobile,
  deviceID: GLOBAL.mydeviceID,
  deviceType: GLOBAL.mydeviceType,
  deviceToken: GLOBAL._token,
  model_name: GLOBAL.mymodel_name,
  carrier_name: DeviceInfo.getCarrier(),
  device_country: DeviceInfo.getDeviceCountry(),
  device_memory: DeviceInfo.getTotalMemory(),
  has_notch: DeviceInfo.hasNotch(),
  manufacture: DeviceInfo.getManufacturer(),
  ip_address: '0',


}),
}).then((response) => response.json())
  .then((responseJson) => {


     this.hideLoading()
     if (responseJson.status == true) {

//      alert('New Password Sent To Your Registered Mobile Number.')
     this.setState({ results: responseJson.user_detail })



       AsyncStorage.setItem('userID', this.state.results.userID);
       AsyncStorage.setItem('image', this.state.results.image);
       AsyncStorage.setItem('name', this.state.results.name);
       AsyncStorage.setItem('email', this.state.results.email);
       AsyncStorage.setItem('mobile', this.state.results.mobile);

    this.props.navigation.replace('DrawerNavigator')

     }else {
         alert('Entered OTP is Invalid.')
     }
  })
  .catch((error) => {
    console.error(error);
  });

}
  else {
         alert('Entered OTP is Invalid.')
     }
}

componentWillUnmount(){
//  alert('Hi')
//GLOBAL.loginmobile==''
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
    if(GLOBAL.loginmobile!=''){
      return(
        <KeyboardAwareScrollView style={styles.containers} keyboardShouldPersistTaps='always'>
              <Image style={styles.otpImage}
               source={require('./otp.png')} />

              <Text style =  {styles.otpColor}>
                Login via OTP
               </Text>
              <Text style =  {styles.andof}>
               Please enter the verification code sent to your entered mobile number.
               </Text>
                 <Text style =  {styles.otpColor}>
                 OTP
               </Text>

              <OtpInputs
              containerStyles={{alignSelf:'center'}}
              value={this.state.otp}
              handleChange={this.handleOTPChange}
              tintColor="#2F95D6"
              offTintColor="#2F95D6"
              numberOfInputs={6}
            />


             <Text style =  {styles.andof}>
              Didn't receive the OTP?
               </Text>

                <Button
               containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#ffffff'}}

                style={{fontSize: 14, color: 'darkgrey'}}

               onPress={this.buttonClickListenerlogin}>
                Resend OTP?
               </Button>

                    <Button
               containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

                style={{fontSize: 14, color: 'white'}}

            onPress={this.buttonclickotplogin}>
             Submit
            </Button>

         </KeyboardAwareScrollView>

      )
    }else if(GLOBAL.loginmobile==''){
      return (
      <KeyboardAwareScrollView style={styles.containers} keyboardShouldPersistTaps='always'>
            <Image style={styles.otpImage}
             source={require('./otp.png')} />

            <Text style =  {styles.otpColor}>
             Verify your mobile number
             </Text>
            <Text style =  {styles.andof}>
             Please enter the verification code sent to your entered mobile number.
             </Text>
               <Text style =  {styles.otpColor}>
               OTP
             </Text>

            <OtpInputs
            containerStyles={{alignSelf:'center'}}
            value={this.state.otp}
            handleChange={this.handleOTPChange}
            tintColor="#2F95D6"
            offTintColor="#2F95D6"
            numberOfInputs={6}
          />


           <Text style =  {styles.andof}>
            Didn't receive the OTP?
             </Text>

              <Button
             containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#ffffff'}}

              style={{fontSize: 14, color: 'darkgrey'}}

             onPress={this.buttonClickListener}>
              Resend OTP?
             </Button>

                  <Button
             containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

              style={{fontSize: 14, color: 'white'}}

          onPress={this.buttonclickotp}>
           Submit
          </Button>

       </KeyboardAwareScrollView>
      );

    }
  }
}
export default Otp;
