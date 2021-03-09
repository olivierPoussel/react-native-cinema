import axios from 'axios'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

const register = ({navigation}) => {

    const [email, setEmail] = useState(null)
    const [pwd, setPwd] = useState(null)
    const [pseudo, setPseudo] = useState(null)

    const handlePress = () => {
        const url = 'http://192.168.1.23:8000/api/users'
        const data = {
            "email": email.toLowerCase(),
            "password": pwd,
            "pseudo": pseudo
          }
        axios.post(url, data, {
            headers: {
            'Content-Type': 'application/json',
        }})
        .then(() => navigation.navigate('Login', {email}))
        .catch((error) => console.log(error))
    }
    return (
        <View style={styles.view}>
            {/* {console.log('RENDER', email, pwd, pseudo)} */}
            <Text>Inscription</Text>
            <TextInput onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType='email-address'
                textContentType='emailAddress'
                style={[styles.espace, styles.box]}
                onSubmitEditing={handlePress}
            />
            <TextInput
                onChangeText={setPwd}
                value={pwd}
                placeholder="Password"
                secureTextEntry={true}
                textContentType='password'
                style={[styles.espace, styles.box]}
                onSubmitEditing={handlePress}
            />
            <TextInput
                onChangeText={setPseudo}
                value={pseudo}
                placeholder="pseudo"
                textContentType='nickname'
                style={[styles.espace, styles.box]}
                onSubmitEditing={handlePress}
            />
            <Button onPress={handlePress} title={'Inscription'} />
        </View>
    )
}

export default register

const styles = StyleSheet.create({
    view: {
        marginTop: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    espace: {
        margin: 10,
    },
    box: {
        borderColor: 'black',
        borderWidth: 1,
        width: 200,
        height: 40,
        padding: 10,
    }
})
