import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

import * as Linking from 'expo-linking';




function Main({ navigation, style }) {


    const item = navigation.state.params.item;

    return (
        <View style={{ ...styles.view, ...style.view }}>

            <Image style={styles.imageProfileStyle} source={{uri:item.imageProfile}} />

            <Text style={styles.title}> {item.fullName} </Text>
            <View style={styles.mainListCon}>
                    <TouchableOpacity >
                        <Text></Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ ...styles.button, ...style.btn2 }} onPress={()=>{ Linking.openURL("tel://" + item.phone);}}>
                        <Text style={styles.buttonText}>טלפון</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{ ...styles.button, ...style.btn2 }}  onPress={()=>{ Linking.openURL('http://api.whatsapp.com/send?phone=972' + + item.phone);}} >
                        <Text style={styles.buttonText}>וואצפ</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.button, ...style.btn2 }} onPress={()=>{ Linking.openURL("mailto://" + item.email);}}>
                        <Text style={styles.buttonText}>אימייל</Text>
                    </TouchableOpacity>
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
    mainListCon:{
        height: Dimensions.get('window').height*0.40,
        backgroundColor: "seashell",
        borderWidth:1,
        borderColor: "grey",
        borderRadius: 25,

    },
    button: {
        width: responsiveWidth(70),
        height: responsiveHeight(10),
        borderRadius: 60,
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent:"center",
    },
    title:
    {
        margin: 20,
        fontSize: 48,
        color: "seashell",
        borderBottomWidth:2,
        borderColor: "seashell",
        textAlign:"center",
        width: Dimensions.get('window').width*0.80,

    },
    buttonText:{
        color:"seashell",
        fontSize:18,
    },
    exitButton:
    {
        paddingTop: Dimensions.get('window').height*0.05,
        

    },
    exitIcon:{
        height:50,
        width:50,
    },
    imageProfileStyle:
    {
        height:70,
        width:70,
    },
})


const mapStateToProps = (state) => {
    return { style: state.styles }
}
export default connect(mapStateToProps, {})(Main)