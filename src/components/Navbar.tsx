import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { Link, useNavigate } from "react-router-dom";  // useNavigate instead of useHistory
import { PiUserCircleLight } from "react-icons/pi";
import firebase from "firebase/compat/app";
import PostUploadDialogue from "./UploadPostDialogue";

interface NavbarProps {
  user: firebase.User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate(); // useNavigate hook instead of useHistory

  const handleUserClick = () => {
    if (user) {
      // Redirect to profile page if user is logged in
      navigate("/profile"); // Use navigate instead of history.push
    } else {
      // Redirect to sign-in page if user is not logged in
      navigate("/sign-in"); // Use navigate instead of history.push
    }
  };

  const [showUploadDialogue, setShowUploadDialogue] = useState(false);

  const handleCloseAndSubmit = () => {
    setShowUploadDialogue(false);
    navigate("/"); // Use navigate instead of history.push
  };

  return (
    <>
      {showUploadDialogue && (
        <PostUploadDialogue
          onClose={() => setShowUploadDialogue(false)}
          refreshPostList={handleCloseAndSubmit}
          toggleUploadDialogue={() =>
            setShowUploadDialogue(!showUploadDialogue)
          }
        />
      )}

      <div className="navbar">
        <Link className="logo" to="/">
          APICA
        </Link>
        <ul className="links">
          <li>
            <Link to="/">Postări</Link>
          </li>
          <li>
            <Link to="/about">Ce este Apica?</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="user-btns">
          {user ? (
            <>
              <PrimaryButton onClick={() => setShowUploadDialogue(true)}>
                Postează
              </PrimaryButton>
              <PiUserCircleLight
                onClick={handleUserClick}
                color="#324387"
                className="account-btn"
              />
            </>
          ) : (
            <button
              onClick={() => navigate("/sign-in")} // Use navigate instead of history.push
              className="signin-btn"
            >
              Conectează-te
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
