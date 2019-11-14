import React, {Component} from 'react';
import {Platform, StyleSheet, Text,AsyncStorage,NetInfo,ActivityIndicator, View ,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import store from 'react-native-simple-store';

import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
 class Feedback extends Component<Props> {


static navigationOptions = {
          title: 'Feedback',
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
      businees: '',
      message: '',
      cno:'',
      city: '',
      state: '',
      userid: '',
      description: '',
      status :'',
      loading :'',mname:'', mnumber:''
    }
}
  
   componentWillMount() {

store.get('get_profile') .then((res) => this.getOFF(res) )

//    this.getMoviesFromApiAsync();
//    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }



getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))
    this.setState({name:responseJson.user_detail.name})
    this.setState({businees:responseJson.user_detail.organisation})
    this.setState({email:responseJson.user_detail.email})
    this.setState({businessaddress:responseJson.user_detail.businessaddress})
    this.setState({business:responseJson.user_detail.organisation})
    this.setState({cno: responseJson.user_detail.mobile})

}

  buttonClickListener = () =>{
   
    if (this.state.name == ''){
      alert('Please Enter Name')
    }  else if (this.state.businees == ''){
      alert('Please Enter Company Name')
    } 
        else if (this.state.email == ''){
      alert('Please Enter Email')
    } else if (this.state.cno == ''){
      alert('Please Enter Contact Number')
    }
     else if (this.state.description == ''){
      alert('Please Enter Feedback')
    } 

      else {
      this.showLoading();
      const url = GLOBAL.BASE_URL +  GLOBAL.submit_feedback
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: this.state.userid,
    name: this.state.name,
    mobile: this.state.cno,
    email: this.state.email,
    company_name: this.state.businees,
    feedback:this.state.description,
   

  }),
}).then((response) => response.json())
    .then((responseJson) => {
      
      
       this.hideLoading()
       if (responseJson.status == true) {
//alert(JSON.stringify(responseJson))
       Alert.alert('Thank You!','Feedback submitted successfully. We will look over your feedback and get back to you.')

    
       }
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }
  }
showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')
        }
        console.log(`is connected: ${this.state.status}`);
}


  render() {
 // var value =  AsyncStorage.getItem('userID');
 //    value.then((e)=>{
 //     this.setState({userid:e})
 //    }) 
   
    if(this.state.loading){
      return(
        <View style={{flex: 1}}>
        <ActivityIndicator style = {styles.loading}

       size="large" color="#e41582" />
        </View>
      )
    }
    return (
    <KeyboardAwareScrollView style={styles.container2}
    keyboardShouldPersistTaps='always'>
     
      <View style={{ padding :5, shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,borderRadius: 4,backgroundColor : '#ffffff',margin:10,width :window.width - 20, flex: 1, }}>
          
          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000'}} 
                                   placeholder="Name"
                                   placeholderTextColor='grey'
                                  value={this.state.name}                                   
                                  onChangeText={(text) => this.setState({name:text})} 
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>


          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000'}} 
                                   placeholder="Company Name"
                                   placeholderTextColor='grey'
                                  value={this.state.businees}
                                  onChangeText={(text) => this.setState({businees:text})} 
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>

          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000'}} 
                                   placeholder="Email"
                                   autoCapitalize={'none'}
                                   placeholderTextColor='grey'
                                                                    value={this.state.email}
                                  onChangeText={(text) => this.setState({email:text})} 
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>

          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000'}} 
                                   placeholder="Contact No."
                                   keyboardType='numeric'
                                   maxLength={10}
                                   placeholderTextColor='grey'
                                                                    value={this.state.cno}
                                  onChangeText={(text) => this.setState({cno:text})} 
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>

          <TextInput  style={{ fontSize: 13, marginLeft: 6 ,marginRight:6, color : '#000000', height:100}} 
                                   placeholder="Enter Feedback"
                                   placeholderTextColor='grey'
                                                                     textAlignVertical={'top'}
                                   multiline={true}

                                                                    value={this.state.description}
                                  onChangeText={(text) => this.setState({description:text})} 
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:6, marginRight:6 }}/>

         <Button
           containerStyle={{margin: 6,marginBottom:15,marginTop : 20,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}
   
            style={{fontSize: 14, color: 'white'}}

          onPress={this.buttonClickListener}>
        SUBMIT FEEDBACK
        </Button>


        </View>



      
    

     </KeyboardAwareScrollView>
    );
  }
}
export default Feedback; 