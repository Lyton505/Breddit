import "/src/styles/home.css";
import NavTabs from "../components/NavTabs.jsx";
import PostCard from "../components/PostCard.jsx";
import { Link, useOutletContext } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/client.js";

export default function Home() {

  const [postData, setPostData] = useOutletContext();
  const [sortTime, setSortTime] = useState(null);
  const isFirstTimeRender = useRef(true);
  const [sortUpvote, setSortUpvote] = useState(null);
  const isFirstUpvoteRender = useRef(true);
  const [changeSort, setChangeSort] = useState(null);

  useEffect(() => {

    if (isFirstTimeRender.current || sortTime == null) {
      isFirstTimeRender.current = false;
      return;
    }

    console.log("Sorting by time");

    const getSorted = async () => {
      const { data, error } = await
        supabase
          .from("posts")
          .select("*")
          .order("updated_at", { ascending: false });
      setPostData(data);
    };
    getSorted();

  }, [sortTime]);

  useEffect(() => {

    if (isFirstUpvoteRender.current || sortTime == null) {
      isFirstUpvoteRender.current = false;
      return;
    }

    console.log("Sorting by upvotes");

    const getSorted = async () => {
      const { data, error } = await
        supabase
          .from("posts")
          .select("*")
          .order("upvotes", { ascending: false });
      setPostData(data);
    };
    getSorted();

  }, [sortUpvote]);

  const sortCreationTime = async () => {
    setSortTime(!sortTime);
  };


  const sortUpvoteCount = () => {
    setSortUpvote(!sortUpvote);
  };


  return (
    <div className={"homeDiv"}>
      <NavTabs sortCreation={sortCreationTime}
               sortUpvotes={sortUpvoteCount}></NavTabs>
      <div className={"postsDiv"}>
        {postData.length > 0 ? postData.map((post) => {
            // console.log("This post data: ", post);
            return (
              <Link className={"appLink"} to={"/post/" + post.post_id}
                    key={post.post_id}>
                <PostCard
                  key={post.post_id}
                  upvotes={post.upvotes}
                  title={post.heading}
                  author={post.poster}
                  imgUrl={post.imageUrl}
                  commentCount={post.comments}
                  creation_time={post.created_at}>
                </PostCard>
              </Link>);
          }) :
          <p>Nothing here</p>
        }
      </div>
    </div>
  );
}