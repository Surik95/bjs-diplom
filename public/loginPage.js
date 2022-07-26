'use strict'
const userForm = new UserForm();

userForm.loginFormCallback = data => ApiConnector.login(data, requestServer)
userForm.registerFormCallback = data => ApiConnector.register(data, requestServer)



function requestServer(response) {
    console.log(response)
    if (response.success) {
        location.reload()
    } else {
        userForm.setLoginErrorMessage(response.error)
        userForm.setRegisterErrorMessage(response.error)
    }
    
}
