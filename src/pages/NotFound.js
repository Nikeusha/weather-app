import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found flex justify-center items-center">
      <div className="px-[10px]">
        <h1 className="text-[#303345] text-[28px] text-center font-bold ">
          Page not found
        </h1>
        <div className="text-center mt-[10px]">
          <Link to="/" className="py-[8px] px-[15px] transition-all text-[#303345] font-semibold hover:bg-[#ffe6c4dd] text-[12px] no-underline rounded bg-[#ffe6c4b0]">Homepage</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
