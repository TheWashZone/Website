import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebaseconfig.js";

const googleProvider = new GoogleAuthProvider();

function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider).then((result) => {
    // Optional: Check email domain for restriction
    if (!result.user.email.endsWith('@alloweddomain.com')) {
      // Sign out and throw error
      auth.signOut();
      throw new Error('Access restricted to specific domains.');
    }
    return result.user;
  });
}

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate('/');
    });
    return unsubscribe;
  }, [navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
      // Show error to user
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}

export default LoginPage;