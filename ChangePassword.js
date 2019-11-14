import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
import OTPInput from 'react-native-otp';
const window = Dimensions.get('window');


type Props = {};
 class ChangePassword extends Component<Props> {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  
  }



static navigationOptions = {
          title: 'Change Password',
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



  constructor(props) {
    super(props)
    this.state = {
   otp: '',
    newpassword:'',
    confirmpassword:'',
    }
  }

buttonclick=()=>{

  

}

  render() {
    return (
      <View style ={{flex:1, alignItems:'center', flexDirection:'column'}}>
    <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>


    <Image style={{width:150, height:200, resizeMode:'contain', alignSelf:'center', margin:10}}
    source={require('./otp.png')}/>

                 <View style={styles.passwordviewBackground}>
                           <Image style={styles.icon}
                             source={require('./password.png')} />
                                <TextInput   style={styles.welcome1}
                                      placeholder="New Password"
                                    secureTextEntry={true} 
                                  onChangeText={(text) => this.setState({newpassword:text})} 
                                   />
                      
                 </View>

                 <View style={styles.passwordviewBackground}>
                           <Image style={styles.icon}
                             source={require('./password.png')} />
                                <TextInput   style={styles.welcome1}
                                      placeholder="Confirm Password"
                                    secureTextEntry={true} 
                                  onChangeText={(text) => this.setState({confirmpassword:text})} 
                                   />
                      
                 </View>

                <Button
           containerStyle={{width:window.width-30,marginLeft : 15,marginTop : 15,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}
   
            style={{fontSize: 14, color: 'white'}}

        onPress={()=>this.buttonclick}>
         Submit
        </Button>

     </KeyboardAwareScrollView>
     </View>
    );
  }
}
export default ChangePassword; 