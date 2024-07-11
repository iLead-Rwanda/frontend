import React from "react";
import images from "../../utils/images";
import Certificate from "../../components/certificates/Certificate";
import { useUser } from "../../contexts/UserContext";
import Button from "../../components/core/Button";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const chapters = ["ICHOOSE", "ILEAD", "IDO"];
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className="h-full ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {chapters.map((chapter, i) => {
          return (
            <div className="flex flex-col items-center space-y-3" key={i}>
              <p className="font-bold">{chapter}</p>
              <Certificate
                date={new Date().getDay().toString()}
                name={user?.name}
                type={chapter}
              />
            </div>
          );
        })}
      </div>
      <p className="mt-20 mb-5 px-10 text-primary font-semibold">
        All Categories
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-20 px-[3%]">
        {chapters.map((chapter, i) => {
          return (
            <div
              className="flex flex-col items-center space-y-3 bg-white rounded-2xl py-10"
              key={i}
            >
              <img src={images.bronze} alt="Bronze Medal" className="w-10" />
              <p>{chapter}</p>
              <div className="text-xs flex flex-col gap-2 items-center ">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/students?chapter=" + chapter)}
                >
                  View Students
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => navigate("/certificates?chapter=" + chapter)}
                >
                  View Certificates
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;
