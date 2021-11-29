import axios from 'axios';
import { useNavigate } from 'react-router';
import React, { useRef } from 'react';
import LOGIN from './../components/assets/man.png';

const Login = () => {
    const navigate = useNavigate();
    const username = useRef(null);
    const password = useRef(null);

    async function onSubmit(e){
        e.preventDefault();
        
        const usernameValue = username.current.value;
        const passwordValue = password.current.value;
        
        try {
        const response = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/auth/signin', {username: usernameValue, password: passwordValue});

        if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            navigate('/')
            }
        } catch(error) {
            const { response } = error;

            let message = '';

            if(response.status=== 401) message = "Revise sus datos";
            else if (response.status === 500) message = "Error de servidor";
            else if (response.status === 404) message = "No se encontro el usuario"

        }
    }

    return(
        <form className= "flex justify-center flex-col bg-gray-900 items-center min-h-screen " onSubmit={onSubmit}>
            <h1 className="text-white text-6xl"> Login </h1>
            <img src={LOGIN} className="w-1/6 m-6"  />
            <div className="flex-col">               
                <label htmlFor="L-user" className="text-white flex justify-center">User</label>
                <input id= "L-user" type="text" ref={username} className="rounded border" />
            </div>
            <div className="">
                <label htmlFor="L-password" className="text-white flex justify-center">Password</label>
                <input id= "L-password" type="password" ref={password} className="rounded border" />
            </div>
            <div className="flex space-y-2">
                <button className="bg-white border rounded-2xl m-3 w-full py-2 px-8 ">Login </button>
            </div>
        </form>
    );

};

export default Login;