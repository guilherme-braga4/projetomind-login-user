import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { View, FlatList, Alert } from 'react-native'
import { Button, ListItem, Icon } from 'react-native-elements'
import { api } from '../common'

export default props => {
  const [user, setUser] = useState()

  useEffect(() => {
    show()
  }, [])

  const show = async () => {
    try {
      const response = await api.get('/users')

      setUser(response.data)

     
    } catch (err) {
      Alert.alert(err)
    }
  }

  function getActions(user) {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user.id)}
          type="clear"
          color="#FF0000"
          size={15}
        />
      </>
    )
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        rightElement={getActions(user)}
        onPress={() => props.navigation.navigate('UserForm', user.id)}
      >
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )
  }

  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={user => user.id.toString()}
        data={user}
        renderItem={getUserItem}
      />
    </SafeAreaView>
  )
}