import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import { About } from "./components/About";
import SignIn from "./components/SignIn";
import ContactUs from "./components/ContactUs";
import { auth } from "./configs/firebase";
import Profile from "./components/Profile";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./configs/firebase";
import UploadPostDialogue from "./components/UploadPostDialogue";

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

const postsCollectionRef = collection(db, "posts");

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [postList, setPostList] = useState<PostData[]>([]);
  const [isUploadDialogueVisible, setIsUploadDialogueVisible] = useState(false);

  const getPostList = async () => {
    try {
      const data = await getDocs(postsCollectionRef);
      const filteredData: PostData[] = data.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        likes: doc.data().likes,
        date: doc.data().date,
        city: doc.data().city,
        county: doc.data().county,
        school: doc.data().school,
      }));
      setPostList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  const refreshPostList = () => {
    console.log("posts refrehssed");
    getPostList();
  };

  const toggleUploadDialogue = () => {
    setIsUploadDialogueVisible(!isUploadDialogueVisible);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} />
        {isUploadDialogueVisible && (
          <UploadPostDialogue
            onClose={() => setIsUploadDialogueVisible(false)}
            toggleUploadDialogue={toggleUploadDialogue}
            refreshPostList={() => refreshPostList()}
          />
        )}
        <div className="content">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Switch>
              <Route exact path="/">
                <Home postList={postList} />
              </Route>
              <Route path="/about">
                <About />
              </Route>

              <Route path="/contact">
                <ContactUs />
              </Route>
              <Route path="/profile">
                {user ? <Profile /> : <Redirect to="/sign-in" />}
              </Route>
              <Route exact path="/sign-in">
                <SignIn />
              </Route>
            </Switch>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
export const postsCollection = postsCollectionRef;
