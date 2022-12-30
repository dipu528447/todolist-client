import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoadingContext, UserContext, } from '../../App';
import Main from '../../components/Main/Main';


const PrivateRoute = ({children}) => {
    const [user,setUser] = useContext(UserContext) 
    const [loading,setLoading]=useContext(LoadingContext);
    const location=useLocation();
    //console.log(user)
    if(loading){
        return(
            <div className="flex justify-center items-center mt-24">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    if(user && user?.email){
        // console.log(user)
        return <Main/>
    }
    return <Navigate to='/login' state={{from:location}}replace></Navigate>
    
};

export default PrivateRoute;