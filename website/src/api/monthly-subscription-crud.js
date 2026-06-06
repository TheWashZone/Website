import { createUserWithEmailAndPassword, signInAnonymously, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebaseconfig';

const authEmail = import.meta.env.VITE_MONTHLY_SUBSCRIPTION_AUTH_EMAIL || import.meta.env.VITE_FIREBASE_AUTH_EMAIL;
const authPassword = import.meta.env.VITE_MONTHLY_SUBSCRIPTION_AUTH_PASSWORD || import.meta.env.VITE_FIREBASE_AUTH_PASSWORD;

const PLAN_TO_PREFIX = {
  basic: 'B',
  deluxe: 'D',
  ultimate: 'U'
};

function normalizePlan(plan) {
  const value = String(plan || '').trim().toLowerCase();
  return PLAN_TO_PREFIX[value] ? value : 'deluxe';
}

async function ensureAuthenticated() {
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      if (authEmail && authPassword) {
        try {
          await signInWithEmailAndPassword(auth, authEmail, authPassword);
          return;
        } catch (credentialError) {
          if (credentialError?.code === 'auth/user-not-found' || credentialError?.code === 'auth/invalid-credential') {
            await createUserWithEmailAndPassword(auth, authEmail, authPassword);
            return;
          }

          throw credentialError;
        }
      }

      if (error?.code === 'auth/admin-restricted-operation') {
        throw new Error('Anonymous sign-in is disabled for this Firebase project. Enable Anonymous authentication in Firebase Auth or provide VITE_MONTHLY_SUBSCRIPTION_AUTH_EMAIL and VITE_MONTHLY_SUBSCRIPTION_AUTH_PASSWORD.');
      }

      throw error;
    }
  }
}

function generateId(prefix) {
  const suffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `${prefix}${suffix}`;
}

async function allocateMemberId(prefix) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const candidateId = generateId(prefix);
    const existing = await getDoc(doc(db, 'users', candidateId));
    if (!existing.exists()) {
      return candidateId;
    }
  }

  throw new Error('Unable to create a unique subscription ID. Please try again.');
}

async function createSubscriptionLead(submission) {
  if (!submission?.name?.trim()) {
    throw new Error('Name is required.');
  }

  await ensureAuthenticated();

  const plan = normalizePlan(submission.plan);
  const tier = PLAN_TO_PREFIX[plan];
  const memberId = await allocateMemberId(tier);

  await setDoc(doc(db, 'users', memberId), {
    name: submission.name.trim(),
    car: submission.car || '',
    status: 'payment_needed',
    notes: '',
    email: submission.email?.trim() || '',
    tier,
    plan,
    phone: submission.phone?.trim() || '',
    address: submission.address || '',
    contactPerson: submission.contactPerson?.trim() || '',
    vehicleYear: submission.vehicleYear?.trim() || '',
    vehicleMake: submission.vehicleMake?.trim() || '',
    vehicleModel: submission.vehicleModel?.trim() || '',
    vehicleColor: submission.vehicleColor?.trim() || '',
    authorized: Boolean(submission.authorized),
    submittedAt: submission.submittedAt || new Date().toISOString(),
    paymentStatus: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  return memberId;
}

export { createSubscriptionLead };