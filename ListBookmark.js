import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  NetInfo,
  ScrollView,
  Dimensions,
} from 'react-native'; 
import store from 'react-native-simple-store';

import HTML from 'react-native-render-html';
const GLOBAL = require('./Global');
const regex = /(<([^>]+)>)/ig;
import Button from 'react-native-button';

const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 ) 

 class ListBookmark extends Component {
static navigationOptions = {
          title: 'Favourites',
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
      productID : '',
      moviesList: []
    }
  }


resPress = (resId,resName,productID) => {
  if (resName == "1"){
    GLOBAL.main_id =  resId
   this.props.navigation.navigate('Model')
  } else {
    GLOBAL.productid = productID
  this.props.navigation.navigate('Detail')
  }
  
  }

 bookmarks = (productID) => {
      const url = GLOBAL.BASE_URL +  GLOBAL.add_bookmark  
        fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    productID: productID,
    user_id :GLOBAL.userid,
  }),
}).then((response) => response.json())
    .then((responseJson) => {
    this.getMoviesFromApiAsync()
       
    })
    .catch((error) => {
      console.error(error);
      
    });

  
  }



getMoviesFromApiAsync1 = () => {
  
}

  _keyExtractor = (item, index) => item.productID;

  renderRowItem = (itemData) => {
    return (
  <TouchableOpacity 
    onPress={() => this.resPress(itemData.item.main_id, itemData.item.product,itemData.item.productID)}  >

      <View style={{ shadowColor: '#f7f7f7',
    shadowOffset: {
      width: 0,
      height: 3
    },
    justifyContent: 'center',
    shadowRadius: 0.5,
    shadowOpacity: 0.5,flex : 1, backgroundColor:'white',borderRadius:5,  width : equalWidth ,marginLeft : 10,marginRight:10,marginTop:10,marginBottom:1, elevation:2}}>
     
     <View style = {{flex : 1, flexDirection :'row'}}>
        
      <Image
          style={{ width: equalWidth, height : 180,margin :0, resizeMode:'stretch' }}
          source={{ uri: itemData.item.image }}
        />         
       </View>

          <View style={{flex : 1}}>
          <Text style={{color:'#e41582', fontSize: 20, marginLeft: 6 ,marginTop :6}}>{itemData.item.product_name}</Text>

{itemData.item.description=="" &&(
    <Text style={{height:0.5,marginTop :3 ,marginBottom :6 ,}}></Text>
  )}          
  {itemData.item.description!="" &&(
        <ScrollView style={{ flex: 1 ,marginLeft : 6 ,marginTop :3 ,marginBottom :6 , marginRight:6}}>
                <HTML html={itemData.item.description} imagesMaxWidth={Dimensions.get('window').width} />
            </ScrollView>
  
  )}
         
        </View>
         </View>

    </TouchableOpacity>

      
    
   
     
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
      <View style={styles.container}>
        <FlatList style= {{backgroundColor:'#f7f7f7',flexGrow:0, marginBottom:7}}
          data={this.state.moviesList}
          numColumns={1}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={this.renderRowItem}
        />
      </View>
    );
  }

 getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))
       this.setState({ moviesList: responseJson.bookmark_lists}) 

}

  _handleStateChange = state => {
   //alert('hoho')
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){

  store.get('bookmark') .then((res) => this.getOFF(res) )

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


  getMoviesFromApiAsync = () => {
       this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.list_bookmark
     
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id :GLOBAL.userid,
  }),
}).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == true){
        store.update('bookmark',responseJson)

       this.setState({ moviesList: responseJson.bookmark_lists}) 
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
    backgroundColor:'#f2f2f2',
    flexDirection: 'column'
  }
});
export default ListBookmark;