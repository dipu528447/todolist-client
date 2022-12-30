import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CompletedTask = () => {
    
    const [user,setUser]=useContext(UserContext);
    const [mytasks,setMyTasks]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        fetch(`http://localhost:5000/mytasks/${user.email}`)
        .then(res=>res.json())
        .then(data=>{
            const filteredData=data.filter(item=>item.status==='0')
            setMyTasks(filteredData);
        })
    },[])

    function incompleteTask(id){
        console.log(id)
        fetch(`http://localhost:5000/IncompleteTask/${id}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json', 
            },   
        })
        .then(res=>res.json())
        .then(data=>{
            mytasks.map(task=>{
                if(task._id===id){
                    task.status='1'
                }
            })
            console.log(mytasks)
            setMyTasks([...mytasks])
            toast('Task is Not Completed')
            navigate('/mytasks')
        });
    }
    function deleteTask(id){
        fetch(`http://localhost:5000/task/${id}`, {
            method: 'DELETE', 
            headers:{
                'content-type': 'application/json', 
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMyTasks(mytasks.filter(pro=>pro._id!==id))
            toast('Deleted Sucessfully')
        })
    }
    return (
        
        <div>
            {mytasks.length>0?<>
            {mytasks.map(task=>{
                return(
                    <div className="flex justify-center py-10" key={task._id}>
                    <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                        <img className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg" src={task.picture} alt="" />
                        <div className="p-6 flex flex-col justify-start">
                            <h5 className="text-gray-900 text-xl font-medium mb-2">{task.name}</h5>
                            <p className="text-gray-700 text-base mb-4">
                                Details: {task.description}
                            </p>
                            <div className='flex'>
                                {task.status==="0" && <button type="button" className="m-2 inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium text-xs leading-tight uppercase
                                    rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 
                                    active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out" onClick={()=>incompleteTask(task._id)}
                                >Not Complete</button>}
                                <button type="button" className="m-2 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase
                                    rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 
                                    active:shadow-lg transition duration-150 ease-in-out" onClick={()=>deleteTask(task._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                )
            })}</>:<>
            <div>
                <p>There is no Completed task</p>
            </div>
            </>}
        </div>
    );
};

export default CompletedTask;