import React from 'react';
import gif from "../Assets/not_available.gif"

const Gif=()=>{
    return(
        <div className='flex flex-col items-center justify-center p-24 bg-white'>
            <img src={gif} alt="" width={450}/>
        </div>
    )
}

export default Gif