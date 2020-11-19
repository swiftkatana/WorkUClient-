const responedList = {
  DBError: "DBError",
  InfoInvalid: "InfoInvalid",
  route: "koral | Michael you send me bad request! ",
  FaildSave: "FaildSave",
  loginFaildAlreadyConnect: "loginFaildAlreadyConnect",
  //error when someone try to register but using a exists email please try diffrent email
  UserIsAlreadyCreated: "UserIsAlreadyCreated",
  // error when try to login to user but could not found email is wrong
  UserNotCreated: "UserNotCreated",
  // when try to create a company and there is already a company with this name
  companyNameExists: "companyNameExists",
  // error when someone try to login but user not exists or wrong info
  usersNotFound: "usersNotFound",
  // error when someone try to use a fake or not exists email
  emailNotExistsL: "emailIsFake",
  // error when the DB cant find something
  NotExists: "NotExists",
  isInUse: "isInUse",
};

exports.responedList = responedList;
