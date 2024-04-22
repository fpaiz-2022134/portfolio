export const validatePasswordConfirm = (pass, confirmPass)=>{
    return pass == confirmPass
}

export const passConfirmValidationMessage= 'Las contraseñas no coinciden'