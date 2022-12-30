import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingContext, UserContext } from '../../App';
import { app } from '../../firebase';


const Navbar = () => {
    const auth=getAuth(app);
    const navigate=useNavigate();
    const [user,setUser]=useContext(UserContext);
    const [loading,setLoading]=useContext(LoadingContext);
    useEffect(()=>{
        const unsub=onAuthStateChanged(auth,currentUser=>{
            setLoading(true);
            // console.log(currentUser)
            // if(currentUser){
            //     try{
            //         fetch(`https://used-books-resale-server-dipu528447.vercel.app/user/${currentUser.email}`)
            //         .then(res=>res.json())
            //         .then(data=>{
            //             console.log(data)
            //             setUser({...currentUser,type:data.type,name:data.name,verified:data.verified,photo:data.photo})
                        
            //         })
            //     }
            //     catch(err){
            //         console.log(err)
            //     }
                
            // }
            // else{
                setUser({...currentUser});   
            // }
            
            setLoading(false);

        });
        return ()=>unsub();
    },[])
    const logout=()=>{
        signOut(auth).then(()=>{
            setUser({});
            toast('log out successfully');
            navigate('/login',{replace:true})
            setLoading(false)
            navigate(0)
            
        }).catch((err)=>{
            console.error(err)
        });
    }
    return (
        <div>
            <nav className="relative bg-white shadow dark:bg-blue-500 ">
                <div className="container px-6 py-4 mx-auto">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="flex items-center justify-between">
                            <div className="text-xl font-semibold text-gray-700">
                                <a className="text-2xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300" href="#">TodoList</a>
                            </div>

                            
                            <div className="flex lg:hidden">
                                <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                                    <svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                    </svg>
                            
                                    <svg x-show="isOpen" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        
                        <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                                <Link to="/" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Add Task</Link>
                                <Link to="/mytasks" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">My Tasks</Link>
                                <Link to="/completedTask" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Completed Task</Link>
                                {user?.email? <button className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={logout}>Logout</button>:<Link to='/login' className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Login</Link>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;