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
  updateMember,
  deleteMember
};
