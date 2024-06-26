import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { Link, useHistory } from "react-router-dom";
import { PiUserCircleLight } from "react-icons/pi";
import firebase from "firebase/compat/app";
import PostUploadDialogue from "./UploadPostDialogue";

interface NavbarProps {
  user: firebase.User;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const history = useHistory();

  const handleUserClick = () => {
    if (user) {
      // Redirect to profile page if user is logged in
      history.push("/profile");
    } else {
      // Redirect to sign-in page if user is not logged in
      history.push("/sign-in");
    }
  };

  const [showUploadDialogue, setShowUploadDialogue] = useState(false);

  const handleCloseAndSubmit = () => {
    setShowUploadDialogue(false);
    history.push("/");
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
              onClick={() => history.push("/sign-in")}
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
