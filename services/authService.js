import axios from "axios";
import jwtDecode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEY_TOKEN = 'token'

export function loginAuth(credentials) {
    return axios
        .post("http://192.168.1.23:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            //sauvegade le token dans le stockage du tel
            try {
                AsyncStorage.setItem(KEY_TOKEN, token) 
            } catch (error) {
                console.log(error)
            }

            _setAxiosToken(token)

            return true;
        });
}

export function logoutAuth() {
    //supprimer le token du tel
    try {
        AsyncStorage.removeItem(KEY_TOKEN)
    } catch (error) {
        console.log(error)
    }

    //supprime le token dans axios
    delete axios.defaults.headers["Authorization"];
}

export async function initialisation() {
    const token = await AsyncStorage.getItem(KEY_TOKEN)
    if(token && token.length > 0 && _tokenIsValid(token)) {
        _setAxiosToken(token)
    }
}

export async function isAuth() {
    const token = await AsyncStorage.getItem(KEY_TOKEN)
    if(token && token.length > 0 && _tokenIsValid(token)) {
        return true
    }

    return false
}

export async function isAdmin() {
    const token = await AsyncStorage.getItem(KEY_TOKEN)
    if(token && token.length > 0 && _tokenIsValid(token)) {
        const jwtData = jwtDecode(token)
        return jwtData.roles.include('ROLE_ADMIN')
    }
    
    return false
}

function _setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function _tokenIsValid(token) {
    if(token) {
        const jwtData = jwtDecode(token);

        if(jwtData.exp * 1000 > new Date().getTime()) {
            return true
        }

        return false
    }

    return false
}
