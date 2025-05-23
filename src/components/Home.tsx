import Post from "./Post";

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
    <div className="post-container">
      {postList.length > 0 ? (
        postList.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            description={post.description}
            likes={post.likes}
            date={post.date}
            city={post.city}
            school={post.school}
          />
        ))
      ) : (
        <p style={{ color: "white" }}>
          Nu exista nicio postare din acest oras...
        </p>
      )}
    </div>
  );
};

export default Home;
