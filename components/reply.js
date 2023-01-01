import React from "react";
import { useState, useEffect } from "react";
import { Orbis } from "@orbisclub/orbis-sdk";
import ReactDOM from 'react-dom';

let orbis = new Orbis();

const Reply = ({ master, user }) => {
  const [reply, setReply] = useState([]);

  
  async function post() {
    await orbis.isConnected();
    console.log(reply, master)
    let res = await orbis.createPost({
      body: reply,
      master: master,
      context: "rooter",
    });
    
    console.log("res", res);
    if (res.status == 200){
      document.getElementById("reply").value = "";
      return (
        <h1></h1>
      )
    }
  }



  return (
    <div>
      <form>
        <label className="block font-bold mb-2 text-gray-700">
          Reply:
        </label>
        <textarea
          id="reply"
          className="w-full h-32 p-2 rounded-md focus:outline-none focus:shadow-outline-blue-500"
          placeholder="Enter your reply here"
          onChange={(event) => setReply(event.target.value)}
        ></textarea>
        <button
          type="button"
          className="mt-4 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue-500"
          onClick={() => post()}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Reply;
