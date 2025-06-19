const auth = firebase.auth();
const allowedEmails = ["rjb131210@gmail.com", "davisjamie805@gmail.com"];

auth.onAuthStateChanged(user => {
  if (user && allowedEmails.includes(user.email)) {
    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("user-email").textContent = user.email;
  } else {
    auth.signOut();
    document.getElementById("auth-section").classList.remove("hidden");
    document.getElementById("dashboard").classList.add("hidden");
  }
});

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .catch(err => document.getElementById("auth-msg").innerText = err.message);
}

function logout() {
  auth.signOut();
}
