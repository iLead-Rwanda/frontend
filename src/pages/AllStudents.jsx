import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import AllStudentsComponent from "../Components/allStudents/AllStudentsComponent";

const AllStudents = () => {
  const [showCategoryAndChoose, setShowCategoryAndChoose] = useState(true);

  const handleSearchClick = () => {
    setShowCategoryAndChoose(false);
  };

  return (
    <main className={`w-[100%] h-[100%] flex flex-col`}>
      <Sidebar />

      <div className="w-[82.5%] bg-[#fff] p-10 flex flex-col gap-8 absolute right-0">
        <Navbar onSearchClick={handleSearchClick} />
        {showCategoryAndChoose && (
          <>
            <AllStudentsComponent />
          </>
        )}
      </div>
    </main>
  );
};

export default AllStudents;
