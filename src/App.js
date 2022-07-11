import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import UserList from './views/UserList'
import UserForm from './views/UserForm'
import { Button } from '@rneui/base'
import { Icon } from '@rneui/themed'
import { UsersProvider } from './contex/UsersContext'


const Stack = createStackNavigator()

export default props => {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='UserList'
          screenOptions={screenOptions}>
          <Stack.Screen 
            name='UserList'
            component={UserList}
            /*quando o "options" for carregado ele cria tbm esse objeto "navigation"*/
            options={({ navigation } ) => {
              return {
                title: "Lista de usuários",
                headerRight: () =>(
                  <Button 
                    onPress={() => navigation.navigate('UserForm')} 
                    type='clear'
                    icon={<Icon name='add' size={25} color='white' />}/>
                )
              }
            }}
          />
          <Stack.Screen 
            name='UserForm'
            component={UserForm}
            options={ {
              title: "Formulário de Usuários"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  )
}

const screenOptions = {
  headerStyle: {
    backgroundColor: "#f4511e"
  },
  headerTintColor: "#fff",
  fontWeight: "bold"
}