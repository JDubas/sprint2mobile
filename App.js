import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import screens
import detalhesComentario from './screens/detalhesComentario';
import usuario from './screens/usuario';
import inicial from './screens/inicial';
import RecuperarSenha from './screens/RecuperarSenha';
import graficos from './screens/graficos';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="inicial" component={inicial} />
      <Stack.Screen name="detalhesComentario" component={detalhesComentario} />
      <Stack.Screen name="usuario" component={usuario} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      <Stack.Screen name="graficos" component={graficos} />
    
    </Stack.Navigator>
  );
}

export default function App() {
  return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
