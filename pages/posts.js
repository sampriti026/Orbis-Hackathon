import React, { useState, useEffect } from "react";
import Postcard from "../components/postcard";
/** Import Orbis SDK */
import { Orbis } from "@orbisclub/orbis-sdk";
import ReplyCard from "../components/replycard";
import UpvoteButton from "../components/upvotebutton";
/**
 * Initialize the Orbis class object:
 * You can make this object available on other components
 * by passing it as a prop or by using a context.
 */
let orbis = new Orbis();

export default function App() {
  /** The user object */
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [reply, setReplies] = useState([]);

  function getPublicKeyFromDid(did) {
    // Find a DID resolver that supports the Ethereum PKH DID method

    // Get the length of the input string
    const inputStringLength = did.length;

    // Calculate the start index for the slice by subtracting 42 from the length of the input string
    const startIndex = inputStringLength - 42;

    // Slice the last 42 characters from the input string
    const last42Characters = did.slice(startIndex);

    return last42Characters; // logs "0123456789abcdefghijklmnopqrstuvwxyz0123456789"
  }

  useEffect(() => {
    getPosts();
    connect();
  }, []);

  /** Calls the Orbis SDK and handle the results */
  async function connect() {
    let res = await orbis.isConnected();
    if (res.status !== 200) {
      console.log("no active status");
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

  const getPosts = async () => {
    let { data, error } = await orbis.getPosts({
      context: "rooter",
      only_master: true,
    });
    if (!error) {
      setPosts(data);
      await console.log(data);
    } else {
      console.log(error);
    }
  };

  const getReplies = async () => {
    let { data, error } = await orbis.getPosts({
      context: "rooter",
      master: stream_id,
    });
    if (!error) {
      setReplies(data);
      await console.log(filteredArray);
    } else {
      console.log(error);
    }
  };

  return (
    <div className="">
      {posts
        ? posts.map((item, i) => {
            const tagsArray = item.content.tags;
            const pk = getPublicKeyFromDid(item.creator);
            console.log(pk);
            const values = tagsArray.map((obj) => obj.title);
            return (
              <div key={i} value={item}>
                <Postcard
                  title={item.content.title}
                  body={item.content.body}
                  tags={values}
                  did={item.creator}
                  address={pk}
                  time="23423"
                  master={item.stream_id}
                />
              </div>
            );
          })
        : null}{" "}
    </div>
  );
}
