import {StyleSheet, Platform,Dimensions} from 'react-native';
const window = Dimensions.get('window');
export default styles = StyleSheet.create({

   drawerText :{
      marginTop : 2,
      color : '#ffffff',
      marginLeft : 10,
      fontSize: 13,

  } ,
   loading: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        },

TextInputStyleClass:{
            marginLeft:10,
    marginRight:10,
    paddingLeft:100,
  height: 40,
  borderWidth: 1,
  borderColor: '#009688',
  borderRadius: 7 ,
  backgroundColor : "#FFFFFF"        
   },
  thumbnail: {
    width: 100,
    height: 100,
     borderRadius: 50,
     marginTop : 10,
     marginLeft : 10,

  },
  uploadAvatar :{
    marginTop : 20,
    width: 100,
    height: 100,
     borderRadius: 50,
     marginLeft : window.width/2 - 50,
  },

contentContainer: {
    marginTop: 50,
    paddingVertical: 20,
    backgroundColor: '#F5FCFF',
    height: 100,
  },
  wwelcome: {
    flex: 1,
    margin: 20,
    backgroundColor: 'orange',
    margin: 10,
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70,
  },

  viewBackgrounds: {
    width: window.width - 30,
    height: 40,
    borderWidth: 0.5,
    borderBottomWidth: 1,
    // borderLeftColor: '#008000',
    borderLeftWidth: 1,
    backgroundColor: 'white',
    // borderColor: '#DCDCDC',
    // borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopColor: '#DCDCDC',
    borderBottomColor: '#DCDCDC',
    borderLeftColor: '#DCDCDC',
    borderRightColor: '#DCDCDC',

  },

  viewBackground: {
    width: window.width - 30,
    height: 40,
     marginTop : 40,
    marginLeft : 15,
    borderWidth: 0.5,
    borderBottomWidth: 1,
    // borderLeftColor: '#008000',
    borderLeftWidth: 1,
    backgroundColor: 'white',
    // borderColor: '#DCDCDC',
    // borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopColor: '#DCDCDC',
    borderBottomColor: '#DCDCDC',
    borderLeftColor: '#DCDCDC',
    borderRightColor: '#DCDCDC',

  },


passwordviewBackground: {
    width: window.width - 30,
    height: 40,
     marginTop : 10,
    marginLeft : 15,
    borderWidth: 0.5,
    borderBottomWidth: 1,
    // borderLeftColor: '#008000',
    borderLeftWidth: 1,
    backgroundColor: 'white',
    // borderColor: '#DCDCDC',
    // borderRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopColor: '#DCDCDC',
    borderBottomColor: '#DCDCDC',
    borderLeftColor: '#DCDCDC',
    borderRightColor: '#DCDCDC',

  },
   icon: {
    borderLeftWidth: 1,
    width: 15,
    height: 15,
    marginLeft : 8 ,
    marginTop : 10,


  },
drawersocial: {
    borderLeftWidth: 1,
    width: 28,
    height: 28,
    marginLeft : 8 ,
    marginTop : 3,
    resizeMode:'contain'


  },

 drawericon: {
    borderLeftWidth: 1,
    width: 20,
    height: 20,
    marginLeft : 8 ,
    marginTop : 3,
    resizeMode:'contain'


  },


   drawerTexts: {

    width: 180,
    height: 22,
    marginLeft : 35 ,
    marginTop : -20,


  },

  facebookicon: {
    width: 15,
    height: 27,
    marginLeft : 15 ,
    marginTop : 6,


  },

  account :{
     marginTop : 20,
    textAlign : 'center',
    justifyContent:'center',
    color : '#808cac',

  } ,

  accounts :{
     marginTop : 20,
         textAlign : 'center',
    color : '#808cac',
    width : window.width - 30,

  } ,

createaccount :{
    marginLeft : 5,
        textAlign : 'center',
     marginTop : 30,
    color : '#e41582',

  } ,


headertop :{

    width : 300,
     height : 105,
    backgroundColor : '#373737',
    flexDirection:'row'
  } ,


and :{
    textAlign:'center',
    color : '#808cac',

  } ,

  andof :{
    marginLeft : 10,
    marginTop : 10,
    color : '#808cac',

  } ,

  privacy :{
      marginTop : 30,
     color : '#e41582',
     textAlign:'center'

  } ,

   gmailIcon: {
    width: 27,
    height: 27,
    marginLeft : 15 ,
    marginTop : 6,


  },





  textColor : {
    marginLeft : 50,

    color : '#ffffff',
    fontSize: 18,
      marginTop : -25,
   textAlign: 'center',
     width : window.width - 120,

  },



  otpColor : {
    color : 'black',
    fontSize: 20,
      marginTop : 10,
      alignSelf:'center',
      textAlign:'center',
     width : window.width - 20,

  },



     welcome1: {
    marginLeft : 50,
     width : window.width - 70,
     height : 40,
     marginTop: -25,
    fontSize: 16,
    textAlign: 'left',
    borderRightColor: '#DCDCDC',


   },

welcome2: {
    marginLeft : 50,
     width : window.width - 70,
     height : 40,
     marginTop: -25,
    fontSize: 16,
    textAlign: 'left',
    borderRightColor: '#DCDCDC',


   },



viewBackground1: {
    width: 40,
    height: 38,
    marginLeft: 5,
    borderBottomLeftRadius: 20,
    // borderLeftColor: '#008000',
    borderRightWidth: 1,
    backgroundColor: 'white',
    // borderColor: '#DCDCDC',
    // borderRadius: 10,

    borderRightColor: '#DCDCDC',


  },


   facebookColor: {



    width: window.width - 30,
    height: 40,
    marginLeft: 15,
    backgroundColor: '#284ca0',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderColor: '#DCDCDC',
    // borderRadius: 10,




  },


  gmailColor: {


    marginTop: 15,
    width: window.width - 30,
    height: 40,
    marginLeft: 15,
    backgroundColor: '#de584e',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // borderColor: '#DCDCDC',
    // borderRadius: 10,




  },



    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050',
    },

container2: {
        flex: 1,
        backgroundColor: '#f7f7f7',
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       
        backgroundColor: '#000000',
    },

stayElevated: {
    width: window.width - 20,
    height: 150,
    margin: 10,
    backgroundColor: 'black'
  },
    heading: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

     logoImage: {
         width: 250,
         height: 120,
         marginLeft : window.width/2 - 125 ,
         marginTop : 90,

    },


    otpImage: {
         width: 100,
         height: 100,
         marginTop : 50,
         alignSelf:'center'
    },

    containers: {
        flex: 1,

    },
    menuItem:{
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    }
});
