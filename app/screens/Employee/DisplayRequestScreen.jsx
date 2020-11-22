import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import requestList from '../../src/api/apiKeys'
import { globalObject } from '../../src/globalObject'


function Main({ navigation, style }) {

    const item = navigation.state.params.item;
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.container}>

                <View >
                    <Text style={styles.title}>בקשה</Text>
                </View>
                <View style={styles.requestContainer}>
                    <Text style={styles.subTitle}>תאריך: {item.date}</Text>
                    <Text style={styles.subTitle}>סוג בקשה: {item.type}</Text>
                    <Text style={styles.subTitle}>סטטוס: {item.status}</Text>
                    <Text style={styles.bodyHeader}>פירוט:</Text>
                    <Text style={styles.subTitle}>{item.body}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
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
        justifyContent: 'center',

    },
    title:
    {

        textAlign:"center",
        width: Dimensions.get('window').width*0.80,
        margin: 20,
        //marginRight: 30,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth:2,
        borderColor: "seashell",
    },
    requestContainer:{
        alignItems:'center',
        justifyContent: 'center',
        borderWidth:2,
        borderColor: "grey",
        borderRadius:30,
        width: Dimensions.get('window').width*0.80,
        height: Dimensions.get('window').height*0.30,
        backgroundColor: "seashell",
    },
    subTitle:
    {
        marginRight: 30,
        marginLeft: 30,
        fontSize: 18,
        color: "black",


    },
    bodyHeader: {
        marginRight: 30,
        marginLeft: 30,

        fontSize: 16,
        color: "seashell",
        marginTop: 30,

    },
    itemList:
    {
        textAlign: "right",
        width: 300,
        textAlign: 'right',
        justifyContent: 'center',


    },


    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'seashell',
        textAlign: 'center',
    },
    exitButton:
    {
        paddingTop: 40,


    },
    exitIcon:{
        height:50,
        width:50,
    },


})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)