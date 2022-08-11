const googleBtn = document.querySelector("#google-register");
const register = document.querySelector("#register");
const signInBtn = document.querySelector("#sign-in");
const signOutBtn = document.querySelector("#sign-out");

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

//Initialize Cloud Firestore and get a reference
const db = firebase.firestore();

/** Authentication related code */

//   const analytics = getAnalytics(app);
const auth = firebase.auth();

const emailIn = document.querySelector("#email-in");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordIn = document.querySelector("#password-in");
const restricted = document.querySelector("#restricted");
const restrictedContent = restricted.querySelector("#content");

googleBtn ? googleBtn.addEventListener("click", googleAuth) : null;
register ? register.addEventListener("click", signup) : null;
signInBtn ? signInBtn.addEventListener("click", signIn) : null;
signOutBtn ? signOutBtn.addEventListener("click", signOut) : null;

/** Functions */
function googleAuth() {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(googleAuthProvider)
    .then(() => window.open("document.URL", "_blank"))
    .catch((err) => console.log(err.message));
  //   googleBtn.removeEventListener("click", googleAuth);
}

//

auth.onAuthStateChanged((user) => {
  let root = "";
  if (user) {
    db.collection("songs")
      .get()
      .then((snapshot) => showContent(snapshot.docs, root));
  } else {
    root += `<h4>You need to register or sign in</h4>`;
    restrictedContent.innerHTML = root;
  }
});

//

function showContent(songsArray, htmlDest) {
  songsArray.forEach((song) => {
    const { title, artist } = song.data();
    htmlDest += `
          <li class="text-center">${title}</li>
          <li class="text-center">${artist}</li>
          `;
  });
  restrictedContent.innerHTML = htmlDest;
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

/**Firestore related code */
//adding to the songs collection

// db.collection("songs")
//   .add({
//     title: "Little Bit Louder",
//     artist: "Mimi Webb",
//   })
//   .then((docRef) => console.log("new Doc", docRef, docRef.id))
//   .catch((err) => console.log(err.message));

//getting/fetching from the firestore
db.collection("songs")
  .get()
  .then((snapshot) => {
    console.log(snapshot.docs[0]);
    snapshot.forEach((doc) => console.log(doc, doc.id));
  });
