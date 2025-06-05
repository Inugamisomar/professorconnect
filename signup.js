document.getElementById("signup-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const StudentID = document.getElementById("Student ID").value.trim();
  const name = document.getElementById("Name").value.trim();
  const email = document.getElementById("email").value.trim();
  const department = document.getElementById("Department").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();
  const messageEl = document.getElementById("message");

  if (!username || !email || !password || !confirmPassword || !name || !StudentID || !department) {
    messageEl.style.color = "red";
    messageEl.textContent = "Please fill in all fields.";
    return;
  }

  if (StudentID.length <15){
   messageEl.style.color = "red";
    messageEl.textContent = "Please enter a valid student  ID";
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    messageEl.style.color = "red";
    messageEl.textContent = "Please enter a valid email address.";
    return;
  }

  if (password.length < 6) {
    messageEl.style.color = "red";
    messageEl.textContent = "Password must be at least 6 characters.";
    return;
  }

  if (password !== confirmPassword) {
    messageEl.style.color = "red";
    messageEl.textContent = "Passwords do not match.";
    return;
  }

  messageEl.style.color = "green";
  messageEl.textContent = "Account created successfully! Redirecting...";
  setTimeout(() => window.location.href = "Choice.html", 2000);

});
