import React from "react";

function ProgressBar({ target, current, deadline }) {
  // Calculate the percentage of the target reached
  const percentage = (current / target) * 100;

  return (
    <div className="relative max-w-md h-12 bg-gray-300 rounded-full overflow-hidden border border-red-600">
      <div
        className="absolute inset-0 bg-red-500 rounded-full shadow-md"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="text-center text-gray-700 font-semibold py-2">
        {current}/{target}
      </div>
      <div className="text-gray-700 font-semibold">
        Deadline: {deadline}
      </div>
    </div>
  );
}

export default ProgressBar;
