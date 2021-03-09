import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import {convertMinsToTime} from '../helpers/timeHelper'

const filmDetail = ({navigation, route}) => {
    const film = route.params.film
    const [seances, setSeances] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        const url = 'http://192.168.1.23:8000/api/seances'
        axios.get(url, {
            params: {
                'film.id': film.id
            },
            headers: {
                'Accept': 'application/json',
            }
        }).then((response) => {
            setSeances(response.data)
            setIsLoading(false)
        })
        .catch((error) => console.log(error))
    }, [])

    const formatDate = (dateString) => {
        const date = Date.parse(dateString)
        const dateObject = new Date(date)
        return dateObject.toLocaleDateString('fr-FR')
    }
    return (
        <ScrollView style={styles.view}>
            <Text style={styles.txt}>{film.titre}</Text>
            <Text style={styles.txt}>Résalier par {film.realisateur.prenom + ' ' + film.realisateur.nom}</Text>
            <Text style={styles.txt}>Le film dure {convertMinsToTime(film.duree)}</Text>
            <View style={styles.card}>
                {film.roles.map((role, index) => {
                    return (
                        <View key={index} style={styles.card}>
                            <Text>Dans le role de {role.nom}</Text>
                            <Text>{role.acteur.prenom +' ' + role.acteur.nom}</Text>
                        </View>
                    )
                })}
            </View>
            {
                isLoading ? (<ActivityIndicator size="large" />) : (seances.map((seance, index) => <Text key={index}>{formatDate(seance.dateSeance)}</Text>))
            }
        </ScrollView>
    )
}

export default filmDetail

const styles = StyleSheet.create({
    view: {
        marginTop: 50,
        padding: 10,
    },
    txt: {
        margin: 5,
    },
    card: {
        margin: 5,
        padding: 5,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
})
