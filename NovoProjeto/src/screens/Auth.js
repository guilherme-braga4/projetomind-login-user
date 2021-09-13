import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'

import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { CommonActions } from '@react-navigation/native'

import { api, showError, showSuccess } from '../common'
import AuthInput from '../components/AuthInput'
import commonStyles from '../commonStyles'
import backgroundImage from '../../assets/imgs/login.jpg'


const initialState = {
    name: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: '',
    nivel: 999,
    stageNew: false
  }
  

export default class Auth extends Component {
    state = {
      ...initialState
    }

      
        signinOrSignup = () => {
          if (this.state.stageNew) {
            this.signup()
          } else {
            this.signin()
          }
        }
      
        signup = async () => {
          try {
                console.log('aqui')
                const name = this.state.name
                const email = this.state.email
                const cpf = this.state.cpf
                const password = this.state.password

                const response = await api.post('/cadastro', {
                    name: name,
                    email: email,
                    cpf: cpf,
                    password: password,
                    nivel: 999
                })
        
                showSuccess('Usuário cadastro!')
                this.setState({ ...initialState })
          } catch (e) {
            showError(e)
          }
        }
      
        signin = async () => {
          try {
            console.log('login')
            const email = this.state.email
            const password = this.state.password
            const response = await api.post('/login', {
                email: email,
                password: password
            })
      
            AsyncStorage.setItem('userData', JSON.stringify(response.data))
            axios.defaults.headers.common[
              'Authorization'
            ] = `bearer ${response.data.token}`
            this.props.navigation.navigate('UserList', response.data)
            this.props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'UserList',
                    params: response.data
                  }
                ]
              })
            )
          } catch (e) {
            showError(e)
          }
        }
      
        render() {
          const validations = []
      
          validations.push(this.state.email && this.state.email.includes('@'))
          validations.push(this.state.password && this.state.password.length >= 6)
      
          if (this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.password === this.state.confirmPassword)
          }
      
          const validForm = validations.reduce((t, a) => t && a)
      
          return (
            <ImageBackground source={backgroundImage} style={styles.background}>
              <Text style={styles.title}>Login</Text>
              <View style={styles.formContainer}>
                <Text style={styles.subtitle}>
                  {this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}
                </Text>
                {this.state.stageNew && (
                  <AuthInput
                    icon="user"
                    placeholder="Insira seu Nome"
                    value={this.state.name}
                    style={styles.input}
                    onChangeText={name => this.setState({ name })}
                  />
                )}
      
                {this.state.stageNew && (
                  <AuthInput
                    icon="address-card"
                    placeholder="Insira seu CPF"
                    value={this.state.cpf}
                    style={styles.input}
                    onChangeText={cpf => this.setState({ cpf })}
                  />
                )}
      
                <AuthInput
                  icon="at"
                  placeholder="Preencha com seu E-mail"
                  value={this.state.email}
                  style={styles.input}
                  onChangeText={email => this.setState({ email })}
                />
                <AuthInput
                  icon="lock"
                  placeholder="Escreva sua Senha"
                  value={this.state.password}
                  style={styles.input}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                />
                {this.state.stageNew && (
                  <AuthInput
                    icon="asterisk"
                    placeholder="Confirmação de Senha"
                    value={this.state.confirmPassword}
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={confirmPassword =>
                      this.setState({ confirmPassword })
                    }
                  />
                )}
                <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
                  <View
                    style={[
                      styles.button,
                      validForm ? {} : { backgroundColor: '#AAA' }
                    ]}
                  >
                    <Text style={styles.buttonText}>
                      {this.state.stageNew ? 'Registrar' : 'Entrar'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{ padding: 10 }}
                onPress={() => this.setState({ stageNew: !this.state.stageNew })}
              >
                <Text style={styles.buttonText}>
                  {this.state.stageNew
                    ? 'Faça seu login aqui'
                    : 'Inscreva-se clicando aqui'}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          )
        }
      }
      

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize : 70,
        marginBottom:10
    },   
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 25
    },
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
        padding: 15,

    },
    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20
    }

})