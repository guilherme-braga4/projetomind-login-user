import { Alert } from 'react-native'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.0.216:55803'
}) 

function showError(err) {
    Alert.alert('Ops! Ocorreu um Problema!', `Mensagem ${err}`)

}

function showSucess(msg) {
    Alert.alert('Sucesso', msg)
    
}

export { api, showError, showSucess}
