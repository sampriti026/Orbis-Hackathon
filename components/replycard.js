import React from "react";
import { useState } from "react";
import Reply from "./reply";

const ReplyCard = ({ body, timestamp, author, likes = 0 }) => {
  const [votes, setVotes] = useState(likes);

  const handleLike = () => {
    setVotes(votes + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <ul className="flex flex-col">
        <li className="text-gray-700 font-semibold leading-tight mb-2">
          {body}
        </li>
        <div className="flex justify-between mt-4 mb-2">
          <div className="text-gray-500 text-sm font-medium leading-tight">
            {timestamp}
          </div>
          <button
            onClick={handleLike}
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded-full relative left-80"
          >
            <svg
              className="h-4 w-4  fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 3.22l-.61-.6a5.5 5.5 0 00-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 00-7.78-7.77l-.61.61z" />
            </svg>
          </button>
          <div className="relative right-16 text-gray-700 font-semibold text-sm ml-4">
            {votes}
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="text-gray-700 font-semibold text-sm">{author}</div>
        </div>
      </ul>
    </div>
  );
};

export default ReplyCard;
