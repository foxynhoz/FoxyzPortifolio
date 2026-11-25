import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";
import { adminAuthConfig } from "./admin-config.js";

const configured = Object.values(adminAuthConfig.firebase).every(Boolean)
  && adminAuthConfig.allowedUid
  && !adminAuthConfig.allowedUid.includes("YOUR_FIREBASE_UID");

let currentUser = null;
let state = configured ? "loading" : "setup";
let auth = null;
const emit = () => window.dispatchEvent(new CustomEvent("portfolio-auth-change", {
  detail: { state, user: currentUser }
}));

if (configured) {
  try {
    auth = getAuth(initializeApp(adminAuthConfig.firebase));
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        currentUser = null;
        state = "signed-out";
      } else if (user.uid === adminAuthConfig.allowedUid) {
        currentUser = user;
        state = "authorised";
      } else {
        await signOut(auth);
        currentUser = null;
        state = "denied";
      }
      emit();
    });
  } catch (error) {
    state = "error";
    console.error("Admin authentication could not start.", error);
  }
}

window.portfolioAuth = {
  getState: () => ({ state, user: currentUser }),
  async signIn() {
    if (!configured) return { ok: false, reason: "setup" };
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      return { ok: true };
    } catch (error) {
      console.error("Google sign-in failed.", error);
      return { ok: false, reason: error.code || "unknown" };
    }
  },
  async signOut() {
    if (auth) await signOut(auth);
  }
};
window.dispatchEvent(new Event("portfolio-auth-ready"));
