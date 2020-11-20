import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { globalObject } from '../../src/globalObject'

function Main({ navigation, style }) {
    return (
        <View style={{ ...styles.view, ...style.view }}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.pop()}>
                <Text style={styles.exitText}>X</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>כלי ניהול</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NewTaskScreen")}>
                    <Text style={styles.buttonText}>שלח משימה לעובד</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("NewRequestScreen")}>
                    <Text style={styles.buttonText}>היסטוריית משימות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WorkingTimeReportScreen")}>
                    <Text style={styles.buttonText}>ניהול משמרות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WorkingTimeReportScreen")}>
                    <Text style={styles.buttonText}>שליחת תלוש משכורת</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WorkingTimeReportScreen")}>
                    <Text style={styles.buttonText}>דו"ח שעות חודשי של עובד</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    view: {
        //marginTop:50,
        flex: 1,
        backgroundColor: globalObject.styles.backGroundColors,
    },
    buttonsContainer:
    {
        //paddingTop: 10,
        alignItems: 'flex-end',
    },
    button:
    {
        margin: 20,
        marginRight: 30,

    },
    buttonText:
    {
        fontSize: 16,
        color: "seashell",
    },
    title:
    {
        margin: 20,
        marginRight: 30,
        fontSize: 28,
        color: "seashell",
        textDecorationLine: "underline"

    },
    exitButton:
    {
        paddingTop: 60,
        //position:'absolute',
        marginLeft: 30,

    },
    exitText:
    {
        fontSize: 30,
        color: "seashell",

    }
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)