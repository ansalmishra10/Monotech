import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text, View,NetInfo,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import styles from './Style.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import StarRatingBar from 'react-native-star-rating-view/StarRatingBar';
import { Rating, AirbnbRating } from 'react-native-ratings';
import store from 'react-native-simple-store';
import { DrawerActions } from 'react-navigation';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');

type Props = {};
 class Review extends Component<Props> {



static navigationOptions = {
          title: 'Review',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:100
          },
      };





  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      name: GLOBAL.userInfo.name,
      email: GLOBAL.userInfo.email,
       message: '',
       status :'' ,
       loading : '',
       userid : '',

    }
}

  ratingCompleted(rating) {
  GLOBAL.rating =  rating.toString()
//  alert("Rating is: " + rating)
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

        this.setState({email:responseJson.user_detail.email})

      }

    componentWillMount() {

   store.get('get_profile') .then((res) => this.getOFF(res) )

   //    this.getMoviesFromApiAsync();
   //    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }


   buttonClickListener = () =>{
     NetInfo.isConnected.fetch().done(
           (isConnected) => {

           b = isConnected



    if (this.state.name == ''){
      alert('Please Enter Name')
    }    else if (this.state.email == ''){
      alert('Please Enter Email')
    }  else if (this.state.message == ''){
      alert('Please Enter Message')
    }else if (b == false){
      alert('We seems you are offline . We submit your Review')

      Realm.open({
          schema: [{name: 'Requests', properties: {ids:'string',user_id: 'string',product_id :'string',name: 'string',email :'string',business_name: 'string',city :'string',state: 'string',description :'string',status:'string',mno:'string'}}]
        }).then(realm => {
          realm.write(() => {
            var a = realm.objects('Requests')
            var as = a.length.toString()
            realm.create('Requests',{ids:as,user_id: this.state.userid,product_id :GLOBAL.productid,name: this.state.name,email :this.state.email,business_name: this.state.message,city :GLOBAL.rating,state: '',description :'',status:'review',mno:'1'});
          });
          this.setState({ realm });
          var info =  this.state.realm.objects('Requests')

//          alert(JSON.stringify(info))

          realm.close()
})

    }

      else {
      this.showLoading();

      const url = GLOBAL.BASE_URL +  GLOBAL.rating_product
      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: GLOBAL.userid,
    name: this.state.name,
    email: this.state.email,
    review: this.state.message,
    product_id :GLOBAL.productid ,
    rating : GLOBAL.rating,


  }),
}).then((response) => response.json())
    .then((responseJson) => {


       this.hideLoading()
       if (responseJson.status == true) {


       alert('Your Review has been Successfully Submitted')




       }

    })
    .catch((error) => {
      console.error(error);
       this.hideLoading()
    });
    }
  })
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



      <View style={{  shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 1.0,borderRadius: 8,backgroundColor : '#ffffff',margin : 15,marginTop : 25,width :window.width - 30, flex: 1, alignSelf: 'auto' }}>

  
<AirbnbRating
  count={5}
  onFinishRating={this.ratingCompleted}
  defaultRating={3}
  size={35}
fractions
/>

          <TextInput  style={{ fontSize: 13, margin: 8 ,color : '#000000'}}
                                   placeholder="Name"
                                   placeholderTextColor='grey'
                                   value = {this.state.name}
                                  onChangeText={(text) => this.setState({name:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 8 }}
           />

          <TextInput  style={{ fontSize: 13, margin: 8 ,color : '#000000'}}
                                   placeholder="Email"
                                   placeholderTextColor='grey'
                                   autoCapitalize={'none'}
                                    value = {this.state.email}
                                  onChangeText={(text) => this.setState({email:text})}
                                   />


                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 8 }}
           />

        <TextInput  style={{ fontSize: 13, margin: 8 ,color : '#000000'}}
                                   placeholder="Write Review"
                                   placeholderTextColor='grey'
                                  onChangeText={(text) => this.setState({message:text})}
                                   />



                    <Image style={{ height :1,backgroundColor : '#c0c0c0',margin : 6 }}
           />


          <Button
           containerStyle={{margin: 8,marginTop : 30,marginBottom : 30,padding:10, height:40, overflow:'hidden', borderRadius:4, backgroundColor: '#e41582'}}

            style={{fontSize: 14, color: 'white'}}

          onPress={this.buttonClickListener}>
        SUBMIT
        </Button>

        </View>






     </KeyboardAwareScrollView>
    );
  }
}
export default Review;
