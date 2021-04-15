import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLu9oHyAIPGZ8hXDJodoj1D6ZZBbtjGMM",
  authDomain: "report-discrimination.firebaseapp.com",
  databaseURL: "https://report-discrimination-default-rtdb.firebaseio.com",
  projectId: "report-discrimination",
  storageBucket: "report-discrimination.appspot.com",
  messagingSenderId: "824587608163",
  appId: "1:824587608163:web:c53512e3385c83bbe21856",
  measurementId: "G-VY10JRXH4K",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
