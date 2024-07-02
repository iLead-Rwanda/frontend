import React from "react";

const AdminDashboard = () => {
  const stats = [
    { title: "Provinces", count: 5 },
    { title: "Students", count: 1500 },
    { title: "Schools", count: 50 },
    { title: "Certificates Generated", count: 300 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-primary text-white text-left rounded-2xl p-6 "
          >
            <p className="text-4xl font-bold  mt-2">{stat.count}</p>
            <h2 className="text-base text-gray-300 font-semibold text-gray-700">
              {stat.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
