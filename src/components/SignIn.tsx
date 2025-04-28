import { useState } from "react";
import { auth, googleProvider } from "../configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate correctly

  const handleSignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Use navigate inside the function to redirect
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleSignInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    navigate("/"); // Use navigate inside the function to redirect
  };

  return (
    <>
      <div className="login-form-container">
        <div className="login-form">
          <h1>Conectează-te</h1>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="email-field"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="password-field"
            type="password"
            placeholder="Parola"
          />

          <button className="login-btn" onClick={handleSignIn}>
            Conectează-te
          </button>
          <h3>sau</h3>
          <button
            style={{
              display: "flex",
              alignItems: "center", // Align items vertically in the center
              justifyContent: "center", // Center content horizontally
              textAlign: "center",
            }}
            className="google-login-btn"
            onClick={handleSignInWithGoogle}
          >
            <FcGoogle size={30} style={{ marginRight: "auto" }} />{" "}
            <span style={{ flex: 1 }}>Conectează-te cu Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
