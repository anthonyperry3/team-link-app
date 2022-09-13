import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Icon, Input } from 'react-native-elements'
import styles from './LoginPageStyles'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [toggleRegister, setToggleRegister] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {

    },[])

  return (
    <View>
      <Text>loginPage</Text>
      <Input placeholder='Email'leftIcon={<Icon name='envelope' type='font-awesome' size={24} color='#444'/>}/>
    </View>
  )
}

export default LoginPage;