import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { globalObject } from '../../src/globalObject'

function Main({ navigation, style }) {
    return (
        <View style={{ ...styles.view, ...style.view }}>

            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>הבקשות שלי</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AllRequestScreen")}>
                    <Text style={styles.buttonText}>כל הבקשות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NewRequestScreen")}>
                    <Text style={styles.buttonText}>בקשה חדשה</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../../assets/exit_icon.png')} />
                </TouchableOpacity>
            </View>
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
    buttonsContainer:
    {
        //paddingTop: 10,
        alignItems: 'center',

    },
    button:
    {
        margin: 20,
        //marginRight: 30,

    },
    buttonText:
    {
        fontSize: 24,
        color: "seashell",

    },
    title:
    {
        margin: 20,
        //marginRight: 30,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth:2,
        borderColor: "seashell",
        textAlign:"center",
        width: Dimensions.get('window').width*0.80,

    },
    exitButton:
    {
        paddingTop: 40,
        //position:'absolute',
        //marginLeft: 30,

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