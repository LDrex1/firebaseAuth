const googleBtn = document.querySelector("#google-register");
const register = document.querySelector("#register");
const signInBtn = document.querySelector("#sign-in");

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

const emailIn = document.querySelector("#email-in");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordIn = document.querySelector("#password-in");
console.log(email, "em");

googleBtn ? googleBtn.addEventListener("click", googleAuth) : null;
register ? register.addEventListener("click", signup) : null;
signInBtn ? signInBtn.addEventListener("click", signIn) : null;

function googleAuth() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(googleAuthProvider)
    .then(() => window.open("document.URL", "_blank"))
    .catch((err) => console.log(err.message));
  //   googleBtn.removeEventListener("click", googleAuth);
}

function signup(ev) {
  console.log(password);
  console.log(email.value, 1);
  ev.preventDefault();
  console.log("clicked");
  auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      let user = userCredential.user;
      console.log(userCredential, user);
    })
    .catch((err) => console.log(err.code, err.message));
}

function signIn(ev) {
  ev.preventDefault();
  console.log("Sign In");
  auth
    .signInWithEmailAndPassword(emailIn.value, passwordIn.value)
    .then((userCredential) => {
      let user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}

function signOut(ev) {
  ev.preventDefault();
  auth.signOut().then((resp) => {
    console.log("out");
    console.log(resp);
  });
}
