import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { api } from '../common'

export default ({ route, navigation }) => {
  const [user] = useState(route.params ? route.params : {})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [userEdit, setUserEdit] = useState()

  useEffect(() => {
    console.log(user)
    show()
  }, [])

  const show = async () => {
    try {
      const response = await api.get(`/user/${user}`)

      console.log(response.data.user.name)

      setUserEdit(response.data)
      setName(response.data.user.name)
      setEmail(response.data.user.email)
      setCpf(response.data.user.cpf)
    } catch (err) {
      Alert.alert(err)
    }
  }

  const update = async () => {
    try {
      console.log('to aqui update', name, email, cpf)
      await api.put(`/user/${user}`, {
        name,
        email,
        cpf
      })

      Alert.alert('Informações atualizadas com sucesso!')
      navigation.navigate('UserList')
    } catch (err) {
      Alert.alert(err)
    }
  }
  return (
    <View style={style.form}>
      <Text>Name</Text>
      <TextInput
        style={style.input}
        onChangeText={value => setName(value)}
        placeholder="Informe o seu Nome"
        value={name}
      />
      <Text>Email</Text>
      <TextInput
        style={style.input}
        onChangeText={email => setEmail(email)}
        placeholder="Informe o seu Email"
        value={email}
      />
      <Text>CPF</Text>
      <TextInput
        style={style.input}
        onChangeText={cpf => setCpf(cpf)}
        placeholder="Informe o seu CPF"
        value={cpf}
      />
      <Button
        size={15}
        title="Salvar"
        color="#00ad11"
        onPress={() => {
          update()
        }}
      />
    </View>
  )
}

const style = StyleSheet.create({
    form: {
        padding: 12
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10, 
    }
})