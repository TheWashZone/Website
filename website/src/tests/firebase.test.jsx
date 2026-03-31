// src/tests/firebase.test.jsx
import { describe, it, expect } from "vitest";
import { db, auth } from "../api/firebaseconfig"; // <-- import auth!
import { collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

describe("Firebase Connection", () => {
  it("should fetch users collection without errors", async () => {
    let error = null;
    let data = [];

    try {
      // Sign in the test user first (only works if emulator is running)
      await signInWithEmailAndPassword(auth, "test@gmail.com", "123456");

      // Then fetch data
      const snapshot = await getDocs(collection(db, "users"));
      data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      error = err;
    }

    expect(error).toBeNull();
    console.log("Fetched users:", data);
  });
});