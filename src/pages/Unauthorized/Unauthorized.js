import React from 'react';
import unauth from '../../components/assests/401.jpg'
const Unauthorized = () => {
    return (
        <div className='w-1/2 mx-auto'>
            <h1 className='text-7xl text-center'>ERROR::401</h1>
            <img src={unauth} class="max-w-full h-auto" alt="..." />
        </div>
    );
};

export default Unauthorized;