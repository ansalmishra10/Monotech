import { createStackNavigator ,createAppContainer ,createDrawerNavigator} from 'react-navigation';
import Login from './Login.js';
import Signup from './Signup.js';
import Otp from './Otp.js';
import Home from './Home.js';
import Enquiry from './Enquiry.js';
import Drawer from './Drawer.js';
import Request from './Request.js';
import SendEnquiry from './SendEnquiry.js';
import Suppourt from './Suppourt.js';
import Detail from './Detail.js';
import Alliance from './Alliance.js';
import Product from './Product.js';
import Gallery from './Gallery.js';
import Forget from './Forget.js';
import Category from './Category.js';
import Notification from './Notification.js';
import Model from './Model.js';
import About from './About.js';
import Gst from './Gst.js';
import Splash from './Splash.js';
import ChangePassword from './ChangePassword.js';
import Terms from './Terms.js';
import Review from './Review.js';
import Sample from './Sample.js';
import EditProfile from './EditProfile.js';
import ListBookmark from './ListBookmark.js';
import Brand from './Brand.js';
import Feedback from './Feedback.js';
import ViewReview from './ViewReview.js';
import {NavigationActions} from 'react-navigation';
import React, {Component} from 'react';
const GLOBAL = require('./Global');
import {Platform, StyleSheet,TouchableOpacity,Image, Text, View ,Button, Share} from 'react-native';

const DrawerNavigator = createDrawerNavigator({
    Home:{
        screen: Home ,

    navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  }

},{
    initialRouteName: 'Home',
    contentComponent: Drawer,
    drawerWidth: 250
});



const StackNavigator = createStackNavigator({

Splash: { screen: Splash },
   Login: { screen: Login },
   Signup: { screen: Signup },
   Otp: { screen: Otp },


    Forget: { screen: Forget ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  },






DrawerNavigator: {
    screen: DrawerNavigator,

    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#ffffff',
      headerStyle: {
      backgroundColor: '#e41582',
      title: 'Send Enquiry',
    },
    headerLeft:
 <View style={{flex:1, flexDirection:'row'}}>
   <TouchableOpacity onPress={() =>navigation.toggleDrawer()}>
    <Image style = {{margin :20 ,height :30 ,width :30, resizeMode:'contain'}}
           source={require('./menu.png')} />
            </TouchableOpacity>

           <Text style={{width: 300, fontSize:18, fontWeight:'bold',padding:10, color:'white',marginTop:12}}>Monotech Systems</Text>
  </View>
    ,
   headerRight: <TouchableOpacity onPress={() =>
     navigation.navigate('Notification')
 }>
    <Image style = {{margin :15 ,height :28 ,width :28, resizeMode:'contain'}}
           source={require('./bell.png')} />
    </TouchableOpacity>,
  }),




  },

  SendEnquiry: { screen: SendEnquiry ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  },

  Sample: { screen: Sample ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  },

  Brand: { screen: Brand ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  },
  Alliance: { screen: Alliance ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  },
ChangePassword: { screen: ChangePassword ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  },

  Gst: { screen: Gst ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  },
  Terms: { screen: Terms ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: '#ffffff',
     tintColor: {
     color: '#ffffff'
    },
    headerTitleStyle: { color: 'black' }
    },

  }),
  },

 Category: { screen: Category ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582'
    },
headerRight: <TouchableOpacity onPress={() =>
     navigation.navigate('SendEnquiry')
 }>
    <Image style = {{margin :15 ,height :25 ,width :25, resizeMode:'contain'}}
           source={require('./send.png')} />
    </TouchableOpacity>,
  }),
  },






 Enquiry: { screen: Enquiry ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582'
    },

  }),
  },




  Suppourt: { screen: Suppourt ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'black' }
    },

  }),
  },



About: { screen: About ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'black' }
    },

  }),
  },

Gallery: { screen: Gallery ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'black' }
    },

  }),
  },


ViewReview: { screen: ViewReview ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'black' }
    },

  }),
  },

Notification: { screen: Notification ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'black' }
    },

  }),
  },

Feedback: { screen: Feedback ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'black' }
    },

  }),
  },

  EditProfile: { screen: EditProfile ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'black' }
    },

  }),
  },
 Product: { screen: Product ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582'
    },
headerRight:
<TouchableOpacity onPress={() =>
     navigation.navigate('SendEnquiry')
 }>
    <Image style = {{margin :15 ,height :25 ,width :25, resizeMode:'contain'}}
           source={require('./send.png')} />
    </TouchableOpacity>,
  }),
  },

   ListBookmark: { screen: ListBookmark ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582'
    },

  }),
  },

  Model: { screen: Model ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582'
    },
headerRight:
<TouchableOpacity onPress={() =>
     navigation.navigate('SendEnquiry')
 }>
    <Image style = {{margin :15 ,height :25 ,width :25, resizeMode:'contain'}}
           source={require('./send.png')} />
    </TouchableOpacity>,

  }),
  },



 Detail: { screen: Detail ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'black' }
    },
headerRight: <View style={{flexDirection:'row', marginRight:10}}>

<TouchableOpacity onPress={() =>
     navigation.replace('DrawerNavigator')
 }>
    <Image style = {{marginTop :2,marginLeft:10,height :24 ,width :24, resizeMode:'contain'}}
           source={require('./homee.png')} />
    </TouchableOpacity>

<TouchableOpacity onPress={() =>
     navigation.navigate('SendEnquiry')
 }>
    <Image style = {{marginTop :3,marginLeft:14,height :25 ,width :25, resizeMode:'contain'}}
           source={require('./send.png')} />
    </TouchableOpacity>

    <TouchableOpacity onPress= {()=>Share.share({
      message:'Checkout '+''+ GLOBAL.share_product_name +' '+GLOBAL.share_url, url:GLOBAL.share_url
    },{
      tintColor:'green',
      dialogTitle:'Share this product via....'
    }
    ).then(this._showResult)}>
    <Image style = {{height :24 ,marginLeft:10,marginTop:3,marginRight:10,width :24, resizeMode:'contain'}}
           source={require('./share.png')} />
    </TouchableOpacity>

    </View>,
  }),
  },
   Request: { screen: Request ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'black' }
    },

  }),
  },

    Review: { screen: Review ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582'
    },

  }),
  },
});

export default createAppContainer(StackNavigator);
