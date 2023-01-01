import { useState } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Link from "next/link";

const Product = ({ name, tagline, streamId, video }) => {

  return (
<div style={{ marginTop: '20px', maxWidth: '75%', marginRight: '20px' }} className="flex items-center bg-white rounded-lg shadow-lg p-6 ">
  <div className="w-1/3">
    <Link
      href={`product/[...slug]`}
      as={`/product/${streamId}/${video}`}
      className="text-2xl font-bold leading-tight mb-2"
    >
      {name}
    </Link>
    <p className="text-gray-600 leading-normal mb-2">{tagline}</p>
  </div>
  <div className="w-2/3 ml-auto flex items-center justify-end">
    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full">
      Upvote
    </button>
  </div>
</div>
  );
};

export default Product;
