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
                <Text style={styles.title}>פורטל עובד</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EmployeePayChecksScreen")}>
                    <Text style={styles.buttonText}>תלושי שכר</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("EmployeeShiftsScreen")}>
                    <Text style={styles.buttonText}>משמרות</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("WorkingTimeReportScreen")}>
                    <Text style={styles.buttonText}>דו"ח שעות חודשי</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,

    },
    buttonsContainer:
    {
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