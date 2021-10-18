import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/color';
import DefaultStyles from '../constants/DefaultStyles';
const Header = props => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor:'#f7287b', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
})