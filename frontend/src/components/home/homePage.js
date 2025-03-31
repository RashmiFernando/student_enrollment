import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-gray-100 text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-10">
        Welcome to StudySphere
      </h1>

      <div className="flex gap-6">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-blue-500 text-white rounded-md font-semibold text-lg border-2 border-blue-500 hover:bg-blue-600 transition-all"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="px-6 py-3 bg-transparent text-blue-500 border-2 border-blue-500 rounded-md font-semibold text-lg hover:bg-blue-50 transition-all"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
