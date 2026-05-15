import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, where, runTransaction } from "firebase/firestore";
import { db } from "./firebaseconfig";

async function createMember(id, name, car, status, notes, email = '') {
  const userId = id;
  try {
    const userData = {
      name: name,
      car: car,
      status: status,
      notes: notes,
      email: email
    };
    await setDoc(doc(db, "users", userId), userData);
    return userId;
  } catch (error) {
    console.error("❌ Error creating document:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    throw error;
  }
}

async function upsertMember(id, name, car, status) {
  try {
    const docRef = doc(db, "users", id);

    const existed = await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(docRef);
      if (docSnap.exists()) {
        transaction.update(docRef, { name, car, status });
        return true;
      }
      transaction.set(docRef, { name, car, status, notes: '', email: '' });
      return false;
    });

    return { id, existed };
  } catch (error) {
    console.error("Error upserting document:", error);
    throw error;
  }
}

async function getMember(id) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("❌ Error reading document:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    throw error;
  }
}

async function getAllMembers() {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const members = [];
    querySnapshot.forEach((doc) => {
      members.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return members;
  } catch (error) {
    console.error("❌ Error reading all documents:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    throw error;
  }
}

async function getMembersByStatus(status) {
  try {
    const q = query(collection(db, "users"), where("status", "==", status));
    const querySnapshot = await getDocs(q);
    const members = [];
    querySnapshot.forEach((doc) => {
      members.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return members;
  } catch (error) {
    console.error("❌ Error querying documents:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    throw error;
  }
}

/**
 * Find a member document by license plate (normalized).
 * Returns the first matching member or null.
 */
async function findMemberByLicense(licensePlate) {
  try {
    if (!licensePlate) return null;
    const normalized = licensePlate.trim().toUpperCase().replace(/\s+/g, "");
    const q = query(collection(db, "users"), where("car", "==", normalized));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("❌ Error finding member by license:", error);
    throw error;
  }
}

/**
 * Find a member by loyalty number or license plate (normalized).
 * Returns the first matching member or null.
 */
async function findMemberByLoyaltyOrLicense(value) {
  try {
    if (!value) return null;
    const normalized = value.trim().toUpperCase().replace(/\s+/g, "");

    // First try loyaltyNumber field
    let q = query(collection(db, "users"), where("loyaltyNumber", "==", normalized));
    let snap = await getDocs(q);
    if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };

    // Fallback to car field (license plate)
    q = query(collection(db, "users"), where("car", "==", normalized));
    snap = await getDocs(q);
    if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };

    return null;
  } catch (error) {
    console.error("❌ Error finding member by loyalty or license:", error);
    throw error;
  }
}

async function updateMember(id, updates) {
  try {
    const docRef = doc(db, "users", id);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`User with ID ${id} does not exist`);
    }

    await updateDoc(docRef, updates);
    return id;
  } catch (error) {
    console.error("❌ Error updating document:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    throw error;
  }
}

async function deleteMember(id) {
  try {
    const docRef = doc(db, "users", id);

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`User with ID ${id} does not exist`);
    }

    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.error("❌ Error deleting document:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    throw error;
  }
}

export {
  createMember,
  upsertMember,
  getMember,
  getAllMembers,
  getMembersByStatus,
  findMemberByLicense,
  findMemberByLoyaltyOrLicense,
  updateMember,
  deleteMember
};
