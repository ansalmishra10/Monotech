import React, {Component} from 'react';
import {Platform, ActivityIndicator ,AsyncStorage,StyleSheet,NetInfo, Text, View ,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import DeviceInfo from 'react-native-device-info';
var randomString = require('random-string');

type Props = {};
 class Signup extends Component<Props> {


navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);

  }



  static navigationOptions = {
    title: 'Login',
    header: null
  };

  constructor(props){
    super(props)
 const { navigation } = this.props;
    this.state = {
      username: '',
      email : '',
      mobile : '',
      status : '',
      iPAddress : '',
      loading:'',
        results: [],
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
        console.log(`is connected: ${this.state.status}`);
}



showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }
buttonClickListener = () =>{

         let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

  var k =  AsyncStorage.getItem('token');
   DeviceInfo.getIPAddress().then(ip => {
     this.setState({iPAddress:ip})
});

    GLOBAL.myname = this.state.username
    GLOBAL.mymobile= this.state.mobile
    GLOBAL.myemail= this.state.email
    GLOBAL.mydeviceID= DeviceInfo.getUniqueID()
    GLOBAL.mydeviceType= Platform.OS
    GLOBAL.mydeviceToken= GLOBAL._token
    GLOBAL.mymodel_name= DeviceInfo.getModel()
    GLOBAL.mycarrier_name= DeviceInfo.getCarrier()
    GLOBAL.mydevice_country= DeviceInfo.getDeviceCountry()
    GLOBAL.mydevice_memory= DeviceInfo.getTotalMemory()


    if (this.state.username == ''){
      alert('Please Enter Username')
    } else if (this.state.email != '' && reg.test(this.state.email) === false){
      alert('Please Enter Valid Email')
    }  else if (this.state.mobile == ''){
      alert('Please Enter Mobile')
    }    else if (this.state.status == false){
      alert('Please Connect to Internet')
    }  else {

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
      const url = GLOBAL.BASE_URL +  'otp'
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email : this.state.email,
    phone: this.state.mobile,
    otp:x

  }),
}).then((response) => response.json())
    .then((responseJson) => {


       this.hideLoading()
       if (responseJson.status == true) {
           GLOBAL.otps =  x;
           GLOBAL.fmobile= this.state.mobile;
           GLOBAL.isScreen = '0';

        alert('OTP Sent To Your Registered Mobile Number.')
        this.props.navigation.navigate('Otp')
       }else {
           alert('Your Mobile Number Is Already Registered.')
       }
    })
    .catch((error) => {
      console.error(error);
    });
    }


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
          <Image style={styles.logoImage}
           source={require('./logins.png')} />
                <View style={styles.viewBackground}>
                           <Image style={styles.icon}
                             source={require('./username.png')} />
                                <TextInput   style={styles.welcome1}
                                   placeholder="Name"
                                   maxLength={40}
                                  onChangeText={(text) => this.setState({username:text})}
                                   />
                 </View>

                         <View style={styles.passwordviewBackground}>
                          <Image style={styles.icon}
                             source={require('./email.png')} />
                                <TextInput   style={styles.welcome1}
                                      placeholder="Email"
                                     value={this.state.email}
                                        autoCapitalize = 'none'

                                  onChangeText={(text) => this.setState({email:text.replace(/\s+/g,'')})}
                                   />

                 </View>



                   <View style={styles.passwordviewBackground}>
                           <Image style={styles.icon}
                             source={require('./mobile.png')} />
                                <TextInput   style={styles.welcome1}
                                      placeholder="Mobile"
                                     keyboardType={'numeric'}
                                     value={this.state.mobile}
                                     maxLength={10}
                                  onChangeText={(text) => this.setState({mobile:text.replace(/[^0-9]/g, '')})}
                                   />

                 </View>







          <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

            style={{fontSize: 14, color: 'white'}}

        onPress={this.buttonClickListener}
        >
         Sign Up
        </Button>

       <TouchableOpacity onPress={()=> this.props.navigation.navigate('Terms')}>
         <View style = {{margin : 15}}>

        <Text style={styles.privacy} >
        <Text style={styles.and} >
         <Text style={styles.createaccount} >
        <Text style={styles.account} >
        By Registering you confirm that you accept our
        </Text>
      &nbsp;Terms & Conditions
        </Text>
      &nbsp;And
        </Text>
      &nbsp;Privacy Policy
        </Text>
      </View>
       </TouchableOpacity>




          <TouchableOpacity  onPress={() =>  this.props.navigation.goBack()}>

         <Text style={styles.createaccount} >
        <Text style={styles.account} >
        Already have an account?
        </Text>
       &nbsp;Sign In
        </Text>
        </TouchableOpacity>





     </KeyboardAwareScrollView>



    );
  }
}
export default Signup;
