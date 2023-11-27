import admin from "firebase-admin";

const serviceAccountConfig:admin.ServiceAccount = {
  projectId: process.env["FIREBASE_SA_PROJECTID"],
  privateKey: process.env["FIREBASE_SA_PRIVATE_KEY"],
  clientEmail: process.env["FIREBASE_SA_CLIENT_EMAIL"],
}

const app = admin.apps.length < 1 ? admin.initializeApp({
  credential: admin.credential.cert(serviceAccountConfig),
}) : admin.app();
export const adminDb = admin.firestore(app);
export const adminAuth = admin.auth(app);