import { useState } from "react";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

interface Props {
  id: string;
  title: string;
  description: string;
  likes: number;
  date: string;
  city: string;
  school: string;
}

const Post = ({ id, title, description, likes, date, city, school }: Props) => {
  const [liked, setLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = async () => {
    const newLiked = !liked;
    const newLikes = newLiked ? currentLikes + 1 : currentLikes - 1;

    try {
      const postDocRef = doc(db, "posts", id);
      await updateDoc(postDocRef, {
        likes: newLikes,
      });

      setLiked(newLiked);
      setCurrentLikes(newLikes);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="post">
      <p className="post-date">Postat pe {date}</p>
      <h1>{title}</h1>
      <div className="tag-container">
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
