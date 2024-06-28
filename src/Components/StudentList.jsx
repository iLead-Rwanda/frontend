import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import student from "../Assets/student.png"

const StudentList=()=>{
    return(
        <div>
            <div>
                <div className='w-[17.5%] flex flex-col p-3 gap-3 bg-white rounde-md justify-center items-center'>
                    <Icon className='text-yellow-600' style={{fontSize:36}} icon="mingcute:certificate-fill"/>
                    <p className='font-bold text-2xl'>iChoose</p>
                    <img src={student} alt="" />
                    <p className='text-[#363A3D] font-medium'>Ineza Cinta Castella</p>
                    <button className='transition duration-300 ease-in-out text-xs bg-[#e4d7ca] hover:bg-[#CCAD8F] text-[#B58A5F] p-1 px-3 rounded-full'>Generate certificate</button>                
               </div>
            </div>
        </div>
    )
}

export default StudentList;