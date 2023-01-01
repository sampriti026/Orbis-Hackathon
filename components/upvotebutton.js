import React, { useState } from 'react';

const UpvoteButton = () => {
  const [count, setCount] = useState(0);

  const handleUpvote = () => {
    setCount(count + 1);
  };

  return (
    <button
      className={`text-blue-600 hover:text-blue-800`}
      onClick={handleUpvote}
    >
      <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 14h5m10 0h5m-16 5v9a2 2 0 002 2h10a2 2 0 002-2v-9M7 21h4" />
      </svg>
    </button>
  );
};

export default UpvoteButton;

