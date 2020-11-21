import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SectionList, Dimensions, Image, } from 'react-native'
import { connect } from 'react-redux'
import { changeStyle } from '../src/action'
import apiKeys from '../src/api/apiKeys'
import { globalObject } from '../src/globalObject'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

let colorsArry = [{ color: "#7f71e3", id: 0 }, { color: "#5d8aa8", id: 1 }, { color: "#191970", id: 2 }, { color: "#a4c139", id: 3 }, { color: "#fe6f5e", id: 4 }, { color: "#ff2052", id: 5 }]
function Main({ navigation, style, changeStyle }) {

    const [pickColor, setPickColor] = useState(style.view.backgroundColor);
    const handlerForSwich = (item) => {
        let style = {
            view: { backgroundColor: item.color }
        }
        switch (item.id) {
            case 0:
                style.btn1 = {
                    backgroundColor: item.color
                }
                style.btn2 = {
                    backgroundColor: "#6f61ca"
                }
                style.btn3 = {
                    backgroundColor: "#584DA1"
                }
                break;
            case 1:
                style.btn1 = {
                    backgroundColor: item.color
                }
                style.btn2 = {
                    backgroundColor: "#4d8aa8"
                }
                style.btn3 = {
                    backgroundColor: "#3d8aa8"
                }
                break;
            case 2:
                style.btn1 = {
                    backgroundColor: item.color
                }
                style.btn2 = {
                    backgroundColor: "#181970"
                }
                style.btn3 = {
                    backgroundColor: "#171970"
                }
                break;
            case 3:
                style.btn1 = {
                    backgroundColor: item.color
                }
                style.btn2 = {
                    backgroundColor: "#a3d121"
                }
                style.btn3 = {
                    backgroundColor: "#d2d111"
                }
                break;
            case 4:
                style.btn1 = {
                    backgroundColor: item.color
                }
                style.btn2 = {
                    backgroundColor: "#ee5f4e"
                }
                style.btn3 = {
                    backgroundColor: "#eadf4e"
                }
                break;
            case 5:
                style.btn1 = {
                    backgroundColor: item.color
                }
                style.btn2 = {
                    backgroundColor: "#fc1052"
                }
                style.btn3 = {
                    backgroundColor: "#fc1012"
                }
                break;

            default:
                break;
        }

        setPickColor(item.color)
        globalObject.SendRequest(apiKeys.userUpdateStyleUrl, { styles: style, email: globalObject.User.email })
        changeStyle(style)
    }
    const renderListColors = () => {

        return colorsArry.map(item => (
            <TouchableOpacity key={item.id} onPress={() => handlerForSwich(item)}>
                <View style={{ ...styles.colorPicker, backgroundColor: item.color, borderColor: item.color === pickColor ? "white" : pickColor, }}></View>
            </TouchableOpacity>
        ))

    }
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.colorsContainer}>
                <Text style={styles.title}>צבע גופן</Text>
                <Text style={styles.textStyle}>בחר צבע רקע לאפליקצייה:</Text>
                <View style={styles.buttonsColorsContainer}>
                    {renderListColors()}
                </View>
            </View>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                    <Image style={styles.exitIcon} source={require('../assets/exit_icon.png')} />
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
    colorPicker: {
        
        borderWidth: 2,
        margin: 1,
        width: responsiveWidth(14.5),
        height: responsiveHeight(8),
        borderRadius:90,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10

    }, colorsContainer: {
        //flex: 1,

        alignItems:'center',
        justifyContent: 'center',
        flexDirection: "column",
    },
    buttonsColorsContainer:
    {
        alignItems:'center',
        justifyContent: 'center',
        //flex: 1,
        flexDirection: "row",
        //margin: 10,
    },
    button:
    {
        //margin: 20,
        //marginRight: 30,

    },
    buttonText:
    {
        fontSize: 16,
        color: "seashell",

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
    textStyle:{
        margin:20,
        fontSize: 24,
        color: "seashell",
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
export default connect(mapStateToProps, { changeStyle })(Main)