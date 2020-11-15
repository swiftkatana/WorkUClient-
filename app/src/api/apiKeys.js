const requestList = {
  //user api
  //send {email, password,expoid}
  //recive {userData}
  userLoginUrl: "/api/user/login",

  // send {email,password,firstName,lastName}
  //recive {userData}
  userRegisterUrl: "/api/user/register",

  //send {email,code}
  //revice {userData}
  userJoinCompany: "/api/user/joincompany",

  //send {_id,comment,email(email of the user who update),complete}
  //recive none
  userUpdateTask: "/api/user/updatetask",

  // send {_id,email}
  // recive {task}
  userGetTask: "/api/user/gettask",

  // send {type,body,fullName,email}
  // recive {reuqest}
  userSendPersonalRequest: "/api/user/personalreuqest",

  // send {_id,status,respond}
  // recive {reuqest}
  updatePersonalRequest: "/api/company/updatepersonalreuqest",

  //boss api

  // send {mangar{email,joinCode} ,email}
  // recive none
  userLeaveUrl: "/api/company/leave",

  // send {companyName,email}
  // recive  {company}
  createCompanyUrl: "/api/company/createcompany",

  // send {employees[email0,email1,email2,...],task{title,description,priority}}
  // recive {task}
  createTaskUrl: "/api/company/addtasks",

  // send {joincode,email}
  // recvice {company}
  getCompanyUrl: "/api/company/getcompany",
};

export default requestList;
