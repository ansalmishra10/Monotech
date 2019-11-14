import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  NetInfo,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';

const GLOBAL = require('./Global');
const regex = /(<([^>]+)>)/ig;
import HTML from 'react-native-render-html';


const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

const { width, height } = Dimensions.get('window');


const equalWidth =  (width -20 )

 class Gst extends Component {
static navigationOptions = {
          title: 'GST Details',
          headerTintColor: '#ffffff',
          headerStyle: {
            backgroundColor: '#2F95D6',
            borderBottomColor: '#ffffff',
            borderBottomWidth: 3,
          },
          headerTitleStyle: {
            fontSize: 15,
            width:150
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
    justifyContent: 'center',
    shadowRadius: 0.5,
    shadowOpacity: 0.5,flex : 1, backgroundColor:'white',borderRadius:5,  width : equalWidth ,marginLeft : 10,marginRight:10,marginTop:5, elevation:2}}>


      <Image
          style={{ width: 100, height : 100, resizeMode:'contain',}}
          source={{ uri: itemData.item.image }}
        />



          <View style={{flex : 1}}>
          <Text style={{color:'#e41582', fontSize: 20, marginLeft: 6 ,marginTop :6 }}>{itemData.item.brand}</Text>

         <ScrollView style={{ flex: 1 ,style : 10,marginLeft: 6 ,marginTop : 3 ,marginBottom :6}}>
                <HTML html={itemData.item.description} imagesMaxWidth={Dimensions.get('window').width} />
            </ScrollView>

        </View>
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
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

    NetInfo.isConnected.fetch().done(
      (isConnected) => { this.setState({ status: isConnected }); }
    );
}
componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
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
    <View style={{flex:1, flexDirection:'column', justifyContent:'flex-start'}}>
    <ScrollView>
<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>

<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
CORPORATE OFFICE</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>3rd Floor, City Centre, 66, Thirumalai Road,{"\n"}
T. Nagar, Chennai - 600 017, Tamilnadu, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Email:</Text>
<Text style={{fontSize:12, marginRight:10,}}>  info@monotech.in</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}>+91 44 2815 7928 / 7894 / 7933</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>Fax:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     +91 44 2815 7973</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>

<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
CHENNAI
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>Vanchi Nagar, Sidco Industrial Estate, Ambattur{"\n"}
Chennai-600053, Tamil Nadu, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 720 0256 726</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 33AABCM8821D1ZT</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
GURUGRAM
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>D-33, Ground Floor, Infocity II, Sector 33,{"\n"}
Gurugram- 122001, Haryana, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 124 2371 771</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 06AABCM8821D1ZQ</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
MUMBAI
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>Unit # F-3-4, Ashokraj Building, S.V.Road,{"\n"}
Goregaon (West), Near Ratna Hotel,{"\n"}Mumbai - 400 062, Maharashtra, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 22 2871 1385</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 27AABCM8821D1ZM</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>


<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
NEW DELHI
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>C-206, 1st Floor, Naraina, Industrial Area, Phase-I,{"\n"}
New Delhi- 110 028, Delhi NCR, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 11 4750 5614</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 07AABCM8821D1ZO</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
KOLKATA
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>3rd floor, 7A, Raja subodhmullicksquare,{"\n"}
Kolkata – 700013, West Bengal, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 33 4005 3312</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 19AABCM8821D1ZJ</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
BENGALURU
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>No.3, "ANAND", Behind Model LIC Colony,{"\n"}
Near Chord Road Hospital, Basaveshwaranagar,{"\n"}Bengaluru - 560 079, Karnataka, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 80 4161 1963/64</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 29AABCM8821D1ZI</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
LUDHIANA
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>M.C. # 2073/A, Near Old Post Office, Abdullapur{"\n"}
Ludhiana - 141 003, Punjab, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 855 884 6100</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 03AABCM8821D1ZW</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>


<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
VIJAYAWADA
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>D.No. 28-1-18 ,2nd Floor, SeshasriSastry Street,{"\n"}
Beside Vijaya Bank, Eluru Road,{"\n"}Governerpet, Vijayawada – 520 002, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 866 667 4678</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 37AABCM8821D1ZL</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>


