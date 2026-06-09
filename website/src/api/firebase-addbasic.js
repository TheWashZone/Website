import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore";
import { db } from "./firebaseconfig";
import { auth } from '../api/firebaseconfig';
import { signInWithEmailAndPassword } from "firebase/auth";

// /**
//  * Creates or gets user document in Firestore
//  * @param {string} uid - The user ID from Firebase Auth
//  * @param {Object} userInfo - User info from Firebase Auth
//  * @returns {Promise<Object>} User data
//  */
async function createOrGetUser(uid, userInfo = {}) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            // Create new user document
            const userData = {
                uid: uid,
                email: userInfo.email || '',
                displayName: userInfo.displayName || '',
                membershipType: 'Basic',
                memberSince: new Date().toISOString().split('T')[0],
                totalWashes: 0,
                basicWashes: 0,
                deluxeWashes: 0,
                ultimateWashes: 0,
                washesPerFree: 10,
                createdAt: new Date()
            };

            await setDoc(docRef, userData);
            return userData;
        }
    } catch (error) {
        console.error("❌ Error creating/getting user:", error);
        throw error;
    }
}

async function getBasicWashes(id) {
    try {       
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().basicWashes || 0;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("❌ Error reading document:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        throw error;
    }
}

async function getDeluxeWashes(id) {
    try {       
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().deluxeWashes || 0;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("❌ Error reading document:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        throw error;
    }
}

async function getUltimateWashes(id) {
    try {       
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data().ultimateWashes || 0;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("❌ Error reading document:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        throw error;
    }
}

async function addWashes(id, washType, count) {
    if (!auth.currentUser) {
        await signInWithEmailAndPassword(auth, 'test@gmail.com', '123456');
    }
    try {
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, {
            [washType]: increment(count)
        });
    } catch (error) {
        console.error("❌ Error updating document:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        throw error;
    }
}

async function removeWash(id, washType) {
    if (!auth.currentUser) {
        await signInWithEmailAndPassword(auth, 'test@gmail.com', '123456');
    }
    try {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const currentCount = docSnap.data()[washType] || 0;
            if (currentCount <= 0) {
                // DETERMINE WHAT TO DO IF TRYING TO REMOVE A WASH WHEN COUNT IS ZERO
                return;
            }
        }
        await updateDoc(docRef, {
            [washType]: increment(-1)
        });
    } catch (error) {
        console.error("❌ Error updating document:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        throw error;
    }
}

export { getBasicWashes, getDeluxeWashes, getUltimateWashes, addWashes, removeWash, createOrGetUser };
