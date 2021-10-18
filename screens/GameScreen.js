import React,{useState, useRef, useEffect} from "react";
import {View, Text, StyleSheet, TextInput, Button,Alert, ScrollView, FlatList} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import DefaultStyles from "../constants/DefaultStyles";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random()* (max - min)) + min;
    if(rndNum === exclude) {
        return generateRandomBetween(min,max,exclude);
    } else {
        return rndNum;
    }
}

const randomListItem = (value, numberOfRound) => (<View key={value} style={styles.listItem}>
                                        <Text>#{numberOfRound}</Text>
                                        <Text>{value}</Text>
                                   </View>);

const GameScreen = props => {
        const initialGuess = generateRandomBetween(1,100, props.userChoice);
        const [currentGuess, setCurrentGuess] = useState(initialGuess);

        const [pastGuesses, setPastGuesses] = useState([initialGuess]);
        const currentLow = useRef(1);
        const currentHigh = useRef(100);

        const {userChoice, onGameOver} = props;

        useEffect(()=> {
            if(currentGuess === userChoice){
                onGameOver(pastGuesses.length);
            }
        }, [currentGuess, userChoice, onGameOver]);

        const nextGuessHandler = direction => {
            if( 
                (direction === 'lower' && currentGuess < props.userChoice) ||
                (direction === 'greater' && currentGuess > props.userChoice)
            ) {
                Alert.alert("You are lying!", "Wrong Hint...", [{text: 'Sorry!', style: 'cancel'}])
                return;
            }
            if(direction === 'lower') {
                currentHigh.current = currentGuess;
            }
            if(direction === 'greater') {
                currentLow.current = currentGuess + 1;
            }
            const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current , currentGuess);
            setCurrentGuess(nextNumber);
           // setRounds( curRounds => curRounds + 1);
           setPastGuesses(curPastGuesses => [nextNumber , ...curPastGuesses])
        }

        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Opponent's Guess</Text>
                <NumberContainer>{currentGuess}</NumberContainer>
                <Card style={styles.buttonContainer}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')} ><Ionicons name='md-remove' size={28} color="white" /></MainButton>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')} ><Ionicons name='md-add' size={28} color="white" /></MainButton>
                </Card>
                <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index )=> randomListItem(guess,pastGuesses.length - index))}
                </ScrollView>
                </View>
            </View>
        );

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%' 
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    listContainer: {
        flex: 1,
        width: '80%',
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

export default GameScreen;