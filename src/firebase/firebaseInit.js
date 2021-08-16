import firebase from "firebase/app"
import "firbase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBen58WAgJcCM9K03mDJgjzJEO9OQOtV5Y",
    authDomain: "invoice-app-872a6.firebaseapp.com",
    projectId: "invoice-app-872a6",
    storageBucket: "invoice-app-872a6.appspot.com",
    messagingSenderId: "837373890680",
    appId: "1:837373890680:web:ee427073ef9ac07a15dd8d"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()