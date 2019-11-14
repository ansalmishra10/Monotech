import React, {Component} from 'react';
import {NavigationActions,StackActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View ,Linking,AsyncStorage,Image,TouchableOpacity,Alert} from 'react-native';
import { DrawerActions } from 'react-navigation';
import styles from './Style.js';
import UserAvatar from 'react-native-user-avatar';

const GLOBAL = require('./Global');

class Drawer extends Component {

 constructor(props){
    super(props)
 const { navigation } = this.props;
    this.state = {
      my: 'sdf',

    }
}

  componentWillMount() {

     var value =  AsyncStorage.getItem('name');
    value.then((e)=>{

      GLOBAL.name = e;

    this.setState({my: GLOBAL.name})
    })

}


_YesLogout=()=>{

       const url = GLOBAL.BASE_URL +  'logout'
//      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id : GLOBAL.userid,
  }),
}).then((response) => response.json())
    .then((responseJson) => {
              
//    alert(JSON.stringify(responseJson)) 
  //     this.hideLoading()
       if (responseJson.status == true) {
  AsyncStorage.removeItem('userID');

   this.props
   .navigation
   .dispatch(StackActions.reset({
     index: 0,
     actions: [
       NavigationActions.navigate({
         routeName: 'Login',
         params: { someParams: 'parameters goes here...' },
       }),
     ],
   }))


    this.props.navigation.dispatch(DrawerActions.closeDrawer())

       }else {
           alert('Something Went Wrong.')
       }
    })
    .catch((error) => {
      console.error(error);
    });
    }


navigateToScreen1 = (route) => () => {

    Alert.alert('Logout!','Are you sure you want to Logout?',
      [{text:"Cancel"},
        {text:"Yes", onPress:()=>this._YesLogout()
 },
      ],
      {cancelable:false}
      )

  }


  navigateToScreen = (route) => () => {

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }

  render () {

    return (
      <View>
        <ScrollView>
          <View>

            <View  style={styles.headertop}>
           

           <UserAvatar style={{marginTop:18, marginLeft:10}}
           size="65" name={this.state.my} colors={['#e41582']}/>

<View style={{flexDirection:'column', marginTop:15, marginLeft:10}}>
         <Text style = {{marginTop:10,color : '#ffffff',marginLeft : 10,fontSize: 15, fontWeight:'bold', height:'auto',}} >
          {GLOBAL.name}
         </Text>
          <Text style = {styles.drawerText} >
          {GLOBAL.mobile}
         </Text>
</View>
          <TouchableOpacity style={{position:'absolute', top:70, right:70}}
          onPress={this.navigateToScreen('EditProfile')}>
          
          <Image style={{width:20, height:20, resizeMode:'contain'}} source={require('./pen.png')}/>
          </TouchableOpacity>
         
            </View>


             <View style={styles.menuItem}>
               <Image style={styles.drawericon}
                             source={require('./suppourt.png')} />
              <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('Enquiry')}>
                My Enquiry
              </Text>
            </View>

             <View style={styles.menuItem}>
             <Image style={styles.drawericon}
                             source={require('./about.png')} />

            <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('Suppourt')}>
                Customer Support
              </Text>
            </View>


              <View style={styles.menuItem}>
                  <Image style={styles.drawericon}
                             source={require('./favourite.png')} />
             <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('ListBookmark')}>
                Favourites
              </Text>
            </View>


             <View style={styles.menuItem}>

                 <Image style={styles.drawericon}
                             source={require('./enquiry.png')} />
             <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen('About')}>
                About Us
              </Text>
            </View>


            <View style={styles.menuItem}>

                <Image style={styles.drawericon}
                            source={require('./layout.png')} />
            <Text style = {styles.drawerTexts}
             onPress={this.navigateToScreen('Brand')}>
               Brands
             </Text>
           </View>


           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./shake.png')} />
           <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('Alliance')}>
              Alliances
            </Text>
          </View>



           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./gst.png')} />
           <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('Gst')}>
              GST Details
            </Text>
          </View>


           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./term.png')} />
           <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('SendEnquiry')}>
            Request a Consumable
            </Text>
          </View>

           <View style={styles.menuItem}>

               <Image style={styles.drawericon}
                           source={require('./feedback.png')} />
           <Text style = {styles.drawerTexts}
            onPress={this.navigateToScreen('Feedback')}>
            Feedback
            </Text>
          </View>


             <View style={styles.menuItem}>
               <Image style={styles.drawericon}
                             source={require('./logout.png')} />
              <Text style = {styles.drawerTexts}
              onPress={this.navigateToScreen1('Login')}>

                Logout
              </Text>
            </View>


             <View style={styles.menuItem}>
              <Text style = {{width: 180,height: 20,marginLeft : 10,}}>

                Follow us
              </Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress ={()=>Linking.openURL('https://www.facebook.com/monotechsystems')}>
                <Image style={styles.drawersocial}
                             source={require('./facebooks.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress ={()=>Linking.openURL('https://www.linkedin.com/company/monotech-systems?trk=tyah&trkInfo=tas%3Amonotech%20s%2Cidx%3A1-1-1')}>
               <Image style={styles.drawersocial}
                             source={require('./lin.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress ={()=>Linking.openURL('https://twitter.com/monotechsystems')}>
               <Image style={styles.drawersocial}
                             source={require('./twitter.png')} />
              </TouchableOpacity>
               <TouchableOpacity onPress ={()=>Linking.openURL('https://www.youtube.com/user/monotechsystem')}>
              
               <Image style={styles.drawersocial}
                             source={require('./youtube.png')} />
                </TouchableOpacity>
              </View> 
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

Drawer.propTypes = {
  navigation: PropTypes.object
};

export default Drawer;
