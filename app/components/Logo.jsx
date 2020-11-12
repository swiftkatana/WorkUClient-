import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Logo() {
    return (
        <View style= {styles.container}>
            <Image style= {styles.logo} source= {require('../assets/workU_icon_p.png')}/>
            <Text style= {styles.logoText}>התחילו לעבוד</Text>
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
        width: 120,
        height: 120,
    },
    logoText: {
        paddingBottom: 5,
        marginVertical: 15,
        fontSize: 18,
        color: '#000000',
    }
});
