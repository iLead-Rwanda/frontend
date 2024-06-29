import React from 'react';
import certificate from "../Assets/certificate.png"

const AllCertificates=()=>{
    return(
        <div className='flex flex-col w-full justify-start items-center gap-3'>
            <div className='flex w-full justify-center items-start gap-3'>
                <img src={certificate} alt="" width={350}/>
                <img src={certificate} alt="" width={350}/>
                <img src={certificate} alt="" width={350}/>
            </div>
        </div>
    )
}

export default AllCertificates;