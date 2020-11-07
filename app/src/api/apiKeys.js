//user api


//send {email, password} 
//recive {userData}
exports.userLoginUrl = "/api/user/login"; 

// send {email,password,firstName,lastName} 
//recive {userData}
exports.userRegisterUrl = "/api/user/register";

//send {code}
//revice {userData}
exports.userJoinCompany = "/api/user/joincompany";


//send {_id,text}
//recive none
exports.usercompleteTask = "/api/user/completetask";


// send {_id,email}
// recive {task}
exports.userGetTask = "/api/user/gettask";



// send {type,body,fullName,email}
// recive {_id}
exports.userSendPersonalRequest = "/api/user/personalreuqest";




//boss api


// send {mangar{email,joinCode} ,email}
// recive none
exports.userLeaveUrl = "/api/company/leave";


// send {companyName,email}
// recive joinCode
exports.createCompanyUrl = "/api/comapny/createcompany";


// send {employees[email0,email1,email2,...],task{title,description,priority}}
// recive none
exports.createTaskUrl = "/api/company/addtasks";

