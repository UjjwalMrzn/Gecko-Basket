// src/Layout/AuthLayout/AuthLayout.tsx

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-inter relative overflow-hidden">
      
      {/* --- The New Creative Background --- */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-green-200 to-blue-200 opacity-50 filter blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-purple-200 to-green-100 opacity-60 filter blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;