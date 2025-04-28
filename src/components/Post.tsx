import  { useState } from "react";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

interface Props {
  title: string;
  description: string;
  likes: number;
  date: string;
  county: string;
  city: string;
  school: string;
}

const Post = ({
  title,
  description,
  likes,
  date,
  county,
  city,
  school,
}: Props) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    liked ? setCurrentLikes(likes) : setCurrentLikes(likes + 1);
    setLiked(!liked);
  };

  const [currentLikes, setCurrentLikes] = useState(likes);

  return (
    <div className="post">
      <p className="post-date">Postat pe {date}</p>
      <h1>{title}</h1>
      <div className="tag-container">
        <h3>{county}</h3>
        <h3>{city}</h3>
        <h3>{school}</h3>
      </div>

      <p className="post-description">{description}</p>
      <div className="like-container">
        {liked ? (
          <MdOutlineFavorite
            onClick={handleLike}
            color="#d95a34"
            size="2rem"
            className="like-btn liked"
          />
        ) : (
          <MdFavoriteBorder
            onClick={handleLike}
            color="#d95a34"
            size="2rem"
            className="like-btn"
          />
        )}
        <span className="like-count">{currentLikes}</span>
      </div>
    </div>
  );
};

export default Post;
