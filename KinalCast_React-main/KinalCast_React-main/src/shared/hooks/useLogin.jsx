// The imports and using toast for displaying notifications.
import { useState } from "react"
import { loginRequest } from "../../services/api"
import toast from "react-hot-toast"

export const useLogin = () => {
    // State to track if a login request is in progress
    const [isLogin, setIsLogin] = useState(false)

    const login = async (email, password) => {
        setIsLogin(true)
       // Creating a user object with email and password
        const user = {
            email,
            password
        }
        const response = await loginRequest(user)
        setIsLogin(false)
        // Handling errors in the response
        if (response.error) {
            return toast.error(
                response?.err.response?.data?.msg ||
                'Error al iniciar sesion, intenta de nuevo'
            )
        }
        //Showing the response
        console.log(response)
    }
    return {
        // Returning the login function and the isLogin state
        login,
        isLogin
    }
}