const googleBtn = document.querySelector("#google-register");

const googleAuth = () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
    .then(() => window.open("document.URL", "_blank"))
    .catch((err) => console.log(err.message));
  //   googleBtn.removeEventListener("click", googleAuth);
};
googleBtn ? googleBtn.addEventListener("click", googleAuth) : null;
