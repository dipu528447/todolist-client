import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App'

const AddTask = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user,setUser]=useContext(UserContext)
    const imageHostKey=process.env.REACT_APP_imgbb_key;
    const navigate=useNavigate()

    const handleAddProduct=data=>{
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
                    status:"1",
                    picture: imgData.data.url,
                    email:user.email
                }
                console.log(task)
                fetch('https://todolist-server-side.vercel.app/addTask', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                    },
                    body: JSON.stringify(task)
                })
                .then(res => res.json())
                .then(result =>{
                    // console.log(result);
                    toast("Product Added successfully");
                    
                })
            }
        })
    }

    return (
        <div>
            <section className="h-screen">
                <div className="container px-6 py-12 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                            <form onSubmit={handleSubmit(handleAddProduct)}>
                                <div className="mb-6">
                                    <label
                                    className="form-control block w-full text-center px-4 py-2 text-4xl font-normal text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    >
                                        Add Task
                                    </label>
                                </div>    
                                <div className="mb-6">
                                    <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Task Name"
                                    {...register("name", {
                                        required: "Task Name is Required"
                                    })}
                                    />
                                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
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
                                
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    
                                >
                                    Submit
                                </button>
                              
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddTask;