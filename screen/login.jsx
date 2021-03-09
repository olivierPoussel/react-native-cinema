import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import {loginAuth, KEY_TOKEN, logoutAuth} from '../services/authService'
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = ({navigation, route}) => {
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [token, setToken] = useState(null)

    useEffect(() => {
        console.log(route.params.email)
        route.params.email ? setEmail(route.params.email) : null
    }, [])

    const handlePress = () => {

        if(email && pwd && email.length > 5 && pwd.length > 3) {
            const data = {
                username: email.toLowerCase(),
                password: pwd
            }
            loginAuth(data).then((response) =>{
                AsyncStorage.getItem(KEY_TOKEN).then((data) => {
                    console.log(data)
                    setToken(data)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Accueil' }],
                      })
                })

            })
        }
    }

    const  displayToken = () => {
        if(!token) {
            AsyncStorage.getItem(KEY_TOKEN)
            .then((storedToken) => setToken(storedToken))
        }
        
        return token ? ( <Text>{token}</Text> ) : null;
    }

    const logout = () => {
        logoutAuth()
        setToken(null)
    }

    return (
        <View style={styles.view}>
            {/* {console.log('RENDER', email, pwd, token)} */}
            {displayToken()}
            <Text style={styles.espace}>Connexion</Text>
            <TextInput 
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                keyboardType='email-address'
                textContentType= 'emailAddress'
                style={[styles.espace, styles.box]}
                onSubmitEditing={handlePress}
            />
            <TextInput 
                onChangeText={setPwd}
                value={pwd}
                placeholder="Password"
                secureTextEntry={true}
                textContentType= 'password'
                style={[styles.espace, styles.box]}
                onSubmitEditing={handlePress}
            />
            <Button onPress={handlePress} title={'Connexion'}/>
            <View style={styles.espace}>
                <Button onPress={logout} title={'logout'}/>
            </View>
        </View>
    )
}

export default login

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
