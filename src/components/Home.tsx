import React, { useEffect, useState } from "react";
import FilterForm from "./FilterForm";
import Post from "./Post";

import { getDocs, collection } from "firebase/firestore";

interface PostData {
  id: string;
  title: string;
  description: string;
  likes: number;
  date: string;
  city: string;
  county: string;
  school: string;
}

interface Props {
  postList: PostData[];
}

const Home = ({ postList }: Props) => {
  return (
    <>
      <FilterForm />
      <div className="post-container">
        {postList.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
            likes={post.likes}
            date={post.date}
            county={post.county}
            city={post.city}
            school={post.school}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
