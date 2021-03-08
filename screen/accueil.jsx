import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import FilmCard from '../components/filmCard'

const accueil = ({navigation}) => {
    const [films, setFilms] = useState([])
    useEffect(() => {
        const url = 'http://192.168.1.23:8000/api/films'
        axios.get(url, {
            headers: {
                'Accept': 'application/json',
                // 'Access-Control-Allow-Origin':  '*',
                // 'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
        .then((response) => setFilms(response.data))
        .catch((error)=> console.log(error))
    }, [])

    return (
        <View style={styles.view}>
            {console.log('RENDER', films)}
            <FlatList
                data={films}
                keyExtractor={(film) => film.id.toString()}
                renderItem={({item}) => <FilmCard film={item} navigation={navigation} />}
            />
        </View>
    )
}

export default accueil

const styles = StyleSheet.create({
    view: {
        marginTop: 50
    }
})
