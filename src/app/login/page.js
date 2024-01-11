'use client'

import {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUserContext } from "@/app/contexts/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {

    const { user, setUser } = useUserContext();

    const router = useRouter();
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const notify = (message) => {
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      };

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = {
            username: username,
            password: password
        }

        axios.post('/api/users/login', postData).then(({data}) => {
            const loggedInUser = {
                username: data.username,
                user_id: data.user_id,
                image_url: data.image_url
            }
            setUser(loggedInUser)
            router.push('/')
        }).catch(({ response: { data } }) => {
            notify(data)
          });  
        setUsername('')
        setPassword('')
    }
    
    return (
        <section className='min-h-screen flex justify-evenly flex-col items-center'>
            <h1 className="pt-3 pb-2 font-extrabold text-3xl text-DeepPurple mb-3">Welcome to Gymie</h1>
            <form className='text-DeepPurple flex flex-col justify-center items-center border p-4 rounded-2xl' onSubmit={handleSubmit}>
                <label htmlFor="username" className='text-DeepPurple'>Username:</label>
                <input type="text" value={username} name="username" id="username" className='text-black-200 mt-5 mb-5 p-2' onChange={handleUsername} placeholder='Username...' required/>
                <label htmlFor="password" className='text-DeepPurple'>Password:</label>
                <input type="password" value={password} name="password" id="password" className='text-black-200 mt-5 mb-5 p-2' onChange={handlePassword} placeholder='Password...' required/>
                <button>Login</button>
            </form>
            <Link href={'/signup'}>
                <h2 className="pt-3 pb-2 font-extrabold text-2xl text-DeepPurple mb-3">Sign Up</h2>
            </Link>
            <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
        </section>
    )
}