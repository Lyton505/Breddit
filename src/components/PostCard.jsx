import bitCoinImg from "/public/postDefaultImage.jpg";
import "/src/styles/postCard.css";
import upVoteArrow from "/src/assets/arrow-up.svg";
import comments from "/src/assets/comments.svg";

export default function PostCard() {

  const upvotes = 45;
  const title = "Bitcoin all new high";
  const author = "Satoshi Nakamoto";
  const creation_time = "10:56PM UTC";
  const imgUrl = bitCoinImg;
  const commentCount = 100;

  return (
    <div className={"postCard"}>
      <img src={imgUrl} alt="Bitcoin img" />
      <h4>{title}</h4>
      <p>Created at: {creation_time}</p>
      <p >Created by: <span id={"author"}>{author}</span> </p>
      <div className="postStats">
        <div>
          <img src={upVoteArrow} alt="up votes" id={"upVotesArr"} />
          <p>{upvotes}</p>
        </div>
        <div>
          <img src={comments} alt="comment count" id={"commentImg"} />
          <p>{commentCount}</p>
        </div>
      </div>
    </div>
  );
}

