import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View ,Dimensions, FlatList, Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalObject } from '../src/globalObject'


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

    const [tasks,UpdateTask] = useState([])

    useEffect(() => {
        
        var arr = [];
        for(var obj in globalObject.User.tasks.completed)
        { 

            let task = globalObject.User.tasks.completed[obj];
            let id = obj;
            if(task.status === "uncompleted")
                arr.push({title:task.title,id,priority:task.priority,description:task.description,status:task.status});

        }
        UpdateTask(arr);
        return () => {
            UpdateTask([])
        }
    }, [])

    return (
        <View style={styles.view}>
            <Text style={styles.boardTitle}>
                לוח משימות
            </Text>
            <FlatList
            data={tasks}
            renderItem={render}
            keyExtractor={item => item.id}
            
            />
        </View>
    )
}
const styles = StyleSheet.create({
    view:
    {
        flex:9,
        height: Dimensions.get('window').height,
        alignItems: 'center',
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
        height:80,
        width:Dimensions.get('window').width-60,
        backgroundColor:"white",
        flexDirection:"row-reverse",
        alignItems: 'center',
        marginHorizontal: 20,

        borderRadius:25,
        marginBottom:10,
        borderWidth:1,
        borderColor: "lightgray",
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    tinyLogo:{
        width: 40,
        height: 40,
        marginBottom: 40,      
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
