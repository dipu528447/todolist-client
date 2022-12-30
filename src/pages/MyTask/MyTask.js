import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const MyTask = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [user,setUser]=useContext(UserContext);
    const [mytasks,setMyTasks]=useState([]);
    const [modalState,setModalState]=useState("hidden")
    const [ld,setId]=useState('')
    const imageHostKey=process.env.REACT_APP_imgbb_key;
    const navigate=useNavigate();
    useEffect(()=>{
        fetch(`http://localhost:5000/mytasks/${user.email}`)
        .then(res=>res.json())
        .then(data=>setMyTasks(data))
    },[])
    
    function completeTask(id){
        console.log(id)
        fetch(`http://localhost:5000/task/${id}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json', 
            },   
        })
        .then(res=>res.json())
        .then(data=>{
            mytasks.map(task=>{
                if(task._id===id){
                    task.status='0'
                }
            })
            console.log(mytasks)
            setMyTasks([...mytasks])
            toast('Task is Completed')
            navigate('/completedTask')
        });
    }
    const editTask=data=>{
        // event.preventDefault()
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);
                const task = {
                    name: data.name, 
                    description:data.description,
                    status:'1',
                    picture: imgData.data.url,
                    email:user.email
                }
                console.log(task,ld)
                fetch(`http://localhost:5000/EditTask/${ld}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json', 
                    },
                    body: JSON.stringify(task)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                    toast("Product Added successfully");
                    
                })
            }
        })
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
                                {
                                    task.status=='1'?<>
                                        <p className="text-gray-700 text-base mb-4">
                                            Incomplete
                                        </p>
                                    </>:
                                    <>
                                        <p className="text-gray-700 text-base mb-4">
                                            completed
                                        </p>
                                    </>
                                }
                                <div className='flex'>
                                    <button type="button"
                                        className="m-2 inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase
                                        rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 
                                        active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                        data-bs-toggle="modal" data-bs-target="#exampleModalScrollable" onClick={()=>{setModalState("show");setId(task._id);}} >
                                        Edit
                                        </button>           
                                        {console.log(task._id)}                    
                                        <div className={`modal fade fixed top-0 left-0 ${modalState} w-full h-full outline-none overflow-x-hidden overflow-y-auto`}
                                        id="exampleModalScrollable" tabIndex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
                                            <div
                                            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                                   <form onSubmit={handleSubmit(editTask)}>
                                                    <div className="mb-6">
                                                        <input
                                                        type="text"
                                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Task Name"
                                                        {...register("name", {
                                                            required: "Task Name is Required"
                                                        })}
                                                        />
                                                    </div>
                                                    
                                                    <div className="mb-6">
                                                        <input
                                                        type="text"
                                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Description"
                                                        {...register("description", {
                                                            required: "Description is Required"
                                                        })}
                                                        />
                                                    </div>
                                                    <div className="mb-6">
                                                        <input
                                                        type="file"
                                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                                        placeholder="Choose File"    
                                                        {...register("image", {
                                                            required: "Image is Required"
                                                        })}                
                                                        />
                                                    </div>
                                                <div
                                                    className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                                                    <button type="button"
                                                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                                                    data-bs-dismiss="modal" onClick={()=>setModalState("hidden")}>
                                                    Close
                                                    </button>
                                                    <button type="Submit"
                                                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">
                                                    
                                                    Save changes
                                                    </button>
                                                    
                                                </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    {task.status==="1" && <button type="button" className="m-2 inline-block px-6 py-2.5 bg-yellow-600 text-white font-medium text-xs leading-tight uppercase
                                     rounded shadow-md hover:bg-yellow-700 hover:shadow-lg focus:bg-yellow-700 focus:shadow-lg focus:outline-none focus:ring-0 
                                     active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out" onClick={()=>completeTask(task._id)}
                                    >Complete</button>}
                                    <button type="button" className="m-2 inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase
                                     rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 
                                     active:shadow-lg transition duration-150 ease-in-out" onClick={()=>deleteTask(task._id)}>Delete</button>
                                </div>
                                
                        </div>
                    </div>
                </div>
            )})}
        </div>
    );
};

export default MyTask;