// Firebase web app configuration. These values are safe to expose in a static site,
// but access is limited by the authorised Google account below.
//
// 1. Create a Firebase web app and copy its firebaseConfig object here.
// 2. Replace allowedEmail with the Google account that may access the admin area.
// 3. Enable Google under Firebase Authentication > Sign-in method.
export const adminAuthConfig = {
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },
  allowedEmail: "YOUR_GOOGLE_EMAIL@example.com"
};