<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
JAIPUR
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>Near MangalManch Marriage Garden, Sharma Colony, {"\n"}
Main Nandpuri, 22 Godown{"\n"}Jaipur - 302 006, Rajasthan, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 141 2219 045</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 08AABCM8821D1ZM</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
HYDERABAD
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}># 6-2-1/15, Flat No. 601, 6Th Floor,H.G.H Residency, Seha Hospital Lane, {"\n"}
Opp. Saifabad Police Station, LakdiKa Pool,{"\n"}Hyderabad-500 004, Andhra Pradesh, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 40 4016 3171</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 36AABCM8821D1ZN</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
KOCHI
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>Door # 27/368, House #51,{"\n"}
Krishna Vihar Colony, Panampally Nagar,{"\n"}Kochi - 682 036, Kerala, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 859 007 2772</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 32AABCM8821D1ZV</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
AHMEDABAD
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>202, Apurva Society, Hi Scan House,{"\n"}
Near MithakaliUnder Bridge, Navrangpura, {"\n"}Ahmedabad - 380 009, Gujarat, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 79 2640 4655</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 24AABCM8821D1ZS</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
INDORE
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>103, Malay Corporate, Scheme No. 54,{"\n"}
Mechinic Nagar, Sector-C, Plot No. 11, Bhamori, {"\n"}Indore – 452 010, Madhya Pradesh, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 731 423 7238</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 23AABCM8821D1ZU</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
GUWAHATI
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>Prasad House, AK Azad Road, Near Artfed, Rehabari, {"\n"}
Guwahati - 781 008, Assam, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 881 102 5877</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 18AABCM8821D1ZL</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
BHUBANESWAR
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>Plot No. 223/374, Ground Floor{"\n"}
GajapaNagar, Chandrasekharpur{"\n"}Bhubaneswar – 751 005, Odisha, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>Phone:</Text>
<Text style={{fontSize:12, marginRight:10,}}> +91 33 4005 3312</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 21AABCM8821D1ZY</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<View style={{backgroundColor:'white',color :'white',flexDirection:'column' , flex: 1 ,marginTop: 10,marginLeft:10,marginRight:10,borderRadius :6,width : window.width- 20, shadowColor: '#000',
   shadowOffset: { width: 0, height: 1 },
   shadowOpacity: 0.6,
   shadowRadius: 2,
   elevation: 5 }}>
<Text style={{fontSize:15, fontWeight:'bold',marginTop:10, marginBottom:10, marginRight:10, marginLeft:10}}>
NOIDA
</Text>
<Text style={{fontSize:13, fontWeight:'bold',marginLeft:10, marginRight:10, marginBottom:10}}>Monotech Systems Limited</Text>

<Text style={{fontSize:12, marginLeft:10,marginRight:10}}>C-165, 1st Floor,{"\n"}
Sector-10, Distt.GoutamBudhnagar,{"\n"}Noida - 201 301, Uttar Pradesh, India{"\n"}</Text>

<View style={{flexDirection:'row', marginTop:-10}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold'}}>GSTIN:</Text>
<Text style={{fontSize:12, marginRight:10,}}> 09AABCM8821D1ZK</Text>
</View>
<View style={{flexDirection:'row'}}>
<Text style={{fontSize:12, marginLeft:10, marginRight:10, fontWeight:'bold', marginBottom:10}}>PAN:</Text>
<Text style={{fontSize:12, marginRight:10, marginBottom:10}}>     AABCM8821D</Text>
</View>
</View>

<Text></Text>
</ScrollView>

   </View>
    );
  }


  getMoviesFromApiAsync = () => {
       this.showLoading();
       const url = GLOBAL.BASE_URL +  GLOBAL.get_all_brands

      fetch(url, {
  method: 'GET',
  
}).then((response) => response.json())
    .then((responseJson) => {

      if (responseJson[0].status == true){
            //  alert(JSON.stringify(responseJson))
       this.setState({ moviesList: responseJson[0].brands})
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
export default Gst;
