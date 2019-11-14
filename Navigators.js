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
import Product from './Product.js';
import Forget from './Forget.js';
import Category from './Category.js';
import Model from './Model.js';
import About from './About.js';
import Review from './Review.js';
import EditProfile from './EditProfile.js';
import ListBookmark from './ListBookmark.js';
import {NavigationActions} from 'react-navigation';
import React, {Component} from 'react';
import {Platform, StyleSheet,TouchableOpacity,Image, Text, View ,Button} from 'react-native';

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
    drawerWidth: 300
});

const StackNavigator = createStackNavigator({


    DrawerNavigator: {
    screen: DrawerNavigator,

    navigationOptions: ({ navigation }) => ({
      headerTintColor: '#ffffff',
      headerStyle: {
      backgroundColor: '#e41582',
      title: 'Send Enquiry',
    },
    headerLeft: <TouchableOpacity onPress={() =>
     navigation.openDrawer()
 }>
    <Image style = {{margin :15 ,height :30 ,width :30}}
           source={require('./menu.png')} />
    </TouchableOpacity>
    ,
   headerRight: <TouchableOpacity onPress={() =>
     navigation.navigate('SendEnquiry')
 }>
    <Image style = {{margin :15 ,height :30 ,width :30}}
           source={require('./send.png')} />
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

 Category: { screen: Category ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582'
    },

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

  }),
  },



 Detail: { screen: Detail ,
 navigationOptions: ({ navigation }) => ({
      headerStyle: {
      backgroundColor: '#e41582',
     headerTintColor: 'red',
    headerTitleStyle: { color: 'black' }
    },

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



});

export default createAppContainer(StackNavigator);