import "/src/styles/home.css";
import NavTabs from "../components/NavTabs.jsx";
import PostCard from "../components/PostCard.jsx";
import getPosts from "../utils/getPosts.js";
import { Link, useOutletContext } from "react-router-dom";
import { supabase } from "../utils/client.js";
import { useContext, useEffect, useState } from "react";

export default function Home() {
 const [postData] = useOutletContext();

  // const posts = getPosts;

  return (
    <div className={"homeDiv"}>
      <NavTabs></NavTabs>
      <div className={"postsDiv"}>
        {postData.length >0 ? postData.map((post) => {
          return (<Link className={"appLink"} to={"/post/" + post.post_id}
                        key={post.post_id}><PostCard
            key={post.post_id}
            upvotes={post.upvotes}
            title={post.heading}
            author={post.poster}
            imgUrl={post.imageUrl}
            commentCount={post.comments}
            creation_time={post.created_at}
          ></PostCard></Link>);
        }):
        <p>Nothing here</p>
        }
      </div>
    </div>
  );
}