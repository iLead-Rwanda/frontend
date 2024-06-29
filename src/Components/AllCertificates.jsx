import React from 'react';
import certificate from "../Assets/certificate.png"
import { Link } from 'react-router-dom';

const AllCertificates=()=>{
    return(
        <div className='flex flex-col w-full justify-start items-center gap-3'>
            <div className='flex w-full justify-center items-start gap-3'>
               <Link to="/one"><img src={certificate} alt="" width={350}/></Link>
               <Link to="/one"><img src={certificate} alt="" width={350}/></Link>
               <Link to="/one"><img src={certificate} alt="" width={350}/></Link>
            </div>
        </div>
    )
}

export default AllCertificates;