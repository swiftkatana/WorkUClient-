import { Alert, Button } from "react-native";
import sever from "./api/serverApi"
import { responedList } from "./respondList";


class global
{
    constructor() {
        this.User = {name:"דניאל"};   //when log in used to store the user object
        this.Navigation; //used for storing navigation oject
        this.id;
        this.timer = 0;
        this.tasks = [];
        this.language;
        this.ErrorHandler = (error)=>{
          title = "5";
          msg = "5";
          alertButton = [{text: "הבנתי",onPress: () => console.log("OK Pressed")}];
          switch(error){
            // error when someone try to login but user not exists or wrong info
            case responedList.usersNotFound:
              title = "הכניסה נכשלה";
              msg = " שם המשתמש או הסיסמה שגויים אנא נסו שנית";
              break;
            // when try to create a company and there is already a company with this name
            case responedList.companyNameExists:
              title = "ההרשמה נכשלה";
              msg = ""
              break;
            // error when someone try to use a fake or not exists email 
            case responedList.emailIsFake:
              title = "ההרשמה נכשלה";
              msg = "האימייל אינו תקין";
              break;
            default:
              title = error;
              msg = "363";
              break;
          }
          Alert.alert(title,msg,alertButton,{cancelable: false});
        }

        this.SendRequest = async (url,obj)=>
        {
          const res = await sever.post(url,obj);
          if(res.data.err)
          {
              switch(res.data.err)
              {
                case responedList.DBError:
                case responedList.FaildSave:
                    return await this.SendRequest(url,obj);
                default:
                  break;
              }
              return {data:null,error:res.data.err};
          }
          return {data:res.data,error:null};
        }

      }

}
const globalObject = new global();
export  {globalObject};



