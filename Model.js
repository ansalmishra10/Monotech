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

 class Model extends Component {
static navigationOptions = ({navigation})=> ({
          title: GLOBAL.model_product_name,
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:250,
            marginRight:10

          },
      });

  constructor(props) {
    super(props)
    this.state = {
      status : '',
      industry_id : '',
      loading : '',
      productID : '',
       product : '',
      moviesList: []
    }
  }


resPress = (resId,resName,productID,res) => {

  if (resName == "1"){
    GLOBAL.main_id =  resId

   this.props.navigation.navigate('Model')
  } else {
    GLOBAL.description = res
    GLOBAL.productid = productID
  this.props.navigation.navigate('Detail')
  }

  }

 bookmarks = (productID) => {
//alert(productID)
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




getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))
//alert(GLOBAL.model)
       this.setState({ moviesList: GLOBAL.model})


}

  _handleStateChange = state => {
   //alert('hoho')
//        NetInfo.isConnected.fetch().then(isConnected => {
//  // alert('First, is ' + (isConnected ? 'online' : 'offline'));
//   if(isConnected ==false){
//             var so = 'mo' + GLOBAL.main_id
//   store.get(so) .then((res) => this.getOFF(res) )

//   }

// });
// function handleFirstConnectivityChange(isConnected) {
//  // alert('Then, is ' + (isConnected ? 'online' : 'offline'));
//   NetInfo.isConnected.removeEventListener(
//     'connectionChange',
//     handleFirstConnectivityChange
//   );
// }
// NetInfo.isConnected.addEventListener(
//   'connectionChange',
//   handleFirstConnectivityChange
// );

//    this.getMoviesFromApiAsync()
 };


  _keyExtractor = (item, index) => item.productID;

  renderRowItem = (itemData) => {
    return (
  <TouchableOpacity
    onPress={() => this.resPress(itemData.item.main_id, itemData.item.product,itemData.item.productID,itemData.item)}>

 
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
          source={{ uri: itemData.item.image }}        />

       <TouchableOpacity style = {{ width:100,marginLeft : - 25,marginTop : 20, height:100}}
       onPress={() => this.bookmarks(itemData.item.productID)} >

      <View style = {{ width:100, height:100}}>
      <Image
          source={{ uri: itemData.item.favrouite_img }}
          style={{width:36,marginLeft : - 15,marginTop : 2, height:32}}

          />
          </View>
          </TouchableOpacity >

       </View>
          <View style={{flex : 2}}>
          <Text style={{color:'#e41582', fontSize: 20, marginTop: 6 ,marginLeft :6}}>{itemData.item.product_name}</Text>
{itemData.item.description=="" &&(
<Text style={{height:0.5,marginTop :3 ,marginBottom :6 ,}}></Text>
)}
{itemData.item.description!="" &&(

          <ScrollView style={{ flex: 1 ,marginLeft : 6 ,marginTop :3 ,marginBottom :6 }}>
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


//     componentDidMount() {
//      this.props.navigation.addListener('willFocus',this._handleStateChange);

//     // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

//     // NetInfo.isConnected.fetch().done(
//     //   (isConnected) => { this.setState({ status: isConnected }); }
//     // );
// }
componentWillUnmount() {
//    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}

handleConnectionChange = (isConnected) => {
        this.setState({ status: isConnected });
        if (this.state.status == false){
          alert('You are not Connected to Internet')

        }else {

        }
        console.log(`is connected: ${this.state.status}`);
}

  componentDidMount() {
      const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
  //   this.props.navigation.addListener('willFocus',this._handleStateChange);

      this.setState({industry_id: itemId})
//      this.getMoviesFromApiAsync()

       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){
            var so = 'mo' + GLOBAL.main_id
  store.get(so) .then((res) => this.getOFF(GLOBAL.model) )

  }else{
    this.getMoviesFromApiAsync()
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

   //this.getMoviesFromApiAsync()

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


getMoviesFromApiAsync = () => {

       this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.dervie_detail_of_product

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    main_id: GLOBAL.main_id,
    user_id :GLOBAL.userid

  }),
}).then((response) => response.json())
    .then((responseJson) => {

      if (responseJson.status == true){
        // var so = 'mo' + GLOBAL.main_id
        // store.update(so,responseJson)

       this.setState({ moviesList: responseJson.derive_detail_category})
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
export default Model;
