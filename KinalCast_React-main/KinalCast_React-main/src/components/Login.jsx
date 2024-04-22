// Importing validation functions and messages from respective validator files
import { validateEmail,emailValidationMessage} from "../shared/validators/input.validator.js"
import { passwordValidationMessage, validatePassword } from "../shared/validators/password.validator.js"
import { Input } from "./Input.jsx"
import { useLogin } from "../shared/hooks/useLogin.jsx"
import { useState } from "react"

export const Login = () => {
  // Destructuring the login function and isLogin state from the useLogin hook
  const { login, isLogin } = useLogin()
// Setting up the initial form data state using useState
  const [formData, setFormData] = useState(
    {
      email: {
        value: '',
        isValid: false,
        showError: false
      },
      password: {
        value: '',
        isValid: false,
        showError: false
      }
    }
  )

  const onValueChange = (value, field) => {
    // Updating the form data state based on the field being updated
    setFormData((prevData) => (
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          value
        }
      }
    ))
  }

   // Handler function for input validation on blur
  const handleValidationOnBlur = (value, field) => {
    let isValid = false
    switch (field) {
      case 'email':
        isValid = validateEmail(value)
        break
      case 'password':
        isValid = validatePassword(value)
        break
      default:
        break
    }
    // Updating form data with validation results
    setFormData((prevData)=>(
      {
        ...prevData,
        [field]: {
          ...prevData[field],
          isValid,
          showError: !isValid
        }
      }
    ))
  }

  const handleLogin = async(e) => {
    e.preventDefault()
    login(
      formData.email.value,
      formData.password.value
    )
  }

  const isSubmitButtonDisable = !formData.email.isValid ||
                                !formData.password.isValid

  return (
    <div className="register-container">
      <form 
        className="auth-form"
        onSubmit={handleLogin}
      >
        <Input
          field='email'
          label='Email'
          type='email'
          value={formData.email.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.email.showError}
          validationMessage={emailValidationMessage}
        />
        
        <Input 
          field='password'
          label='Password'
          type='password'
          value={formData.password.value}
          onChangeHandler={onValueChange}
          onBlurHandler={handleValidationOnBlur}
          showErrorMessage={formData.password.showError}
          validationMessage={passwordValidationMessage}
        />
        <button disabled={isSubmitButtonDisable}>
            Login
        </button>
      </form>
    </div>
  )
}