import React from "react";
import { useState, useEffect } from "react";
import Reply from "./reply";
import { Orbis } from "@orbisclub/orbis-sdk";
import ReplyCard from "./replycard";
import UpvoteButton from "./upvotebutton";
import { Krebit } from "@krebitdao/reputation-passport/dist/core/Krebit";
import Krebiter from "../pages/krebit";
let orbis = new Orbis();

const Postcard = ({ body, title, tags, time, did, user, master, address }) => {
  const [html, setHtml] = useState(false);
  const [reply, setReplies] = useState([]);

  const renderReply = () => {
    setHtml(!html);
  };

  const showReplies = async () => {
    let { data, error } = await orbis.getPosts({
      context: "rooter",
      master: master,
    });
    if (!error) {
      setReplies(data);
      console.log(data);
    } else {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <div className=" w-full lg:max-w-full lg:flex">
        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"></div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-2/3">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{body}</p>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-900 leading-none">{did}</p>
              <p className="text-gray-600">{time}</p>

              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {tags.map((title, i) => {
                  return (
                    <p
                      key={i}
                      style={{ display: "inline-block", padding: "2px" }}
                    >
                      {title}
                    </p>
                  );
                })}
              </div>
            </div>
            <button
              className="relative left-36 inline-block  bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={showReplies}
            >
              Show Replies
            </button>

            <button
              className="absolute left-2/3 inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              onClick={renderReply}
            >
              Reply
            </button>
          </div>
          {html === true ? <Reply master={master} user={user} /> : null}
          {reply
            ? reply.map((item, i) => {
                return (
                  <div key={i} value={item}>
                    <ReplyCard
                      body={item.content.body}
                      author={item.creator}
                      timestamp={item.timestamp}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Postcard;
