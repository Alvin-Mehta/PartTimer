import React, { Component } from 'react';
import { View,
   Text,
    StyleSheet,
    Button,
    TextInput,
    Image,ImageBackground,
    TouchableOpacity,
    StatusBar,
    Platform,
    ScrollView,
    SafeAreaView,Animated, 
    Dimensions} from 'react-native';

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDMyOk7j9yguNX055j07xdbbdMda8IKI80",
  authDomain: "parttimer-88182.firebaseapp.com",
  databaseURL: "https://parttimer-88182.firebaseio.com",
  projectId: "parttimer-88182",
  storageBucket: "parttimer-88182.appspot.com",
};

firebase.initializeApp(firebaseConfig);

import {Container,Content,Header,Form,Input,Item,label} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import logo from './assets/logo.png'
class App extends Component {
  render() {
    return <AppContainer />;
  }
}
export default App;

const { width: WIDTH } = Dimensions.get('window')

//This is for the front login page
class WelcomeScreen extends Component {
  //for firebase user authentication
  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }
//for first time signup
  signUpUser=(email,password) => {

    try{
      if(this.state.password.length < 6)
      {
        alert('Please enter atleast 6 characters')
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch(error){
      console.log(error.toString())
     alert(error.toString())
    }
  }
  //for login with signup detail
  loginUser=(email,password) => {
    try{
        firebase.auth().signInWithEmailAndPassword(email, password).then(
        // this navigates to inner pages
        () => this.props.navigation.navigate('Dashboard')
        )
    }
    catch(error){
     //   console.log(error.toString())
     alert(error.toString())
    }
  } 
//till here
  render() {
    return (
      <ImageBackground source ={require('./assets/Background/back.jpg')} style={{width:'100%', height:'100%'}}>
        <View style={{flex: 1,flexDirection:'column', justifyContent:'space-around', alignItems: 'center', marginTop:100 }}>
        
          <View style={{ flex: 2.5, justifyContent:'center'}}  >
            <Image source={logo} style={styles.logo} />
            <Text style={{fontWeight: 'bold', color:'black' ,fontSize: 40,marginTop: 5,opacity: 0.5  }} > PART-TIMER </Text>   
          </View>      
        
          <View style={{ flexDirection: 'row'}}  >
            <Icon name={'at'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/>
            <TextInput iconName={'at'} 
              iconColor='#02000f'
              style={styles.input}
              underlineColorAndroid= 'transparent'
              placeholder='Email'
              placeholderTextColor='rgba(255,255,255,0.7)'
              onChangeText={(email) => this.setState({email})}
              keyboardType='email-address'
            />
          </View>

          <View style={{  flexDirection: 'row' }}  >
            <Icon name={'lock'} size={28} color={'rgba(255,255,255,0.7)'} style={styles.inputIcon}/> 
            <TextInput style={styles.input}
                      underlineColorAndroid= 'transparent'
                      placeholder='Password'
                      placeholderTextColor='rgba(255,255,255,0.7)'
                      autoCorrect={false}
                      secureTextEntry={true} 
                      onChangeText={(password) => this.setState({password})}
            />
            <TouchableOpacity  style={styles.btnEye}>
              <Icon name={'eye'} size={26} color={'rgba(255,255,255,0.4)'} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }} >
            <Button title="  Login  " 
            onPress={() => this.loginUser(this.state.email,this.state.password)}
            
             color='#841585'  borderRadius={25} />
          </View>

          <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center' }}  >  
            <Text>Enter Your Details for </Text>
            <Button title="SignUp" onPress={() => this.signUpUser(this.state.email,this.state.password)}
             color='#841585' textColor='#02000f' borderRadius={25} />
          </View> 

          </View>   
        </ImageBackground>
    );
  }
}

//good code for dashborad screen.
class DashboardScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',
      flexDirection:'column'  }}>
        <Image source ={require('./assets/Background/back.jpg')} style={{width:'10%', height:'10%'}}></Image>
        <View>
          <Button title="User" 
          onPress={() => this.props.navigation.navigate('Detail2')} />
        </View>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}
