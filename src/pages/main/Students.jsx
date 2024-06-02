import { useState } from "react";
import images from "../../utils/images";

const Students = () => {
  const dummyStudents = [
    { name: "John Doe", gender: "male", level: "iChoose" },
    { name: "Jane Smith", gender: "female", level: "iLead" },
    { name: "Emily Johnson", gender: "female", level: "iDo" },
    { name: "Michael Brown", gender: "male", level: "iLead" },
    { name: "Jessica Davis", gender: "female", level: "iChoose" },
    { name: "Daniel Wilson", gender: "male", level: "iDo" },
    { name: "Sarah Martinez", gender: "female", level: "iLead" },
    { name: "David Anderson", gender: "male", level: "iChoose" },
    { name: "Laura Taylor", gender: "female", level: "iDo" },
    { name: "James Thomas", gender: "male", level: "iLead" },
    { name: "Sophia Moore", gender: "female", level: "iChoose" },
    { name: "Matthew Jackson", gender: "male", level: "iDo" },
    { name: "Isabella White", gender: "female", level: "iLead" },
    { name: "Ethan Harris", gender: "male", level: "iChoose" },
    { name: "Ava Martin", gender: "female", level: "iDo" },
    { name: "Alexander Thompson", gender: "male", level: "iLead" },
    { name: "Mia Garcia", gender: "female", level: "iChoose" },
    { name: "Benjamin Martinez", gender: "male", level: "iDo" },
    { name: "Charlotte Robinson", gender: "female", level: "iLead" },
    { name: "Oliver Clark", gender: "male", level: "iChoose" },
    { name: "Amelia Rodriguez", gender: "female", level: "iDo" },
    { name: "Liam Lewis", gender: "male", level: "iLead" },
    { name: "Harper Lee", gender: "female", level: "iChoose" },
    { name: "Noah Walker", gender: "male", level: "iDo" },
    { name: "Evelyn Hall", gender: "female", level: "iLead" },
    { name: "William Allen", gender: "male", level: "iChoose" },
    { name: "Abigail Young", gender: "female", level: "iDo" },
    { name: "Henry King", gender: "male", level: "iLead" },
    { name: "Emily Wright", gender: "female", level: "iChoose" },
  ];

  const [students, setStudents] = useState(dummyStudents);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">
          Students
        </h1>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 mb-6 border-2 border-gray  rounded-2xl outline-none text-sm"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredStudents.map((student, index) => (
          <div
            key={index}
            className="bg-white  rounded-2xl p-6 flex flex-col items-center space-y-4"
          >
            <img src={images.bronze} alt="" className="w-10 " />
            <p className="text-2xl text-gray-500">{student.level}</p>
            <img
              src={
                student.gender === "male"
                  ? "/images/male.png"
                  : "/images/female.png"
              }
              alt="Student"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h2 className=" font-semibold text-gray-700">
              {student.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
