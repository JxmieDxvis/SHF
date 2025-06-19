const auth = firebase.auth();
const allowedEmails = ["rjb131210@gmail.com", "davisjamie805@gmail.com"];

auth.onAuthStateChanged(user => {
  if (user && allowedEmails.includes(user.email)) {
    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    document.getElementById("user-email").textContent = user.email;
    loadAnnouncements();
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

function loadAnnouncements() {
  const list = document.getElementById("announcementList");
  const stored = JSON.parse(localStorage.getItem("announcements") || "[]");
  list.innerHTML = "";
  stored.forEach((msg, index) => {
    const li = document.createElement("li");
    li.innerHTML = msg + ' <button onclick="deleteAnnouncement(' + index + ')">❌</button>';
    list.appendChild(li);
  });
}

function addAnnouncement() {
  const input = document.getElementById("newAnnouncement");
  const value = input.value.trim();
  if (!value) return;
  const stored = JSON.parse(localStorage.getItem("announcements") || "[]");
  stored.push(value);
  localStorage.setItem("announcements", JSON.stringify(stored));
  input.value = "";
  loadAnnouncements();
}

function deleteAnnouncement(index) {
  const stored = JSON.parse(localStorage.getItem("announcements") || "[]");
  stored.splice(index, 1);
  localStorage.setItem("announcements", JSON.stringify(stored));
  loadAnnouncements();
}
