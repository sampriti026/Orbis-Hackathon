import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Product from "../components/product";
import { Orbis } from "@orbisclub/orbis-sdk";
import { Rating } from 'react-simple-star-rating'


let orbis = new Orbis();

export default function Products() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    let { data, error } = await orbis.getPosts({
      context: "rooter.pitches",
      only_master: true,
    });
    if (!error) {
      setPosts(data);
    } else {
      console.log(error);
    }
  };

  return (
    <div>
      {posts
        ? posts.map((item, i) => {
            return (
              <div key={i} value={item}>
                <Product
                  name={item.content.body}
                  tagline={item.content.data.tagline}
                  streamId={item.stream_id}
                  asset={item.content.data.video}
                  likes={item.count_likes}
                />
              </div>
            );
          })
        : null}


    </div>
  );
}
