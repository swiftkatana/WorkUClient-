import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';

export default function Logo() {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/workU_icon_p.png')} />
            <Text style={styles.logoText}>התחילו לעבוד</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: responsiveScreenHeight(12),
    },
    logo: {
        width: responsiveScreenWidth(30),
        height: responsiveScreenWidth(30),
    },
    logoText: {
        paddingBottom: responsiveScreenHeight(1),
        marginVertical: responsiveScreenHeight(2),
        fontSize: responsiveScreenFontSize(2.2),
        color: '#000000',
    }
});
