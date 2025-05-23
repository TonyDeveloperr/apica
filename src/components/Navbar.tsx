import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import { PiUserCircleLight } from "react-icons/pi";
import firebase from "firebase/compat/app";
import PostUploadDialogue from "./UploadPostDialogue";

interface NavbarProps {
  user: firebase.User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/sign-in");
    }
  };

  const [showUploadDialogue, setShowUploadDialogue] = useState(false);

  const handleCloseAndSubmit = () => {
    setShowUploadDialogue(false);
    navigate("/");
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
            <Link to="/about">Ce este APICA</Link>
          </li>
          <li>
            <Link to="/posts">Postări</Link>
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
            <button onClick={() => navigate("/sign-in")} className="signin-btn">
              Conectează-te
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
