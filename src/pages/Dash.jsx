import React, {useState} from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Category from '../Components/Categories';
import Choose from '../Components/ChooseCate';

const Dashboard=() =>{
  const [showCategoryAndChoose, setShowCategoryAndChoose] = useState(true);

  const handleSearchClick = () => {
    setShowCategoryAndChoose(false);
  };

  return (
    <div className='w-full flex'>
        <Sidebar />
        <div className='flex-grow bg-[#f3f2f1] p-10 flex flex-col gap-8 absolute right-0'>
        <Navbar onSearchClick={handleSearchClick} />
        {showCategoryAndChoose && (
          <>
            <Category />
            <Choose />
          </>
        )}     
        </div>
    </div>
  );
}

export default Dashboard;