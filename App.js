import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './src/views/MyTabs';
import Index from './src/views/auth/Index';
import { NativeBaseProvider } from "native-base";
import {AuthContext} from "./src/context/Auth"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar,SafeAreaView} from "react-native"

const LinearGradient = require("expo-linear-gradient").LinearGradient;


function SplashScreen() {
  return (
    <View>
      <Text>Cargando...</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,

            // extra
            userName:action.name,
            userId:action.id,
            userEmail:action.email,
            userRolesPermisos:action.roles_permisos
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,

            // extra
            userName:action.name,
            userId:action.id,
            userEmail:action.email,
            userRolesPermisos:action.roles_permisos
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,

            // extra
            userName:null,
            userId:null,
            userEmail:null,
            userRolesPermisos:null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,

      // extra
      userName:null,
      userId:null,
      userEmail:null,
      userRolesPermisos:null
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      let userName;
      let userId;
      let userEmail;
      let userRolesPermisos;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        userToken = await AsyncStorage.getItemAsync('userToken');
        userName = await AsyncStorage.getItem('userName');
        userEmail = await AsyncStorage.getItem('userEmail');
        userId = await AsyncStorage.getItem('userId');
        userRolesPermisos=await AsyncStorage.getItem('userRolesPermisos')
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ 
        type: 'RESTORE_TOKEN', 
        token: userToken,
        name:userName,
        email:userEmail,
        id:userId,
        roles_permisos:userRolesPermisos
       });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      
      signIn: async (data) => {
        

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        let userToken=data.token;
        let userName=data.user.email;
        let userId=String(data.user.id);
        let userEmail=data.user.email;
        let userRolesPermisos=JSON.stringify(data.roles_permisos);

        try {
          
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userEmail', userName);
          await AsyncStorage.setItem('userName', userId);
          await AsyncStorage.setItem('userId', userId);
          await AsyncStorage.setItem('userRolesPermisos',userRolesPermisos);
          dispatch({ 
            type: 'SIGN_IN', 
            token: userToken,
            email:userEmail,
            name:userName,
            id:userId,
            roles_permisos:userRolesPermisos
           });
        } catch (error) {
          console.log(error)
        }
      },
      signOut: async() => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('userRolesPermisos');
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );


const config = {
  dependencies: {
    "linear-gradient": LinearGradient
  }
};

  return (

    <AuthContext.Provider value={{ ...state,...authContext }}>
      <NativeBaseProvider config={config}>
        <NavigationContainer>

        {
          state.isLoading ? (
            <Stack.Navigator>
              <Stack.Screen name="Splash" component={SplashScreen} />
            </Stack.Navigator>
            
          ): state.userToken==null?(
            <Index/>
          ):(
            <MyTabs></MyTabs>
          )

        }
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthContext.Provider>
  );
}
