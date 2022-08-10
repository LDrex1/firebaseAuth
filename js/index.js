const googleBtn = document.querySelector("#google-register");
const register = document.querySelector("#register");

//firebase initialsizatiokn and key

const firebaseConfig = {
  apiKey: "AIzaSyAP6lcvFpfpKeJa5AsIlyliWK0sLPP7dIM",
  authDomain: "pilot-a0c07.firebaseapp.com",
  projectId: "pilot-a0c07",
  storageBucket: "pilot-a0c07.appspot.com",
  messagingSenderId: "1095737579167",
  appId: "1:1095737579167:web:4dbdde6015b126475cf4aa",
  measurementId: "G-LSJ27QS9VJ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
const auth = firebase.auth();
const googleAuth = () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(googleAuthProvider)
    .then(() => window.open("document.URL", "_blank"))
    .catch((err) => console.log(err.message));
  //   googleBtn.removeEventListener("click", googleAuth);
};
googleBtn ? googleBtn.addEventListener("click", googleAuth) : null;
const email = document.querySelector("#email").value;
const password = document.querySelector("#password").value;
console.log(email, "em");
const signup = (ev) => {
  console.log(password);
  console.log(email, 1);
  ev.preventDefault();
  console.log("clicked");
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      console.log(userCredential, user);
    })
    .catch((err) => console.log(err.code, err.message));
};

register ? register.addEventListener("click", signup) : null;
