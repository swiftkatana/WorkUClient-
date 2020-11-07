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

        this.ErrorHandler = (error)=>{
          title = "";
          msg = "";
          alertButton = [{text: "הבנתי",onPress: () => console.log("OK Pressed")}];
          console.log("test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          switch(error){
            //error when someone try to register but using a exists email please try diffrent email
            case responedList.loginFaildAlreadyConnect:
              title = "ההרשמה נכשלה";
              msg = "האימייל הזה כבר קיים במערכת";
              break;
            // error when try to login to user but could not found email is wrong
            case responedList.UserNotCreated:
              title = "הכניסה נכשלה";
              msg = "המשתמש אינו רשום במערכת או שהוכנס אימייל שגוי";
              break;
            // when try to create a company and there is already a company with this name
            case responedList.companyNameExists:
              title = "ההרשמה נכשלה";
              msg = ""
              break;
            // error when password is unvalid   
            case responedList.UnvalidPassword:
              title = "";
              msg = "";
              break;
            // error when someone try to login but user not exists or wrong info
            case responedList.usersNotFound:
              title = "";
              msg = "";
              break;
            // error when someone try to use a fake or not exists email 
            case responedList.emailIsFake:
              title = "";
              msg = "";
              break;
            default:
              break;
          }
          console.log("test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
          Alert.alert(title,msg,alertButton,{cancelable: false});
        }

        this.SendRequest = async (url,obj)=>
        {
          console.log("2");
          const res = await sever.post(url,obj);
          console.log("1");
          console.log(res);
          if(res.data.err)
          {
            console.log("1234");
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



