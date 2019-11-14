import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,NetInfo,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import store from 'react-native-simple-store';


type Props = {};
 class Suppourt extends Component<Props> {

static navigationOptions = {
          title: 'Customer Support',
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
      name: '',
      email: '',
       message: '',
       status :'' ,
       companyname:'',
       cno:'',
       pname:'',
       pserialno:'',
       loading : '',
       userid : '',
       mobile:'',
    }
//    store.get('get_profile') .then((res) => this.getOFF(res) )
}

showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }
    getOFF =(responseJson)=>{
    //  alert(JSON.stringify(responseJson))
        this.setState({name:responseJson.user_detail.name})
        this.setState({companyname:responseJson.user_detail.organisation})
        this.setState({email:responseJson.user_detail.email})
        this.setState({businessaddress:responseJson.user_detail.businessaddress})
        this.setState({business:responseJson.user_detail.organisation})
        this.setState({cno: responseJson.user_detail.mobile})

    }
   componentWillMount() {


    store.get('get_profile') .then((res) => this.getOFF(res) )

    //    this.getMoviesFromApiAsync();
    //    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

//    this.getMoviesFromApiAsync();
//    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))
    this.setState({name:responseJson.user_detail.name})
    this.setState({companyname:responseJson.user_detail.organisation})
    this.setState({email:responseJson.user_detail.email})
    this.setState({businessaddress:responseJson.user_detail.businessaddress})
    this.setState({business:responseJson.user_detail.organisation})
    this.setState({cno: responseJson.user_detail.mobile})

}


getMoviesFromApiAsync1 = () => {
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
//    alert(JSON.stringify(responseJson))
    this.setState({name:responseJson.user_detail.name})
    this.setState({email:responseJson.user_detail.email})
    this.setState({companyname:responseJson.user_detail.organisation})
    this.setState({businessaddress:responseJson.user_detail.businessaddress})
    this.setState({business:responseJson.user_detail.organisation})
    this.setState({cno: responseJson.user_detail.mobile})
       }
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });


  }


handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')
        }
        console.log(`is connected: ${this.state.status}`);
}
   buttonClickListener = () =>{

    if (this.state.name == ''){
      alert('Please Enter Name')
    }    else if (this.state.companyname == ''){
      alert('Please Enter Company Name')
    }    else if (this.state.email == ''){
      alert('Please Enter Email')
    }    else if (this.state.cno == ''){
      alert('Please Enter Contact Number')
    }    else if (this.state.pname == ''){
      alert('Please Enter Product Name')
    }    else if (this.state.pserialno == ''){
      alert('Please Enter Product Serial Number')
    }
      else if (this.state.message == ''){
      alert('Please Enter Message')
    }

       else {
      this.showLoading();
      const url = GLOBAL.BASE_URL +  GLOBAL.need_help
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: this.state.userid,
    name: this.state.name,
    company_name: this.state.companyname,
    mobile : this.state.cno,
    machine_name: this.state.pname,
    machine_serial: this.state.pserialno,
    email: this.state.email,
    message: this.state.message,


  }),
}).then((response) => response.json())
    .then((responseJson) => {


       this.hideLoading()
       if (responseJson.status == true) {

       alert('Thank You! We’ve received your message and will get back to you shortly.')




       }
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
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
    <KeyboardAwareScrollView style={styles.container2}
keyboardShouldPersistTaps='always'
    >

      <View style={{ padding :5, shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,borderRadius: 8,backgroundColor : '#ffffff',margin : 10,width :window.width - 20, flex: 1, alignSelf: 'auto' }}>


      <Text style={{ fontSize: 18,fontWeight:'bold', marginLeft:10,marginRight:10,textAlign: 'center' ,color : '#000000'}}>WE'RE HERE TO HELP.</Text>

<View style ={{flexDirection:'row'}}>
       <Image style={{ marginLeft: 10 ,height:20,width:20,marginTop:10, resizeMode:'contain'}}
                             source={require('./phone.png')} />

        <Text  style={{fontSize: 14, color: 'black' ,marginLeft: 10, height:25,marginTop:10, fontWeight:'bold'}}

        onPress={() =>  Linking.openURL(`tel: 1 800 102 4567`)}>
        1 800 102 4567 (Toll Free)
        </Text>
        </View>
      <View style = {{ marginTop :10,flexDirection: 'row',}}>


       <Image style={{ marginLeft: 10 ,height:20,width:20,marginTop:1, resizeMode:'contain'}}
                             source={require('./phone.png')} />


<View  style={{flexDirection:'row',}}>

        <Text  style={{fontSize: 14, color: 'black' ,marginLeft: 10, height:25,}}

        onPress={() =>  Linking.openURL(`tel: +91 893 942 4567`)}>
        +91 893 942 4567,
        </Text>
        <Text  style={{fontSize: 14, color: 'black' ,marginLeft: 5, height:25,}}

        onPress={() =>  Linking.openURL(`tel: +91 893 987 4567`)}>
        +91 893 987 4567
        </Text>
        </View>
       </View>


          <View style = {{flex:1,flexDirection: 'row' ,marginTop :10,}}>
         <Image style={{ marginLeft: 10 ,height:20,width:20,marginTop:1, resizeMode:'contain'}}
                             source={require('./emails.png')} />

        <Text  style={{fontSize: 14, color: 'black' ,marginLeft: 10, height:25,}}

        onPress={() =>  Linking.openURL('mailto: mcms@monotech.in')}>
        mcms@monotech.in
        </Text>
        </View>

<Text style={{alignSelf:'center', borderRadius:15,borderWidth: 1,padding:3,color:'#e41582',borderColor:'#e41582',marginTop:20, fontSize:15, width:30 , height:30}}
>OR</Text>

          <Text style={{ fontSize: 18,fontWeight:'bold', marginLeft: 6 ,textAlign :'center',marginTop :20,color : '#000000'}}>LEAVE US A MESSAGE</Text>

          <TextInput  style={{ fontSize: 13, marginLeft: 10 ,marginTop:5, marginRight:10,color : '#000000',height :45}}
                                   placeholder="Name"
                                   value={this.state.name}
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({name:text})}
                                   />
                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:10, marginRight:10 }}/>

          <TextInput  style={{ fontSize: 13, marginLeft: 10 ,marginTop:5, marginRight:10,color : '#000000',height:45}}
                                   placeholder="Company Name"
                                   placeholderTextColor='grey'
                                   value={this.state.companyname}
                                  onChangeText={(text) => this.setState({companyname:text})}
                                   />
                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:10, marginRight:10 }}/>

          <TextInput  style={{ fontSize: 13, marginLeft: 10 ,marginTop:5, marginRight:10,color : '#000000',height:45}}
                                   placeholder="Email"
                                   placeholderTextColor='grey'
                                   value={this.state.email}
                                   autoCapitalize={'none'}
                                  onChangeText={(text) => this.setState({email:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:10, marginRight:10 }}/>


          <TextInput  style={{ fontSize: 13, marginLeft: 10 ,marginTop:5, marginRight:10,color : '#000000',height:45}}
                                   placeholder="Contact Number"
                                   keyboardType='numeric'
                                   value={this.state.cno}
                                   placeholderTextColor='grey'
                                   maxLength={10}
                                  onChangeText={(text) => this.setState({cno:text})}
                                   />
                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:10, marginRight:10 }}/>


          <TextInput  style={{ fontSize: 13, marginLeft: 10 ,marginTop:5, marginRight:10,color : '#000000',height:45}}
                                   placeholder="Product Name"
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({pname:text})}
                                   />
                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:10, marginRight:10 }}/>



          <TextInput  style={{ fontSize: 13, marginLeft: 10 ,marginTop:5, marginRight:10,color : '#000000',height:45}}
                                   placeholder="Product Serial No."
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({pserialno:text})}
                                   />
                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:10, marginRight:10 }}/>

          <TextInput  style={{ fontSize: 13, marginLeft: 10 ,marginTop:5, marginRight:10,color : '#000000', height:100}}
                                   placeholder="Message"
                                   placeholderTextColor='grey'
                                   textAlignVertical={'top'}
                                   multiline={true}
                                  onChangeText={(text) => this.setState({message:text})}
                                   />

                    <Image style={{ height :1,backgroundColor : '#c0c0c0',marginLeft:10, marginRight:10 }}/>


          <Button
           containerStyle={{margin: 8,marginTop : 30,marginBottom : 30,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

            style={{fontSize: 14, color: 'white'}}

          onPress={this.buttonClickListener}>
        SEND
        </Button>

        </View>






     </KeyboardAwareScrollView>
    );
  }
}
export default Suppourt;
