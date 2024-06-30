import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import AddNewStudentForm from "../Components/addNewStudent/AddNewStudentForm";

const AddNewStudent = () => {
  const [showCategoryAndChoose, setShowCategoryAndChoose] = useState(true);

  const handleSearchClick = () => {
    setShowCategoryAndChoose(false);
  };

  return (
    <main className={`w-[100%] flex`}>
      <Sidebar />

      <div className="w-[82.5%] bg-[#fff] p-10 flex flex-col gap-8 absolute right-0">
        <Navbar onSearchClick={handleSearchClick} />
        {showCategoryAndChoose && (
          <>
            <AddNewStudentForm />
          </>
        )}
      </div>
    </main>
  );
};

export default AddNewStudent;
