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
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import store from 'react-native-simple-store';
import HTML from 'react-native-render-html';
const GLOBAL = require('./Global');
const regex = /(<([^>]+)>)/ig;
import Button from 'react-native-button';
var arrayholder = [];
const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 )

 class Product extends Component {
static navigationOptions = ({navigation})=> ({
          title: GLOBAL.category_name,
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
       text:'',
       nodata:'',
      moviesList: []
    }
  }


resPress = (resId,resName,productID, url, product_name,res) => {
// alert(JSON.stringify(res))
  if (resName == "1"){
    GLOBAL.main_id =  resId
  GLOBAL.model_product_name= product_name
    GLOBAL.share_product_name = product_name
  GLOBAL.share_url = url
    GLOBAL.productid = productID
    GLOBAL.model = res.products_list
//alert(JSON.stringify(GLOBAL.main_id))
  this.props.navigation.navigate('Model')
  } else {
  // alert(url)
//  alert(product_name)
GLOBAL.description = res
  GLOBAL.share_product_name = product_name
  GLOBAL.share_url = url
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


clearSearch=()=>{
//this.setState({text:''})
this.props.navigation.replace('Product')
}


  _keyExtractor = (item, index) => item.productID;

  renderRowItem = (itemData) => {


    return (


  <TouchableOpacity

    onPress={() => this.resPress(itemData.item.main_id, itemData.item.product,itemData.item.productID, itemData.item.url, itemData.item.product_name,itemData.item) } >

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
          style={{ width: equalWidth+1, height : 180,margin :0,resizeMode:'stretch' }}
          source={{ uri: itemData.item.image }}/>

      <View style = {{flex : 1, width:100,marginLeft : - 25,marginTop : 20, height:100}}>

             <TouchableOpacity onPress={() => this.bookmarks(itemData.item.productID)} >
      <Image
          source={{ uri: itemData.item.favrouite_img }}
          style={{width:36,marginLeft : - 15,marginTop : 2, height:32, resizeMode:'contain'}}/>

          </TouchableOpacity >

          </View>
       </View>

          <View style={{flex : 1}}>
          <Text style={{ fontSize: 20, marginTop: 6 ,marginLeft :6, marginRight:6,color:'#e41582'}}>{itemData.item.product_name}</Text>

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


//     componentDidMount() {
//     // NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
//  this.props.navigation.addListener('willFocus',this._handleStateChange);

//     // NetInfo.isConnected.fetch().done(
//     //   (isConnected) => { this.setState({ status: isConnected }); }
//     // );

// }
componentWillUnmount() {
 //   NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
}


getOFF =(responseJson)=>{
//  alert(JSON.stringify(responseJson))
       this.setState({ moviesList:   GLOBAL.product})
            this.arrayholder =   GLOBAL.product;

}

  _handleStateChange = state => {
   //alert('hoho')
//        NetInfo.isConnected.fetch().then(isConnected => {
//  // alert('First, is ' + (isConnected ? 'online' : 'offline'));
//   if(isConnected ==false){
//     var so= 'c'+GLOBAL.category
// store.get(so) .then((res) => this.getOFF(GLOBAL.product) )

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

   //this.getMoviesFromApiAsync()
 };


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
//     this.props.navigation.addListener('willFocus',this._handleStateChange);

      this.setState({industry_id: itemId})
  
  //    this.getMoviesFromApiAsync()
       NetInfo.isConnected.fetch().then(isConnected => {
 // alert('First, is ' + (isConnected ? 'online' : 'offline'));
  if(isConnected ==false){
    var so= 'c'+GLOBAL.category
store.get(so) .then((res) => this.getOFF(res) )

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


  }

SearchFilterFunction(text){
  const newData = this.arrayholder.filter(function(item){
         const itemData = item.product_name.toUpperCase()
         const textData = text.toUpperCase()
         return itemData.indexOf(textData) > -1
     })
     this.setState({
         moviesList: newData,
         text: text,
         nodata:'No found'
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
      <View style={styles.container}>
      <ScrollView removeClippedSubviews={true}>
{this.state.moviesList.length==0 &&(<Text style={{fontSize:20, margin:10,alignSelf:'center'}}>No product available to display</Text>)}
{this.state.moviesList.length!=0 &&(
  <View style={{backgroundColor:'#f2f2f2'}}>
      <View style={{flexDirection:'row',borderBottomColor:'#e41582', borderBottomWidth:1}}>
       <Image style={{width:20, height:20, resizeMode:'contain', position:'absolute', left:10,top:12,}} source={require('./search.png')}/>

       <TextInput
       style={{marginLeft:10,marginRight:10, paddingLeft:25,paddingBottom:5,height: 40,}}
       onChangeText={(text) => this.SearchFilterFunction(text)}
       value={this.state.text}
       multiline={false}
       underlineColorAndroid='transparent'
       placeholder="What are you looking for ?"
        />
<TouchableOpacity style={{width:20, height:20,position:'absolute', right:10, top:12}} onPress={()=>this.clearSearch()}>
        <Image style={{width:20, height:20, resizeMode:'contain', }} source={require('./cross.png')}/>
    </TouchableOpacity>
    </View>
        <FlatList style= {{backgroundColor:'#f2f2f2', marginBottom:7}}
          data={this.state.moviesList}
          numColumns={1}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={this.renderRowItem}
        />
  </View>
        )}
        </ScrollView>
      </View>
    );
  }


  getMoviesFromApiAsync = () => {
       this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.derive_detail_category

      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    category_id: GLOBAL.category,
    user_id :GLOBAL.userid,
  }),
}).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == true){
//alert(JSON.stringify(responseJson))
      //  var so = 'c' + GLOBAL.category
      // store.update(so,responseJson)

       this.setState({ moviesList: responseJson.derive_detail_category})
            this.arrayholder = responseJson.derive_detail_category;

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
export default Product;
