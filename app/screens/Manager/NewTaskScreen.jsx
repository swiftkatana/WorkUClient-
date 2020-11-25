import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import requestList from "../../src/api/apiKeys";
import { globalObject } from "../../src/globalObject";
import InfoList from "../../components/InfoList";
import { connect } from "react-redux";
import Recording from "../../class/VoiceRecording";
import { responsiveHeight, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from "react-native-responsive-dimensions";

function Main({ navigation, style }) {
  const [priority, SetPriority] = useState("גבוהה");
  const [header, SetHeader] = useState("");
  const [sendTo, SetSendTo] = useState({});

  const recording = useRef(new Recording());
  const PressHandler = async () => {
    if (!sendTo.email) {
      Alert.alert("הפעולה נחשלה", "לא תויג עובד", [{ text: "הבנתי" }]);
      return;
    }
    if (header.length < 1) {
      Alert.alert("הפעולה נכשלה", "חסר תקציר", [{ text: "הבנתי" }]);
      return;
    }

    const res = await globalObject.SendRequest(requestList.createTaskUrl, {
      employees: [sendTo.email],
      task: { title: header, priority: priority },
    });
    if (res) {
      globalObject.User.tasks.processing[res._id] = res;
      let audio = await recording.current.UploadToServer(
        globalObject.User.email,
        sendTo.email,
        res._id,
        globalObject.User.fullName,
        globalObject.User.role
      );
      if (audio) {
        audio.read = true;
        globalObject.User.tasks.processing[res._id].audios.push(audio);
        globalObject.sendSocketMessage(
          "newTaskSend",
          globalObject.User.tasks.processing[res._id],
          sendTo.email
        );
        navigation.navigate("ManagerMainScreen");
        globalObject.sendNotification(
          sendTo.email,
          res,
          "אפשר לראות אותה בלוח המשימות",
          "משימה חדשה נכנסה",
          "newTask"
        );
      } else {
        Alert.alert("הפעולה נכשלה", "יש להקליט הודעה קולית לפני השליחה", [
          { text: "הבנתי" },
        ]);
      }
    }
  };

  const render = ({ item }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.list} onPress={() => SetSendTo(item)}>
          <Text style={styles.listText}>
            שם: {item.firstName + " " + item.lastName}
          </Text>
          <Image
            style={globalObject.styles.tinyVoiceIcon}
            source={require("../../assets/plus_icon_black.png")}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const GetList = () => {
    let arr = [];
    let employees = globalObject.company.employees;
    for (let i in employees) {
      let employee = employees[i];
      employee.id = employee.email;
      arr.push(employee);
    }
    return arr;
  };
  const GetLen = () => {
    return Object.keys(globalObject.company.employees).length;
  };

  return (
    <KeyboardAvoidingView
      style={{ ...styles.view, ...style.view }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? true : false}
    >
      <View style={styles.container}>
        <Text style={globalObject.styles.menuTitle}>משימה חדשה</Text>
        <Text style={globalObject.styles.subTextWhite}>
          תייג עובד:{" "}
          {sendTo.firstName ? sendTo.firstName + " " + sendTo.lastName : null}{" "}
        </Text>
        <View
          style={{
            ...styles.mainListCon,
            ...style.btn2,
            borderColor: style.btn3.backgroundColor,
          }}
        >
          <InfoList
            render={render}
            GetLen={GetLen}
            GetList={GetList}
            src={require("../../assets/empty_icon_white.png")}
            emptyInfo={"אין לך עובדים כרגע."}
          />

        </View>
        {GetLen() > 0 ? (
          <View style={styles.centerWraper}>
            <View style={styles.inputBoxContainer}>
              <TextInput
                style={globalObject.styles.regInputBox}
                onChangeText={(header) => SetHeader(header)}
                value={header}
                placeholder="תקציר המשימה"
              />
            </View>
            <View style={styles.picker}>
              <Text style={globalObject.styles.subTextWhite}>דחיפות:</Text>
              <Picker
                prompt="בחר דחיפות"
                mode="dialog"
                selectedValue={priority}
                style={styles.itemList}
                onValueChange={(itemValue) => SetPriority(itemValue)}
              >
                <Picker.Item label="גבוהה" value="גבוהה" />
                <Picker.Item label="בינונית" value="בינונית" />
                <Picker.Item label="נמוכה" value="נמוכה" />
              </Picker>
            </View>
            <View style={globalObject.styles.recordSendBtnList}>
              <TouchableOpacity
                style={{ ...styles.vButton, ...style.btn2 }}
                onPressIn={recording.current.StartRecording}
                onPressOut={recording.current.StopRecording}
              >
                <Image
                  style={globalObject.styles.tinyVoiceIcon}
                  source={require("../../assets/microphone_icon.png")}
                />
                <Text style={globalObject.styles.regButtonText}>הקלט משימה</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.vButton, ...style.btn2 }}
                onPress={recording.current.playAudio}
              >
                <Image
                  style={globalObject.styles.tinyVoiceIcon}
                  source={require("../../assets/play_button_icon.png")}
                />
                <Text style={globalObject.styles.regButtonText}>נגן הקלטה</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ ...globalObject.styles.regButton, ...style.btn2 }}
              onPress={() => {
                PressHandler();
              }}
            >
              <Text style={globalObject.styles.regButtonText}>צור משימה</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <TouchableOpacity style={globalObject.styles.exitButton} onPress={() => navigation.pop()}>
          <Image
            style={globalObject.styles.exitIcon}
            source={require("../../assets/exit_icon.png")}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: responsiveScreenHeight(50),
    width: responsiveScreenWidth(50),
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  emptyIcon: {
    marginTop: responsiveScreenHeight(30),
    width: responsiveScreenHeight(6.5),
    height: responsiveScreenHeight(6.5),
  },

  emptyText: {
    color: "white",
    fontWeight: "bold",
  },
  mainListCon: {
    height: responsiveScreenHeight(20),
    width: Dimensions.get("window").width / 1.3,
    backgroundColor: "#6f61ca",
    borderWidth: 1,
    borderRadius: 25,
    marginTop: responsiveScreenHeight(1),
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height * 0.5,
    marginTop: responsiveScreenHeight(1),
  },
  list: {
    flex: 1,
    height: responsiveScreenHeight(5),
    width: Dimensions.get("window").width / 1.5,
    backgroundColor: "seashell",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: responsiveScreenWidth(8),
    borderRadius: 25,
    marginBottom: responsiveScreenHeight(0.5),
    borderWidth: 1,
    borderColor: "lightgray",
  },
  listText: {
    textAlign: "right",
    fontSize: responsiveScreenFontSize(1.7),//14
  },
  centerWraper: {
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    width: Dimensions.get("window").width / 2.5,
    height: responsiveScreenHeight(4),
    flexDirection: "row-reverse",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",

  },
  itemList: {
    width: Dimensions.get("window").width / 3.5,
    color: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBoxContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoConteiner: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextConteiner: {
    padding: responsiveScreenWidth(2),
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "seashell",
  },
  infoText: {
    fontSize: responsiveScreenFontSize(1.4),//11,
    color: "seashell",
    fontWeight: "bold",
  },
  vButton: {
    justifyContent: 'center',
    width: responsiveScreenWidth(30),
    height: responsiveScreenHeight(10.2),
    // backgroundColor: "#6f61ca", // #6357b5
    borderRadius: 25,
    marginVertical: responsiveScreenFontSize(1),
    //paddingVertical: 16,
    marginHorizontal: responsiveScreenWidth(2),
    alignItems: "center",
  },
});
const mapStateToProps = (state) => {
  return { style: state.styles };
};
export default connect(mapStateToProps, {})(Main);
