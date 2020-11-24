import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalObject } from '../src/globalObject';
import InfoList from '../components/InfoList';
import { responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';



export default function TaskBoard({ navigation }) {
  const render = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={globalObject.styles.list}
          onPress={() =>
            navigation.navigate("TaskUpdateVoiceScreen", {
              item: item,
              shouldRender: true,
            })
          }
        >
          <Text style={styles.listText}>תקציר: {item.title}</Text>
          <View style={styles.koral}>
            <Image
              style={globalObject.styles.arrowIcon}
              source={require("../assets/arrow_icon_black.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

    const GetLen = () => {
        return Object.keys(globalObject.User.tasks.processing).length;
    }
    const GetList = () => {
      let arr1 = [];
      let arr2 = [];
      let arr3 = [];
      for (var obj in globalObject.User.tasks.processing) {
        switch (globalObject.User.tasks.processing[obj].priority) {
          case "גבוהה":
            arr1.push(globalObject.User.tasks.processing[obj]);
            break;
          case "בינונית":
            arr2.push(globalObject.User.tasks.processing[obj]);
  
            break;
          case "נמוכה":
            arr3.push(globalObject.User.tasks.processing[obj]);
            break;
          default:
            break;
        }
      }
      return [...arr1, ...arr2, ...arr3];
    };

  return (
    <View style={styles.view}>
      <Text style={styles.boardTitle}>לוח משימות</Text>
      <View style={{ flex: 1 }}>
        <InfoList
          render={render}
          GetLen={GetLen}
          GetList={GetList}
          emptyInfo={"אין משימות"}
          textColor={"grey"}
          opacity={0.4}
          src={require("../assets/empty_icon.png")}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    view:
    {
        flex: 9,
        height: Dimensions.get('window').height,
        alignItems: 'center',
        //borderTopRightRadius: 20,
        //borderTopLeftRadius: 90,
        //marginHorizontal: responsiveScreenWidth(1),
        //borderBottomLeftRadius: 5,
        //borderBottomRightRadius: 5,
    },
    listText:
    {
        flex: 4,
        textAlign: "right",
        marginRight: 15,
        fontSize: responsiveScreenFontSize(1.7),
    },
    boardTitle:
    {
        width: Dimensions.get('window').width*0.98,
        textAlign: "right",
        marginRight: responsiveScreenWidth(23),
        marginTop: responsiveScreenHeight(1.5),
        fontSize: responsiveScreenFontSize(2.2),
        paddingVertical: responsiveScreenHeight(1.2),
        borderRadius: 20,
        marginBottom: responsiveScreenHeight(1.2),
        color: "grey",
        fontWeight: "bold",
    },
});
