import React from "react";

const SearchComponents = ({ model }) => {
  return (
    <div className="bg-white fixed top-0 left-0 w-full h-screen z-50">
      <header className="w-full bg-white py-5 px-5 flex justify-between items-center fixed top-0">
        <button
          className="flex items-center text-xl"
          onClick={() => model(false)}
        >
          <i className="bx bx-chevron-left text-3xl"></i>exit
        </button>
      </header>
    </div>
  );
};

export default SearchComponents;
