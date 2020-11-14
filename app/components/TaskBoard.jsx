import React from 'react'
import { StyleSheet, Text, View ,Dimensions, FlatList, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalObject } from '../src/globalObject'

var arr = []
for(let i = 0;i<6;i++)
{ 
    if(i == 0)
    arr.push({title:"222222222kkkkkkkkkkkkkkkkkkלנקות את וחנות ועדכן את שמואל",value:(9999).toString()});
else
    arr.push({title:i.toString(),value:(i+40).toString()});

}

const render = ({item})=>
{
    return(   
    <View style={styles.list}>
        <Text style={styles.listText}>תקציר: {item.title}</Text>
        <View style={styles.koral}>
        <TouchableOpacity style={styles.logo} onPress={()=>globalObject.Navigation.navigate('UpdateTaskScreen',{item:item})}>
            <Image style={styles.tinyLogo} source={require('../assets/plus_icon.png')}/>
        </TouchableOpacity>
        </View>
    </View>
    )    
}  

export default function TaskBoard() {

    return (
        <View style={styles.view}>
            <Text style={styles.boardTitle}>
                לוח משימות
            </Text>
            <FlatList
            data={arr}
            renderItem={render}
            keyExtractor={item => item.value}
            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view:
    {
        //#bf3b49
        flex:9,
        //borderWidth:1,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        //backgroundColor: "#ededed",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 90,
        marginHorizontal: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        

        
    },
    listText:
    {   flex:3,
        textAlign:"right",
        marginRight:15,
        fontSize: 14,

    },
    list:
    {
        //borderWidth: 1,
        height:80,
        width:Dimensions.get('window').width-60,
        //backgroundColor:"seashell",
        backgroundColor:"white",
        flexDirection:"row-reverse",
        alignItems: 'center',
        marginHorizontal: 20,

        borderRadius:25,
        marginBottom:10,
        borderWidth:1,
        borderColor: "lightgrey",


    },  
    boardTitle:
    {
        width:Dimensions.get('window').width -10,
        textAlign:"right",
        marginRight: 90,
        marginTop: 10,
        fontSize:18,
        paddingVertical: 10,
        borderRadius:20,
        marginBottom: 10,
        color: "grey",
        fontWeight: "bold",

    },
    logo:{
        //flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        //zIndex: 5,

    },
    tinyLogo:{
        width: 40,
        height: 40,
        //alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        marginBottom: 40,
        //marginRight: 12,
        //zIndex: 5,
        
    },
    tinyAlert:{
        width: 20,
        height: 20,
        //alignItems: 'flex-end',
        //justifyContent: 'flex-end',
        //marginRight: 12,
        zIndex: 5,
        
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
    borderRadius:10,
    marginVertical:3,
    },
    butText:
    {
        color:"seashell",
    },
    koral:
    {
        flex:1,
        flexDirection:"column",
    },
})
