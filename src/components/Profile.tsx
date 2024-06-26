import React from "react";
import { auth } from "../configs/firebase";

const Profile = () => {
  return (
    <>
      <h1>{auth.currentUser?.displayName}</h1>
      <h2>{auth.currentUser?.email}</h2>
    </>
  );
};

export default Profile;
