import React from "react";
import empty from "../assets/page-is-empty.svg";

const PageIsEmpty = ({ text }) => {
  return (
    <div className="mx-auto flex justify-center items-center flex-col">
      <img src={empty} alt="svg icon" width={"350px"} />
      <h3 className="text-gray-600 text-2xl font-semibold">{text}</h3>
    </div>
  );
};

export default PageIsEmpty;
