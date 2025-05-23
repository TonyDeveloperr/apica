import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./configs/firebase";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { About } from "./components/About";
import Profile from "./components/Profile";
import SignIn from "./components/SignIn";
import FilterForm from "./components/FilterForm";
import UploadPostDialogue from "./components/UploadPostDialogue";

import { Link, useLocation, Navigate } from "react-router-dom";

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

export const postsCollectionRef = collection(db, "posts");

const App = () => {
  const [postList, setPostList] = useState<PostData[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [isUploadDialogueVisible, setIsUploadDialogueVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        const posts: PostData[] = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PostData[];
        setPostList(posts);
        setFilteredPosts(posts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filterPosts = () => {
      const result = postList.filter((post) => {
        const matchesCounty = selectedCounty
          ? post.county === selectedCounty
          : true;
        const matchesCity = selectedCity ? post.city === selectedCity : true;
        return matchesCounty && matchesCity;
      });
      setFilteredPosts(result);
    };

    filterPosts();
  }, [selectedCounty, selectedCity, postList]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundColor: location.pathname === "/" ? "#3452d9" : "transparent",
      }}
    >
      <Navbar user={user} />
      {isUploadDialogueVisible && (
        <UploadPostDialogue
          onClose={() => setIsUploadDialogueVisible(false)}
          toggleUploadDialogue={() =>
            setIsUploadDialogueVisible(!isUploadDialogueVisible)
          }
          refreshPostList={() => setPostList([...postList])}
        />
      )}
      <div className="content">
        {loading ? (
          <div style={{ color: "white" }}>Loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route
              path="/posts"
              element={
                <>
                  <FilterForm
                    setSelectedCounty={setSelectedCounty}
                    setSelectedCity={setSelectedCity}
                  />
                  <Home postList={filteredPosts} />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={user ? <Profile /> : <SignIn />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        )}
      </div>
      <div className="footer">
        <Link className="logoFooter" to="/">
          APICA
        </Link>
        <Link className="linkFooter" to="/posts">
          Postări
        </Link>
        <Link className="linkFooter" to="/about">
          Ce este APICA
        </Link>
      </div>
    </div>
  );
};

export default App;
