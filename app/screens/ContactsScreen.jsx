import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalObject } from '../src/globalObject';
import InfoList from '../components/InfoList';
import { connect } from 'react-redux';






function Main({ navigation, style }) {
    const GetLen = () => {
        let keys = Object.keys(globalObject.User.personalRequests);
        let len = 0;
        for (let i = 0; i < keys.length; i++) {
            if (globalObject.User.personalRequests[keys[i]].status == "בטיפול")
                len++;
        }
        return len;
    }
    const GetList = () => {
        var arr = [];
        for (var obj in globalObject.User.personalRequests) {
            let request = globalObject.User.personalRequests[obj];
            arr.push({ id: request._id, email: request.email, type: request.type, body: request.body, fullName: request.fullName, status: request.status, date: request.date });
        }
        return arr;
    }

    const render = ({ item }) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.list} onPress={() => navigation.navigate("DisplaySingleContactScreen", { item: item })}>
                    <Image style={styles.userIcon} source={require('../assets/user_icon.png')} />
                    <Text style={styles.listText}>שם: {item.date}</Text>
                    <Image style={styles.tinyLogo} source={require('../assets/arrow_icon_black.png')} />
                </TouchableOpacity>
            </View>
        )
    }



    return (
        <View style={{ ...styles.view, ...style.view }}>


            <Text style={styles.title}>אנשי קשר</Text>
            <View style={styles.mainListCon}>

                <View style={styles.listContainer}>

                    <InfoList render={render} GetLen={GetLen} GetList={GetList} emptyInfo={'אין אנשי קשר'} src={require('../assets/empty_icon_white.png')} />
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
        height: Dimensions.get('window').height,


    },
    container:
    {
        //paddingTop: 10,
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',


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
        height: Dimensions.get('window').height/1.6 -20,
        width: Dimensions.get('window').width/1.1,
        marginTop: 10,
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
    list:
    {
        height: 70,
        width: Dimensions.get('window').width/1.16,
        backgroundColor: "white",
        flexDirection: "row-reverse",
        alignItems: 'center',
        textAlign: "center",
        //marginHorizontal: 20,
        justifyContent: 'center',
        borderRadius: 25,
        marginBottom: 6,
        borderWidth: 2,
        borderColor: "lightgray",
    },
    listText:
    {
        flex: 3,
        textAlign: "center",
        fontSize: 14,
        //marginLeft: 5,
        marginRight: 10,
    },
    employeeName:
    {
        flex: 3,
        textAlign: "center",
        marginRight: 10,
        fontSize: 14,
        fontWeight: "bold",
    },
    userIcon:{
        width: 35,
        height: 35,
        //marginLeft: 15,
        marginRight: 15,
    },
    tinyLogo: {

        width: 20,
        height: 20,
        marginLeft: 15,
        marginRight: 10,
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