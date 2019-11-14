import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,AsyncStorage,NetInfo,ActivityIndicator,Image,TouchableOpacity ,Alert,Container ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button'
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
import store from 'react-native-simple-store';
const GLOBAL = require('./Global');

type Props = {};
 class Request extends Component<Props> {


static navigationOptions = {
          title: 'Request Enquiry',
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
       business: '',
      message: '',
      city: '',
      state: '',
      userid: '',
      description: '',
      status :'',
      loading :'',
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
    this.setState({business:responseJson.user_detail.organisation})
    this.setState({email:responseJson.user_detail.email})
    this.setState({businessaddress:responseJson.user_detail.businessaddress})
    this.setState({business:responseJson.user_detail.organisation})
    this.setState({cno: responseJson.user_detail.mobile})

}


buttonClickListener = () =>{
NetInfo.isConnected.fetch().done(
        (isConnected) => {

        b = isConnected

        if (this.state.name == ''){
          alert('Please Enter Name')
        }  else if (this.state.business == ''){
          alert('Please Enter Company Name')
        }
            else if (this.state.email == ''){
          alert('Please Enter Email')
        }   else if (this.state.city == ''){
          alert('Please Enter City')
        } else if (this.state.state == ''){
          alert('Please Enter State')
        } else if (this.state.description == ''){
          alert('Please Enter Description')
        } else if (b == false){
          alert('We seems you are offline . We submit your request')







          Realm.open({
              schema: [{name: 'Requests', properties: {ids:'string',user_id: 'string',product_id :'string',name: 'string',email :'string',business_name: 'string',city :'string',state: 'string',description :'string',status:'string',mno:'string'}}]
            }).then(realm => {
              realm.write(() => {
                var a = realm.objects('Requests')
                var as = a.length.toString()
                realm.create('Requests',{ids:as,user_id: this.state.userid,product_id :GLOBAL.productid,name: this.state.name,email :this.state.email,business_name: this.state.business,city :this.state.city,state: this.state.state,description :this.state.description,status:'request',mno:'1'});
              });
              this.setState({ realm });
              var info =  this.state.realm.objects('Requests')

              //alert(JSON.stringify(info))

              realm.close()
})
}




           else {
          this.showLoading();
          const url = GLOBAL.BASE_URL +  GLOBAL.submit_enquiry
          this.showLoading()
          fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: GLOBAL.userid,
        product_id :GLOBAL.productid,
        name: this.state.name,
        email: this.state.email,
        business_name: this.state.business,
        city:this.state.city,
        state:this.state.state,
        description:this.state.description,


      }),
    }).then((response) => response.json())
        .then((responseJson) => {


           this.hideLoading()
           if (responseJson.status == true) {

           alert('Your Enquiry has been Successfully Submitted. We will reach you soon.')




           }
        })
        .catch((error) => {
          console.error(error);
           this.hideLoading()
        });
        }




         }
      );

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
    shadowOpacity: 1.0,borderRadius: 4,backgroundColor : '#ffffff',margin : 20,width :window.width - 40, flex: 1, alignSelf: 'auto' }}>


          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000'}}
                                   placeholder="Name"
                                   value={this.state.name}
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({name:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />




          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000',height:45}}
                                   placeholder="Company Name"
                                   value={this.state.business}
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({business:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />


          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000',height:45}}
                                   placeholder="Email"
                                   placeholderTextColor='grey'
                                   autoCapitalize={'none'}
                                   value={this.state.email}
                                  onChangeText={(text) => this.setState({email:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />

          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000',height:45}}
                                   placeholder="City"
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({city:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />

          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000',height:45}}
                                   placeholder="State"
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({state:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />

          <TextInput  style={{ fontSize: 13, margin: 6 ,color : '#000000',height:100}}
                                   placeholder="Description"
                                  textAlignVertical={'top'}
                                   multiline={true}
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({description:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />
         <Button
           containerStyle={{margin: 6,marginBottom:30,marginTop : 30,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

            style={{fontSize: 14, color: 'white'}}

         onPress={this.buttonClickListener}>
        SEND
        </Button>


        </View>






     </KeyboardAwareScrollView>
    );
  }
}
export default Request;
