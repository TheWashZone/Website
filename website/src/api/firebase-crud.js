import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, query, where, runTransaction, increment } from "firebase/firestore";
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

async function findMemberByLoyaltyOrLicense(value) {
  try {
    if (!value) return null;
    const normalized = value.trim().toUpperCase().replace(/\s+/g, "");

    let q = query(collection(db, "users"), where("loyaltyNumber", "==", normalized));
    let snap = await getDocs(q);
    if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };

    q = query(collection(db, "users"), where("car", "==", normalized));
    snap = await getDocs(q);
    if (!snap.empty) return { id: snap.docs[0].id, ...snap.docs[0].data() };

    return null;
  } catch (error) {
    console.error("❌ Error finding member by loyalty or license:", error);
    throw error;
  }
}

async function findMemberByRewardsOrLicense(value) {
  return findMemberByLoyaltyOrLicense(value);
}

/**
 * Finds a member by their real email or real phone number stored in Firestore.
 * Searches email field first, then phone field (digits only for consistent matching).
 * @param {string} value - Raw email or phone input from the user
 * @returns {Promise<Object|null>} Member data or null if not found
 */
async function findMemberByEmailOrPhone(value) {
  try {
    if (!value) return null;
    const trimmed = value.trim().toLowerCase();
    const digitsOnly = trimmed.replace(/\D/g, '');

    // 1. Search by email field
    const emailQuery = query(collection(db, "users"), where("email", "==", trimmed));
    const emailSnap = await getDocs(emailQuery);
    if (!emailSnap.empty) {
      const d = emailSnap.docs[0];
      return { id: d.id, ...d.data() };
    }

    // 2. Search by phone field (digits only for consistent matching)
    if (digitsOnly) {
      const phoneQuery = query(collection(db, "users"), where("phone", "==", digitsOnly));
      const phoneSnap = await getDocs(phoneQuery);
      if (!phoneSnap.empty) {
        const d = phoneSnap.docs[0];
        return { id: d.id, ...d.data() };
      }
    }

    return null;
  } catch (error) {
    console.error("❌ Error finding member by email or phone:", error);
    throw error;
  }
}

function getMemberRewardsId(member) {
  if (!member) return '';
  return member.loyaltyNumber || member.car || '';
}

async function updateMemberRewardsData(id, updates) {
  if (!updates || typeof updates !== 'object') {
    return updateMember(id, updates);
  }

  const { rewardsId, ...rest } = updates;
  const normalizedUpdates = { ...rest };

  if (typeof rewardsId !== 'undefined') {
    normalizedUpdates.loyaltyNumber = rewardsId;
  }

  return updateMember(id, normalizedUpdates);
}

async function logWash(id, washType = 'basicWashes') {
  try {
    const docRef = doc(db, 'users', id);
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(docRef);
      if (!snap.exists()) throw new Error(`User ${id} not found`);

      const data = snap.data();
      const totalWashes = (data.totalWashes || 0) + 1;
      let washesUntilFree = typeof data.washesUntilFree === 'number' ? data.washesUntilFree - 1 : (data.washesPerFree || 10) - 1;

      if (washesUntilFree <= 0) {
        washesUntilFree = data.washesPerFree || 10;
      }

      const updates = {
        totalWashes,
        washesUntilFree,
        [washType]: increment(1)
      };

      tx.update(docRef, updates);
    });
    return true;
  } catch (error) {
    console.error('❌ Error logging wash:', error);
    throw error;
  }
}

async function redeemFreeWash(id) {
  try {
    const docRef = doc(db, 'users', id);
    const result = await runTransaction(db, async (tx) => {
      const snap = await tx.get(docRef);
      if (!snap.exists()) throw new Error(`User ${id} not found`);
      const data = snap.data();
      const washesUntilFree = data.washesUntilFree ?? (data.washesPerFree || 10);
      const washesPerFree = data.washesPerFree || 10;

      if (washesUntilFree !== washesPerFree && washesUntilFree !== 0) {
        return { redeemed: false, reason: 'No free wash available' };
      }

      tx.update(docRef, { washesUntilFree: washesPerFree, redeemedFreeCount: increment(1) });
      return { redeemed: true };
    });

    return result;
  } catch (error) {
    console.error('❌ Error redeeming free wash:', error);
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
  findMemberByRewardsOrLicense,
  findMemberByEmailOrPhone,
  getMemberRewardsId,
  logWash,
  redeemFreeWash,
  updateMemberRewardsData,
  updateMember,
  deleteMember
};