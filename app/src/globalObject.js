import sever from "./api/serverApi"
import { responedList } from "./respondList";


class gobal
{
    constructor() {
        this.User = {name:"דניאל"};   //when log in used to store the user object
        this.Navigation; //used for storing navigation oject
        this.id;
        this.timer = 0;
        this.tasks = [];

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
              }
              return {data:null,status:res.data.err};
          }
          return {data:res.data,status:"OKAY"};
        }

      }

}
const gobalObject = new gobal();
export  {gobalObject};