//first tab of app here we display all  our adds
class Feed extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Satarter </Text>
        <View>
          <Button title="Advertisement 1" 
          onPress={() => this.props.navigation.navigate('Detail')} />
        </View>
        <View>
          <Button title="Advertisement 2" 
          onPress={() => this.props.navigation.navigate('Detail2')} />
        </View>
      </View>
    );
  }
}
//change name to inbox,here we display messages
class Inbox extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontWeight: 'bold', color:'black' ,fontSize: 40,marginTop: 5}} >Inbox</Text>
        <Text>Search and view your messages here</Text>
      </View>
    );
  }
}
//We create add here,the first screen
class Profile extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection:'column'  }}>
        <View style={{ alignItems: 'center', justifyContent: 'center'}} >
          <Text style={{fontWeight: 'bold', color:'#2f1460' ,fontSize: 30,marginTop: 5}}>Your Add</Text>
        </View>
        
        <View>  
        <TextInput  style={styles.newinput} underlineColorAndroid= 'transparent'
            placeholder='Job Title' maxLength={25} placeholderTextColor='#4131aa' />
        </View>
        <View  >
        <TextInput  style={styles.jobinput} underlineColorAndroid= 'transparent'
            placeholder='Job Description' textAlignVertical='top' placeholderTextColor='#4131aa' />
        </View>
        <View>
          <TextInput style={styles.newinput} underlineColorAndroid= 'transparent' keyboardType='numeric' 
          maxLength={1} placeholder='Working Hours' placeholderTextColor='#4131aa' />
        </View>
        <View>
          <TextInput style={styles.newinput} underlineColorAndroid= 'transparent' keyboardType='numeric' 
          maxLength={8} placeholder='Payment' placeholderTextColor='#4131aa' />
          <Icon name={'rupee'} size={30} color={'rgba(255,255,255,4)'} style={styles.btnEye}/>
        </View>
        <View>
          <TextInput style={styles.newinput} underlineColorAndroid= 'transparent' keyboardType='numeric' 
          maxLength={10} placeholder='Contact Details' placeholderTextColor='#4131aa' />
          <Icon name={'mobile'} size={30} color={'rgba(255,255,255,4)'} style={styles.btnEye}/>
        </View>
        <TextInput  style={styles.remarkinput} underlineColorAndroid= 'transparent'
            placeholder='Any Remark or Request' placeholderTextColor='#4131aa' />
        <Button title="Submit" onPress={() => this.props.navigation.navigate('Detail')} color='#841585' textColor='#02000f' borderRadius={25} />
      </View>
    );
  }
} 
//editing of data inside detail button
const Detail = props => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Your advertisement details are availaable here</Text>
  </View>
);
//new detail screen in feedstack
const Detail2 = props => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Your e</Text>
  </View>
);
//main body of FeedStack
const FeedStack = createStackNavigator(
  {
    Feed: {
      screen: Feed,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Post',
          headerLeft: (
            <Icon style={{ paddingLeft: 10 }} 
            onPress={() => navigation.openDrawer()} name="align-justify" size={30} />
          )
        };
      }
    },
    Detail: {
      screen: Detail
    },
//trying new screen
    Detail2: {
      screen: Detail2
    }
//till here    
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);
//mainbody of ProfileStck
const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Create Adds',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} 
          onPress={() => navigation.openDrawer()} name="align-justify" size={30} />
        )
      };
    }
  }
});
//main body of Settingstack
const InboxStack = createStackNavigator({
  Inbox: {
    screen: Inbox,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: 'Messages',
        headerLeft: (
          <Icon style={{ paddingLeft: 10 }} 
          onPress={() => navigation.openDrawer()} name="align-justify" size={30} />
        )
      };
    }
  }
});
//for tab navigation among three tabs
const DashboardTabNavigator = createBottomTabNavigator(
  {
    FeedStack,
    ProfileStack,
    InboxStack
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
            <Icon style={{ paddingLeft: 10 }} 
          onPress={() => navigation.openDrawer()} name="align-justify" size={30} />
        )
      };
    }
  }
);
//for drawing our dashboard
const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});
//for stack navigation
const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  navigation: {screen: WelcomeScreen},
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:'null',
    height:'null',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width:200,
    height:200,
    left:23

  },
  input:{
    width: WIDTH - 55,
    height:50,
    borderRadius:25,
    fontSize:16,
    paddingLeft:45,
    backgroundColor:'rgba(0,0,0,0.35)',
    color:'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
    marginVertical: 5
  },
  inputIcon:{
    position:'absolute',
    top:17,
    left:38
  },
  btnEye:{
    position:'absolute',
    top:17,
    right:37
  },
  jobinput:{
    width: WIDTH - 55,
    height:150,
    borderRadius:25,
    fontSize:19,
    paddingLeft:45,
    backgroundColor:'#caedf9',
    color:'#02000f',
    marginHorizontal: 25,
    marginVertical: 5
  },
  newinput:{
    width: WIDTH - 55,
    height:50,
    borderRadius:25,
    fontSize:19,
    paddingLeft:45,
    backgroundColor:'#caedf9',
    color:'#02000f',
    marginHorizontal: 25,
    marginVertical: 5
  },
  remarkinput:{
    width: WIDTH - 55,
    height:70,
    borderRadius:25,
    fontSize:19,
    paddingLeft:45,
    backgroundColor:'#caedf9',
    color:'#02000f',
    marginHorizontal: 25,
    marginVertical: 5
  },
  signupTextCont:{
    flexGrow:1,
    alignItems:'flex-end',
    justifyContent:'center',
    paddingVertical:16,
    flexDirection:'row'
  },
  signupButton:{
    color:'white',
    fontSize:16,
    fontWeight:'500',
  }

});
