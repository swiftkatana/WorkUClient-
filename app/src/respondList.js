const responedList = {
<<<<<<< HEAD
    DBError: 'DBError',
    InfoUnvalid:'InfoUnvalid',
    route:'koral | Michael you send me bad request!',
    FaildSave:'FaildSave',
    loginFaildAlreadyConnect:'loginFaildAlreadyConnect',
    UserIsAlreadyCreated:"UserIsAlreadyCreated",
    UserNotCreated:"UserNotCreated",
    companyNameExists:"companyNameExists",
    UnvalidPassword:'UnvalidPassword',
    usersNotFound:'usersNotFound',
    good:'good',
    emailNotExistsL:'emailIsFake',
    NotExists:'NotExists',
    isInUse:'isInUse',
=======
    DBError: { err: 'DBError' },
    InfoUnvalid: { err: 'InfoUnvalid' },
    route: { err: 'koral | Michael you send me bad request! ' },
    FaildSave: { err: 'FaildSave' },
    loginFaildAlreadyConnect: { err: 'loginFaildAlreadyConnect' },
    //error when someone try to register but using a exists email please try diffrent email
    UserIsAlreadyCreated: { err: "UserIsAlreadyCreated" },
    // error when try to login to user but could not found email is wrong
    UserNotCreated: { err: "UserNotCreated" },
    // when try to create a company and there is already a company with this name
    companyNameExists: { err: "companyNameExists" },
    // error when password is unvalid   
    UnvalidPassword: { err: 'UnvalidPassword' },
    // error when someone try to login but user not exists or wrong info
    usersNotFound: { err: 'usersNotFound' },
    good: { valid: 'good' },
    // error when someone try to use a fake or not exists email 
    emailNotExistsL: { err: 'emailIsFake' },
    // error when the DB cant find something
    NotExists: { err: 'NotExists' },
    isInUse: { err: 'isInUse' },
>>>>>>> a3b849f4c801acb9841653b41e448e0a7d7109a8
}

exports.responedList = responedList