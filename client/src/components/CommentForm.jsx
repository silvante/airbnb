import React from "react";

const CommentForm = () => {
  return (
    <div className="w-full bg-white p-5 rounded-2xl space-y-3">
      <h1 className="text-xl font-semibold">Rate & comment</h1>
      <form className="w-full flex space-x-3">
        <input
          type="text"
          className="flex-1 placeholder:text-basedark border-2 border-basedark px-3 rounded-lg"
          placeholder="Your opinions"
        />
        <button className="bg-base text-white py-2 px-10 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
