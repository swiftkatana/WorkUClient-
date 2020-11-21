import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { globalObject } from '../../src/globalObject'

var arr = [{ type: "חופשת מחלה", date: "10.2.20", id: "123" }, { type: "חופשתvv מחלה", date: "10.1.20", id: "124" }]


const render = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.list}>
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

                <Text style={styles.title}>
                    תלושי שכר</Text>
                <View style={styles.mainListCon}>
                    <View style={styles.listContainer}>

                        <FlatList
                            data={arr}
                            renderItem={render}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
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
        height: Dimensions.get('window').height,


    },
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',


        //borderWidth:1,
    },
    mainListCon:{
        height: Dimensions.get('window').height/1.6,
        width: Dimensions.get('window').width/1.1,
        backgroundColor: "#6f61ca",
        borderWidth:1,
        borderColor: "#584DA1",
        borderRadius: 25,

    },
    listContainer:{
        //flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height/2,
        width: Dimensions.get('window').width/1.1,
        marginTop: 10,
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
    tinyLogo:
    {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },
    list:
    {
        height: 60,
        width: Dimensions.get('window').width - 50,
        backgroundColor: "seashell",
        flexDirection: "row-reverse",
        alignItems: 'center',
        textAlign: "center",
        //marginHorizontal: 20,
        justifyContent: 'space-evenly',
        borderRadius: 25,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "lightgray",
    },
    listText:
    {
        textAlign: "center",
        fontSize: 14,
        justifyContent: 'center',
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