const googleBtn = document.querySelector("#google-register");

const googleAuth = async () => {
  const googleAuthProvider = new firebase.auth.googleAuthProvider();
  await firebase
    .auth()
    .signINWithPopup(googleAuthProvider)
    .then(() => window.open());
  //   googleBtn.removeEventListener("click", googleAuth);
};
googleBtn ? googleBtn.addEventListener("click", googleAuth) : null;
