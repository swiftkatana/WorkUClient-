//user api

//send {email, password}
//recive {userData}
exports.userLoginUrl = "/api/user/login";

// send {email,password,firstName,lastName}
//recive {userData}
exports.userRegisterUrl = "/api/user/register";

//send {email,code}
//revice {userData}
exports.userJoinCompany = "/api/user/joincompany";

//send {_id,text}
//recive none
exports.usercompleteTask = "/api/user/completetask";

// send {_id,email}
// recive {task}
exports.userGetTask = "/api/user/gettask";

// send {type,body,fullName,email}
// recive {reuqest}
exports.userSendPersonalRequest = "/api/user/personalreuqest";

//boss api

// send {mangar{email,joinCode} ,email}
// recive none
exports.userLeaveUrl = "/api/company/leave";

// send {companyName,email}
// recive joinCode
exports.createCompanyUrl = "/api/comapny/createcompany";

// send {employees[email0,email1,email2,...],task{title,description,priority}}
// recive {task}
exports.createTaskUrl = "/api/company/addtasks";

// send {joincode,email}
// recvice {company}
exports.getCompanyUrl = "/api/company/getcompany";
