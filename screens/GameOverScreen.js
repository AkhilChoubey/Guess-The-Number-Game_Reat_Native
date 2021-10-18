import React from "react";
import {View, Text, StyleSheet, TextInput, Button, Image} from 'react-native';
import MainButton from "../components/MainButton";
import color from "../constants/color";

const GameOverScreen = props => {
    return <View style={styles.screen}>
        <Text style={{fontFamily: 'open-sans-bold', fontSize: 30}}>
            The Game is Over!
        </Text>
        <View style={styles.imageContainer}>
        <Image source={require('../assets/success.png')} style={styles.image} />
        </View>
        <Text style={styles.resultText}>Number of rounds your phone took to guess the number<Text style={styles.highlightedText}> {props.userNumber}</Text> is <Text style={styles.highlightedText}>{props.roundsNumber}</Text> </Text>
        <MainButton onPress={props.onRestart} >NEW GAME</MainButton>
    </View>

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    image:{
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 200,
        borderWidth: 3,
        borderColor: 'black',
        width: '80%',
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    resultText: {
        textAlign: 'center',
        marginVertical: 30,
        fontSize: 18,
        marginHorizontal: 30

    }
    ,
    highlightedText: {
        fontFamily: 'open-sans-bold',
        color: color.primary,
        fontSize: 20
    }
})

export default GameOverScreen ;