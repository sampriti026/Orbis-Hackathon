import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Link from "next/link";
import { Orbis } from "@orbisclub/orbis-sdk";
let orbis = new Orbis();



const Product = ({ name, tagline, streamId, asset, likes }) => {
  const [upvotes, setUpvotes] = useState();

 

  const handleUpvote = async () => {
    await orbis.isConnected();
    

    
  let res = await orbis.react(
    streamId,
    "like"
  );
  console.log(res)
  getUpvotes()

  }

  useEffect(() => {
    getUpvotes()
  
    
  }, [])
  

  const getUpvotes = async () => {
    await orbis.isConnected();
    
      let { data, error } = await orbis.getPost(
        streamId
      );
      if (!error) {
        setUpvotes(data.count_likes);
      } else {
        console.log(error);
      }
    
  
  }
  

  return (
<div style={{ marginTop: '20px', maxWidth: '75%', marginRight: '20px' }} className="flex items-center bg-white rounded-lg shadow-lg p-6 ">
  <div className="w-1/3">
    <Link
      href={`product/[...slug]`}
      as={`/product/${streamId}/${asset}`}
      className="text-2xl font-bold leading-tight mb-2"

    >
      {name}
    </Link>
    <p className="text-gray-600 leading-normal mb-2">{tagline}</p>
  </div>
  <div className="w-2/3 ml-auto flex items-center justify-end">
  <div className="rounded-full bg-white-300 p-2 flex items-center justify-center">
  <p className="text-xl font-bold text-green-500">{upvotes}</p>
</div>

    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full" onClick={handleUpvote}>
      Upvote
    </button>
  </div>
</div>
  );
};

export default Product;
