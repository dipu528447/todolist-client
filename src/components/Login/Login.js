import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../../firebase.js';
import { LoadingContext, UserContext } from '../../App.js'

import { toast } from 'react-hot-toast';
const Login = () => {
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [user,setUser]=useContext(UserContext);
const [loading,setLoading]=useContext(LoadingContext);
const location=useLocation();
const from=location.state?.from?.pathname||'/';
const [msg,setMsg]=useState('');
const navigate=useNavigate();

useEffect(()=>{
    // console.log(user)
    if(user && user?.email)
        navigate('/')
},[user])
function validation(){
    if(!email){
        setMsg("please enter your email");
        return ''
    }
    if(!password)
    {
        setMsg("please enter your password");
        return ''
    }
    return true
}
function emailLogin(event){
    event.preventDefault();
    // console.log(email,password)
    if(!validation()){
        return '';
    }
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
         const newuser = userCredential.user;
        // console.log(newuser)
        // fetch(`https://used-books-resale-server-dipu528447.vercel.app/user/${newuser.email}`)
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log(data)
        //     setUser({...newuser,type:data.type,name:data.name,photo:data.photo,verified:data.verified})
            
        // })
        setUser({...newuser})
        navigate('/')
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setMsg(errorMessage)
        toast(errorMessage)
    });

}
    return (
        <div>
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div
                    className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                    >
                    <div
                        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                    >
                       <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="w-full"
                        alt="Sample image"
                        />
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form>
                            <div className="mb-6">
                                <input
                                type="text"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput2"
                                placeholder="Email address"
                                onChange={(event)=>setEmail(event.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput2"
                                placeholder="Password"
                                onChange={(event)=>setPassword(event.target.value)}
                                />
                            </div>

                            <div className="text-center">
                                <button
                                type="button"
                                className="inline-block px-10 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={(event)=>emailLogin(event)}
                                >
                                Login
                                </button>
                                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                Don't have an account?
                                <Link to='/register'
                                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                    >Register</Link
                                >
                                </p>
                            </div>
                            
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;