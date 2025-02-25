import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import FlagMarquee from '@/components/FlagMarquee'
import { Flag } from 'lucide-react'

import { Button } from '@/components/ui/button'

const Login = () => {

    const [currentState, setCurrentState] = useState('Login')
    const { token, setToken, navigate, backendUrl } = useContext(AppContext);

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')


    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (currentState === "Sign Up") {
                const response = await axios.post(backendUrl + "/api/user/register", { name, email, password })
                if (response.data.success) {
                    toast.success(response.data.message)
                    setToken(response.data.token)
                    localStorage.setItem("token", response.data.token)
                } else {
                    toast.error(response.data.message)
                }

            } else {
                const response = await axios.post(backendUrl + "/api/user/login", { email, password })

                if (response.data.success) {
                    setToken(response.data.token)
                    localStorage.setItem("token", response.data.token)
                } else {
                    toast.error(response.data.message)
                }

            }

        } catch (error) {
            console.log('Error:', error);

            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        }

    }

    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])

    return (
        <>

            <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-5 gap-4'>
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <p className=' text-3xl'>{currentState}</p>
                </div>
                <FlagMarquee />
                {currentState === "Login" ? "" : <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" className='w-full px-3 py-2 border border-gray-800 rounded-sm dark:bg-[#060e22]' required />}
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" className='w-full px-3 py-2 border border-gray-800 rounded-sm dark:bg-[#060e22]' required />
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" className='w-full px-3 py-2 border border-gray-800 rounded-sm dark:bg-[#060e22]' required />
                <div className='w-full flex justify-between text-sm mt-[-8px]'>
                    {/* <p className='cursor-pointer active:underline'>Forgot Password?</p> */}
                    {
                        currentState === "Login" ?
                            <p onClick={() => setCurrentState("Sign Up")} className='cursor-pointer active:underline'>Create Account</p> : <p onClick={() => setCurrentState("Login")} className='cursor-pointer active:underline'>Login here</p>}
                </div>
                <Button className='bg-black text-white dark:bg-white dark:text-black font-light px-8 py-2 mt-4'>{currentState === "Login" ? "Sign In" : "Sign Up"}</Button>
            </form>
        </>

    )
}

export default Login
