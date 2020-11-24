import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'
import requestList from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'


function Main({ navigation, style }) {

    const item = navigation.state.params.item;
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.container}>

                <View >
                    <Text style={globalObject.styles.menuTitle}>בקשה</Text>
                </View>
                <View style={styles.requestContainer}>
                    <Text style={globalObject.styles.subTextBlack}>תאריך: {item.date}</Text>
                    <Text style={globalObject.styles.subTextBlack}>סוג בקשה: {item.type}</Text>
                    <Text style={globalObject.styles.subTextBlack}>סטטוס: {item.status}</Text>
                    <Text style={styles.bodyHeader}>פירוט:</Text>
                    <Text style={globalObject.styles.subTextBlack}>{item.body}</Text>
                </View>
            </View>
            <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={globalObject.styles.exitIcon} source={require('../../assets/exit_icon.png')} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',


    },
    container:
    {
        alignItems:'center',
        textAlign:'center',
        justifyContent: 'center',

    },
    requestContainer:{
        alignItems:'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor: "grey",
        borderRadius:30,
        width: Dimensions.get('window').width*0.80,
        height: Dimensions.get('window').height*0.30,
        backgroundColor: "seashell",
        textAlign:'center',

    },
    bodyHeader: {
      //  marginHorizontal:responsiveScreenWidth(5),
        fontSize: responsiveScreenFontSize(2.2),//18
        color: "black",
        marginTop: responsiveScreenHeight(2),

    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)