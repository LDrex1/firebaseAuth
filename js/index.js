const googleBtn = document.querySelector("#googleRegister");

const googleAuth = async () => {
  googleBtn ? googleBtn.addEventListener("click", googleAuth) : null;
  const googleAuthProvider = new firebase.auth.googleAuthProvider();
  await firebase
    .auth()
    .signINWithPopup(googleAuthProvider)
    .then(() => window.open());
  googleBtn.removeEventListener("click", googleAuth);
};
