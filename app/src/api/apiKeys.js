export default requestList = {
  //user api
  //send {email, password,expoId}
  //recive {userData}
  userLoginUrl: "/api/user/login",

  // send {email,password,firstName,lastName}
  //recive {userData}
  userRegisterUrl: "/api/user/register",

  // send{createDateOfUser,email,timeWorkObj}
  // recive none
  userAddNewWorkTime: "/api/user/addnewworktime",

  // send{newPassword,oldPassword,email}
  // recive none

  userChangePasswrordUrl: "/api/user/changepassword",

  // send{email, restCode, newPassword}
  // recive none
  userChangePasswordWithRestCode: "/api/user/restpasswordrestcode",

  // send{email}
  // recive none
  userRequestRestCode: "/api/user/createrestpasswordcode",

  //send{createDateOfUser,email}
  // recive none
  userRestWorkTimesUrl: "/api/user/restuserworktime",

  //send {email,code}
  //revice {userData}
  userJoinCompanyUrl: "/api/user/joincompany",

  //send {_id,comment,email(email of the user who update),complete}
  //recive none
  userUpdateTaskUrl: "/api/user/updatetask",

  // send {_id,email}
  // recive {task}
  userGetTaskUrl: "/api/user/gettask",

  // send {type,body,fullName,email}
  // recive {reuqest}
  userSendPersonalRequestUrl: "/api/user/personalreuqest",

  //boss api

  //send {email}
  // recive expoId
  getExpoIdUrl: "/api/company/getexpoid",

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

  // send {_id,email,status}
  // recive {reuqest}
  updatePersonalRequestUrl: "/api/company/updatepersonalreuqest",
};
