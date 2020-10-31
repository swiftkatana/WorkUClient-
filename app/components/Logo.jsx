import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Logo() {
    return (
        <View style= {styles.container}>
            <Image style= {styles.logo} source= {require('../assets/icon.png')}/>
            <Text style= {styles.logoText}>Welcome</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 100
    },
    logo: {
        width: 40,
        height: 70,
    },
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: '#000000',
    }
});
