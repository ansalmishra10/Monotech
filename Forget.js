import React, {Component} from 'react';
import {Platform,ActivityIndicator, StyleSheet,AsyncStorage, Text, View ,NetInfo ,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
import OfflineNotice from './OfflineNotice.js';
const GLOBAL = require('./Global');
import DeviceInfo from 'react-native-device-info';
var randomString = require('random-string');

type Props = {};
 class Forget extends Component<Props> {


navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  
  }



static navigationOptions = {
          title: 'Forgot Password',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:250
          },
      };

  constructor(props){
    super(props)
 const { navigation } = this.props;
    this.state = {
      username: '',
      password: '',
      status :'',
      ipAdd : '',
      loading:'',
      results: [],
     
    }
}


showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    buttonClickListener = () =>{
   DeviceInfo.getIPAddress().then(ip => {
     this.setState({ipAdd:ip})
});
   var x = randomString({
   length: 6,
   numeric: true,
   letters: false,
   special: false,

   });

    if (this.state.username == ''){
      alert('Please Enter Mobile Number')
    }     else if (this.state.status == false){
      alert('Please Connect to Internet')
    }  else {
      const url = GLOBAL.BASE_URL +  GLOBAL.otp_for_forget
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phone: this.state.username,
    otp:x

  }),
}).then((response) => response.json())
    .then((responseJson) => {
              
     
       this.hideLoading()
       if (responseJson.status == true) {
           GLOBAL.otps =  x;
           GLOBAL.fmobile= this.state.username;
           GLOBAL.isScreen = '1';

        alert('OTP Sent To Your Registered Mobile Number.')
        this.props.navigation.navigate('Otp')
       }else {
           alert('Your Mobile Number Is Not Registered.')
       }
    })
    .catch((error) => {
      console.error(error);
    });
    }
  }



componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );
}
componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}

handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')
        }
        console.log(`is connected: ${this.state.status}`);
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
    <KeyboardAwareScrollView style={styles.containers}
    keyboardShouldPersistTaps='always'>
          <Image style={styles.logoImage}
           source={require('./logins.png')} />

       <Text style = {{textAlign :'center' ,margin : 30}} >

       Please Enter Your Registered Mobile Number. We will send an OTP to your Mobile Number. 

      </Text>

                <View style={styles.viewBackground}>
                         <Image style={styles.icon}
                             source={require('./mobile.png')} />
                                <TextInput   style={styles.welcome1}
                                   placeholder="Enter Mobile Number"
                                   keyboardType='numeric'
                                   maxLength={10}
                                  onChangeText={(text) => this.setState({username:text})} 
                                   />
                      
                 </View>
                
          <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}
   
            style={{fontSize: 14, color: 'white'}}
          onPress={this.buttonClickListener}
        >
       
         Submit
        </Button>

        
    

     </KeyboardAwareScrollView>
    );
  }
}
export default Forget; 