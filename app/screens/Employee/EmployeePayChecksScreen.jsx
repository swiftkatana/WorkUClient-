import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { connect } from 'react-redux'
import { globalObject } from '../../src/globalObject'

var arr = [{ type: "חופשת מחלה", date: "10.2.20", id: "123" }, { type: "חופשתvv מחלה", date: "10.1.20", id: "124" }]


const render = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={ styles.list}>
                <Text style={styles.listText}>תאריך: {item.date}</Text>
                <TouchableOpacity>
                    <Image style={styles.tinyLogo} source={require('../../assets/pdf_icon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
function Main({ navigation, style }) {
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <View style={styles.container}>

                <Text style={globalObject.styles.menuTitle}>
                    תלושי שכר</Text>
                <View style={{ ...globalObject.styles.mainListCon, ...style.view, borderColor: style.btn3.backgroundColor,backgroundColor: style.btn2.backgroundColor }}>
                    <View style={globalObject.styles.listContainer}>

                        <FlatList
                            data={arr}
                            renderItem={render}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
                        <Image style={globalObject.styles.exitIcon} source={require('../../assets/exit_icon.png')} />
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
        height: Dimensions.get('window').height,


    },
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',


        //borderWidth:1,
    },
    tinyLogo:
    {
        width: responsiveScreenHeight(5),
        height: responsiveScreenHeight(5),
        alignItems: 'center',
        justifyContent: 'center',

    },
    list:
    {
        height: responsiveScreenHeight(9),
        width: Dimensions.get('window').width*0.85,
        backgroundColor: "seashell",
        flexDirection: "row-reverse",
        alignItems: 'center',
        textAlign: "center",
        //marginHorizontal: 20,
        justifyContent: 'space-evenly',
        borderRadius: 25,
        marginBottom: responsiveScreenHeight(1),
        borderWidth: 1,
        borderColor: "lightgray",
    },
    listText:
    {
        textAlign: "center",
        fontSize: responsiveScreenFontSize(1.7),//14
        justifyContent: 'center',
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)