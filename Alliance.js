import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Linking,
  ActivityIndicator,
  NetInfo,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import store from 'react-native-simple-store';

const GLOBAL = require('./Global');
const regex = /(<([^>]+)>)/ig;
import HTML from 'react-native-render-html';

const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 )

class Alliance extends Component {
static navigationOptions = {
          title: 'Alliances',
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

  constructor(props) {
    super(props)
    this.state = {
      status : '',
      industry_id : '',
      loading : '',
      moviesList: []
    }
  }

  _keyExtractor = (item, index) => item.categoryID;

  renderRowItem = (itemData) => {

    return (

      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 0.5,
    flexDirection:'column',
    shadowOpacity: 0.5, backgroundColor:'white',borderRadius:5,  width : equalWidth ,marginLeft : 5,marginRight:5,marginTop:5,marginBottom:5, elevation:2}}>
      <Image
          style={{ width: 170, height : 100, marginLeft:10,resizeMode:'stretch',marginTop:10}}
          source={{ uri: itemData.item.image }}/>
          <Text style={{color:'black', fontSize: 15,textAlign:'left',marginTop:10, marginLeft:6, marginRight:6, fontWeight:'bold'}}>{itemData.item.alliance}</Text>

          {itemData.item.description=="" &&(
<Text style={{fontSize: 12,textAlign:'left',marginTop:6, marginLeft:6, marginRight:6}}>No description found!</Text>

          )}

          {itemData.item.description!="" &&(
<Text style={{fontSize: 12,textAlign:'left',marginTop:6, marginLeft:6, marginRight:6}}>{itemData.item.description}</Text>

          )}
          
          {itemData.item.website==""&&(
                            <Text style={{ fontSize: 15,textAlign:'left',margin:6}}>No link found!</Text>

          )}
          {itemData.item.website!=""&&(
          <TouchableOpacity onPress={()=>Linking.openURL('http://'+itemData.item.website)}>
                  <Text style={{color:'#0000EE', fontSize: 15,textAlign:'left',margin:6}}>{itemData.item.website}</Text>
                  </TouchableOpacity>

          )}
         </View>

    )
  }


   showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


    componentDidMount() {
    this.props.navigation.addListener('willFocus',this._handleStateChange);

    // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    // NetInfo.isConnected.fetch().done(
    //   (isConnected) => { this.setState({ status: isConnected }); }
    // );
}
componentWillUnmount() {
    //NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}


  getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))
         this.setState({ moviesList: responseJson.alliances})

}

  _handleStateChange = state => {
   //alert('hoho')
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){

  store.get('brandsim') .then((res) => this.getOFF(res) )

  }

});

function handleFirstConnectivityChange(isConnected) {
 // alert('Then, is ' + (isConnected ? 'online' : 'offline'));
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}
NetInfo.isConnected.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);

   this.getMoviesFromApiAsync()
 };


handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')

        }else {

        }
        console.log(`is connected: ${this.state.status}`);
}

  componentWillMount() {
      const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');

      this.setState({industry_id: itemId})
      this.props.navigation.addListener('willFocus',this._handleStateChange);

      {this.getMoviesFromApiAsync()}

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
      <View style={{flex:1, flexDirection:'column',backgroundColor:'#f2f2f2', width:window.width, height:window.height}}>
        <FlatList style= {{ marginTop:0,backgroundColor:'#f2f2f2', marginTop:5, marginLeft:5, marginBottom:5, marginRight:5}}
          data={this.state.moviesList}
          numColumns={1}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={this.renderRowItem}
        />
      </View>

    );
  }


  getMoviesFromApiAsync = () => {
       this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.get_all_alliances

      fetch(url, {
  method: 'GET',

}).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson[0].status == true){
      

       this.setState({ moviesList: responseJson[0].alliances})
      }

       this.hideLoading();
    })
    .catch((error) => {
      console.error(error);
       this.hideLoading();
    });
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: 'column'
  }
});
export default Alliance;
