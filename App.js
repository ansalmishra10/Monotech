import React, {Component} from 'react';
import {TouchableOpacity,Platform, AsyncStorage,StyleSheet, Text, View, Alert,TextInput,NetInfo} from 'react-native';
import NotifService from './NotifService';
import appConfig from './app.json';
import PushNotification from 'react-native-push-notification';
const GLOBAL = require('./Global');
import AppNavigator from './Navigator';
import {NavigationActions,StackActions} from 'react-navigation';
const Realm = require('realm');
type Props = {};
  var info;
export default class App extends Component<Props> {
constructor(props) {
    super(props);
    this.state = {
      senderId: appConfig.senderID,
      realm :null,
      myrequest :[],
    };
    NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.onInitialNetConnection
        );
//    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  onInitialNetConnection = (isConnected : boolean) => {
      console.log(`Is initially connected: ${isConnected}`);
//      alert(isConnected)
      if (isConnected == true){
        Realm.open({
                            schema: [{name: 'Requests', properties: {ids:'string',user_id: 'string',product_id :'string',name: 'string',email :'string',business_name: 'string',city :'string',state: 'string',description :'string',status:'string',mno:'string'}}]
          }).then(realm => {
            var a = realm.objects('Requests')


            this.setState({ realm });
             info =  a

            for(var i = 0; i <= info.length; i++){

var myid = info[i].ids
if (info[i].status == "request"){
  const url = GLOBAL.BASE_URL +  GLOBAL.submit_enquiry

  fetch(url, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
user_id: info[i].user_id,
product_id :info[i].product_id,
name: info[i].name,
email: info[i].email,
business_name: info[i].business_name,
city:info[i].city,
state:info[i].state,
description:info[i].description,


}),
}).then((response) => response.json())
.then((responseJson) => {


  if (responseJson.status == true) {




          realm.write(() => {
           var cars = realm.objects('Requests').filtered('ids = "'+myid+'"');
//    alert(JSON.stringify(cars))
    realm.delete(cars)
                        });

  alert('Your Enquiry has been Successfully Submitted. We will reach you soon.')



  }
})
.catch((error) => {
 console.error(error);
 var a = info[i].ids
// alert(a)
});
}
else if (info[i].status == "review") {

  const url = GLOBAL.BASE_URL +  GLOBAL.rating_product

  fetch(url, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({
user_id: info[i].user_id,
name: info[i].name,
email: info[i].email,
review: info[i].business_name,
product_id :info[i].product_id ,
rating : info[i].city,


}),
}).then((response) => response.json())
.then((responseJson) => {

//alert(JSON.stringify(responseJson))

   if (responseJson.status == true) {
     realm.write(() => {
      var cars = realm.objects('Requests').filtered('ids = "'+myid+'"');

realm.delete(cars)
                   });

   alert('Your Review has been Successfully Submitted')




   }

})
.catch((error) => {
  console.error(error);
   this.hideLoading()
});
} else if (info[i].status == "enquiry"){
  const url = GLOBAL.BASE_URL +  GLOBAL.submit_consumable_request
//alert(JSON.stringify(info[i]))
  fetch(url, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify({

  user_id: info[i].user_id,
  name: info[i].name,
  mobile: '',
  email: info[i].email,
  machine_name: info[i].product_id,
  machine_serial: info[i].mno,
  business_name: info[i].business_name,
  city:info[i].city,
  state:info[i].state,
  description:info[i].description,

}),
}).then((response) => response.json())
.then((responseJson) => {


  if (responseJson.status == true) {




          realm.write(() => {
           var cars = realm.objects('Requests').filtered('ids = "'+myid+'"');
//    alert(JSON.stringify(cars))
    realm.delete(cars)
                        });

                        Alert.alert('Thank You!','Your Enquiry has been Successfully Submitted. We will reach you soon!')




  }
})
.catch((error) => {
 console.error(error);
 var a = info[i].ids
 //alert(a)
});
}



                      }

                                   });




}


    //  NetInfo.isConnected.removeEventListener('connectionChange', this.onInitialNetConnection);
  };
  render() {
  //  <AppNavigator/>
    return (
<AppNavigator/>
      );
  }

  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000000",
    margin: 5,
    padding: 5,
    width: "70%",
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
  },
  textField: {
    borderWidth: 1,
    borderColor: "#AAAAAA",
    margin: 5,
    padding: 5,
    width: "70%"
  },
  spacer: {
    height: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  }
});
