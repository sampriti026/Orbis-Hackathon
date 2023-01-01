import React, { useState, useEffect } from "react";

/** Import Orbis SDK */
import { Orbis } from "@orbisclub/orbis-sdk";
import { arrayify } from "ethers/lib/utils";
/**
 * Initialize the Orbis class object:
 * You can make this object available on other components
 * by passing it as a prop or by using a context.
 */
let orbis = new Orbis();

export default function App() {
  /** The user object */
  const [user, setUser] = useState();
  const [body, setBody] = useState();
  const [title, setTitle] = useState();
  const [tags, setTags] = useState();
  const [values, setValues] = useState([])
  



  /** Calls the Orbis SDK and handle the results */
  async function connect() {
    let res = await orbis.isConnected();
    if (res.status !== 200){
    console.log("no active status")
    let res = await orbis.connect();
    }

    /** Check if connection is successful or not */
    if (res.status == 200) {
      setUser(res.did);
    } else {
      console.log("Error connecting to Ceramic: ", res);
      alert("Error connecting to Ceramic.");
    }
  }

  const convert = () =>  {

    const arrayOfObjects = values.map(item => ({slug: item, title: item}));
    setTags(arrayOfObjects);
    console.log(tags);

}


  async function post() {
    await convert(values);

    let res = await orbis.createPost({
      body: body,
      title: title,
      tags: tags,
      context: "rooter",
    });
    
    console.log("res", res);
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold absolute top-16 left-16">Post your Idea</h1>
      {user ? (
        <p>Connected with: {user}</p>
      ) : (
        <button className="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={() => connect()}>Connect</button>
      )}
      <div className="absolute top-40 left-16">
      <label className="relative top-0">Title</label>
      <input className="relative top-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-20 text-gray-700 leading-tight focus:outline-none focus:bg-white" id="inline-full-name" type="text" onChange={(event) => setTitle(event.target.value)}></input>
      <label className="relative top-6">Body</label>
      <input className="relative top-8 bg-gray-200 border-2 border-gray-200 rounded w-full py-40 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" id="inline-full-name" type="text" onChange={(event) => setBody(event.target.value)}></input>
      <label className="relative top-12">Tags</label>
      <input className="relative top-14 bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white" id="inline-full-name" type="text"  onChange={(event) => setValues(event.target.value.split(/[ ,]+/))}></input>
      <button className="relative top-20 inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={() => post()}>Post Idea</button>
      </div>
      
        <button onClick={convert}>Console</button>
        {/* <button onClick={categories()}>array</button> */}
    </div>
  );
}
