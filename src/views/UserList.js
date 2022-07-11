import React, { useContext } from 'react'
import { Button } from '@rneui/base'
import { Avatar, Icon, ListItem } from '@rneui/themed'
import { Alert, FlatList } from 'react-native'
import { View } from 'react-native'
//import users from '../data/users'
import UsersContext from '../contex/UsersContext'

export default props => {
    //console.warn(Object.keys(ctx))
    const { state, dispatch } = useContext(UsersContext)
    
    function confirmUserDeletion(user) {
        Alert.alert( 'Excluir Usuário',
                     'Deseja excluir o Usuário?',
                     [
                        {
                            text: 'Sim',
                            onPress() {
                                dispatch({
                                    type: 'deleteUser',
                                    payload: user,
                                })
                            }
                        },
                        {
                            text: 'Não'
                        }
                     ]
                   )
    }

    function getActions(user) {
        return (
            <>
                <Button 
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    type='clear'
                    icon={<Icon name='edit' size={25} color='orange' />}
                />
                <Button
                    onPress={() => confirmUserDeletion(user)} 
                    type='clear'
                    icon={<Icon name='delete' size={25} color='red' />}
                />
            </>
        )
    }

    function getUserItem({ item: user }){
        //função para rederizar cada um dos usuários
       //esse "item: user" significa que dentro da função
      // o "user" é o "item" com isso é possivel utilizar "user" ao inves do "item"
       // return <Text>{user.name}</Text>
       return (
            <ListItem key={user.id} 
                      bottomDivider 
                      onPress={() => props.navigation.navigate('UserForm')}>
                <Avatar source={{uri: user.avatarUrl }}/>
                <ListItem.Content>
                    <ListItem.Title>{user.name}</ListItem.Title>
                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                {getActions(user)}
            </ListItem>                      
      ) 
    }
    
    return (
        <View>
            <FlatList 
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}