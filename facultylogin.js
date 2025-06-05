document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageEl = document.getElementById("login-message");

  if (username === "admin" && password === "admin123@") {
    messageEl.style.color = "green";
    messageEl.textContent = "Login successful! Redirecting...";
    setTimeout(() => window.location.href = "Faculty.html", 1500);
  } else {
    messageEl.style.color = "red";
    messageEl.textContent = "Invalid username or password.";
  }
});
