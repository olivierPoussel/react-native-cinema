import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {convertMinsToTime} from '../helpers/timeHelper'

const filmCard = ({film, navigation}) => {
    const handlePress = (event) => {
        navigation.navigate('FilmDetail', {film: film})
    }
    return (
        <TouchableOpacity onPress={handlePress} style={styles.view}>
            <Text style={styles.txt}>{film.titre}</Text>
            <Text style={styles.txt}>Résalier par {film.realisateur.prenom + ' ' + film.realisateur.nom}</Text>
            <Text style={styles.txt}>Le film dure {convertMinsToTime(film.duree)}</Text>
        </TouchableOpacity>
    )
}

export default filmCard

const styles = StyleSheet.create({
    view: {
        margin: 5,
        padding: 5,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    txt: {
        margin: 5,
    }
})
