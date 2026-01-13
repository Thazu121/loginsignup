if (!localStorage.getItem("loggedInUser")) {
  window.location.href = "index.html";
}

const authBtn = document.getElementById("authBtn");
const authBtnMobile = document.getElementById("authBtnMobile");

function setupLogout(button) {
  if (!button) return;

  button.textContent = "Logout";
  button.href = "#";

  button.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}

setupLogout(authBtn);
setupLogout(authBtnMobile);
