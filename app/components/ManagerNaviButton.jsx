import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import { globalObject } from '../src/globalObject';

function ManagerNaviButton({ navigation, style }) {



    return (
        <View style={styles.view}>


            <TouchableOpacity style={{ ...styles.settings, ...style.btn1 }} onPress={() => navigation.navigate('ManagerManageRequestsScreen')}>
                <Image style={styles.tinyLogo} source={require('../assets/notebook_icon.png')} />
                <Text style={styles.settingsFont}>ניהול בקשות</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.settings, ...style.btn1 }} onPress={() => navigation.navigate('ManagerToolsScreen')}>
                <Image style={styles.tinyLogo} source={require('../assets/suitcase_icon.png')} />
                <Text style={styles.settingsFont}>כלי ניהול</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.settings, ...style.btn1 }}>
                <Image style={styles.tinyLogo} source={require('../assets/statistics_icon.png')} />
                <Text style={styles.settingsFont}>סטטיסטיקה</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ ...styles.settings, ...style.view }} onPress={() => navigation.navigate('ContactsScreen')}>
                <Image style={styles.tinyLogo} source={require('../assets/group_icon.png')} />
                <Text style={styles.settingsFont}>אנשי קשר</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        //marginTop: 5,
        flex: 2,
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: "#efeef4",
        marginHorizontal: responsiveScreenWidth(2),
        marginBottom: responsiveScreenHeight(1),
        textAlign: "center",
        alignItems: 'center',
    },
    settings:
    {
        borderRadius: 30,
        width: responsiveScreenWidth(22),
        height: responsiveScreenWidth(19),
        justifyContent: 'center',
        alignItems: 'center',

    },
    settingsFont:
    {
        textAlign: "center",
        fontSize: responsiveScreenFontSize(1.4),
        color: "seashell",
        fontWeight: "bold",
    },
    tinyLogo: {
        width: responsiveScreenHeight(4),
        height: responsiveScreenHeight(4),
    },
})
const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(ManagerNaviButton)