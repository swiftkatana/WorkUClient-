import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalObject } from '../src/globalObject';
import InfoList from '../components/InfoList';



export default function TaskBoard() {

    const render = ({ item }) => {
        return (
            <View>
                <TouchableOpacity style={styles.list} onPress={() => globalObject.Navigation.navigate('EmployeeUpdateTaskScreen', { item: item })}>
                    <Text style={styles.listText}>תקציר: {item.title}</Text>
                    <View style={styles.koral}>
                        <Image style={styles.tinyLogo} source={require('../assets/arrow_icon_black.png')} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const GetLen = () => {
        return Object.keys(globalObject.User.tasks.processing).length;
    }
    const GetList = () => {
        let arr = [];
        for (var obj in globalObject.User.tasks.processing) {
            let task = globalObject.User.tasks.processing[obj];
            arr.push({ title: task.title, id: obj, priority: task.priority, description: task.description, status: task.status });
        }
        return arr;
    }

    return (
        <View style={styles.view}>
            <Text style={styles.boardTitle}>
                לוח משימות
            </Text>
            <InfoList render={render} GetLen={GetLen} GetList={GetList} emptyInfo={'אין משימות'} textColor={"grey"} opacity={0.4} src={require('../assets/empty_icon.png')} />

        </View>
    )
}
const styles = StyleSheet.create({
    view:
    {
        flex: 9,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 90,
        marginHorizontal: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    listText:
    {
        flex: 4,
        textAlign: "right",
        marginRight: 15,
        fontSize: 14,
    },
    list:
    {
        height: 80,
        width: Dimensions.get('window').width - 60,
        backgroundColor: "white",
        flexDirection: "row-reverse",
        alignItems: 'center',
        marginHorizontal: 20,
        borderRadius: 25,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "lightgrey",
    },
    boardTitle:
    {
        width: Dimensions.get('window').width - 10,
        textAlign: "right",
        marginRight: 90,
        marginTop: 10,
        fontSize: 18,
        paddingVertical: 10,
        borderRadius: 20,
        marginBottom: 10,
        color: "grey",
        fontWeight: "bold",
    },
    logo: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    tinyLogo: {
        width: 20,
        height: 20,
        marginLeft: 15,
        opacity: 0.7,
    },
    but:
    {
        width: 50,
        height: 30,
        marginHorizontal: 15,
        backgroundColor: '#7f71e3',
        textAlign: "center",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 3,
    },
    butText:
    {
        color: "seashell",
    },
    koral:
    {
        flex: 1,
        flexDirection: "column",
    },
})
