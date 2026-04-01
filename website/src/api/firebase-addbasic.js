import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, where, runTransaction, increment } from "firebase/firestore";
import { db } from "./firebaseconfig";
import { auth } from '../api/firebaseconfig';
import { signInWithEmailAndPassword } from "firebase/auth";

// /**
//  * Upserts a member document, only writing Excel-sourced fields.
//  * If the document already exists, notes and email are preserved.
//  * @param {string} id - The user ID
//  * @param {string} name - User's name
//  * @param {string} car - Car information
//  * @param {'active'|'inactive'|'payment_needed'} status - Member status
//  * @returns {Promise<{id: string, existed: boolean}>}
//  */
// async function upsertMember(id, name, car, status, basicWashes=0, deluxeWashes=0, ultimateWashes=0) {
//     if (!auth.currentUser) {
//         await signInWithEmailAndPassword(auth, 'test@gmail.com', '123456');
//     }
//     console.log(auth.currentUser);

//     try {
//         const docRef = doc(db, "users", id);

//         const existed = await runTransaction(db, async (transaction) => {
//             const docSnap = await transaction.get(docRef);
//             if (docSnap.exists()) {
//                 transaction.update(docRef, { basicWashes, deluxeWashes, ultimateWashes });
//                 return true;
//             }
//             transaction.set(docRef, { name, car, status, basicWashes, deluxeWashes, ultimateWashes, notes: '', email: '' });
//             return false;
//         });

//         return { id, existed };
//     } catch (error) {
//         console.error("Error upserting document:", error);
//         throw error;
//     }
// }

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

export { getBasicWashes, getDeluxeWashes, getUltimateWashes, addWashes, removeWash };