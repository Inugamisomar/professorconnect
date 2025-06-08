const dummyRequests = [
      {
        id: 1,
        type: "Face to Face",
        student: "Leovik Ramos",
        topic: "Thesis Guidance – Draft Review",
        time: "May 14, 2025 – 3:00 PM to 4:00 PM",
        status: "Pending"
      }
    ];

    
    // Load meetings from localStorage or use default
    let meetingRequests = JSON.parse(localStorage.getItem("facultyMeetings")) || dummyRequests;

    function saveToStorage() {
      localStorage.setItem("facultyMeetings", JSON.stringify(meetingRequests));
    }

    function showTab(tabId) {
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
      document.getElementById(tabId + 'Tab').classList.add('active');
      document.getElementById(tabId).classList.add('active');
    }

    function renderRequests() {
      const container = document.getElementById("requestsContainer");
      container.innerHTML = "";

      const pending = meetingRequests.filter(m => m.status === "Pending");

      if (pending.length === 0) {
        container.innerHTML = "<p>No pending meeting requests.</p>";
        return;
      }

      pending.forEach((req, index) => {
        const div = document.createElement("div");
        div.className = "meeting-card";
        div.innerHTML = `
          <p><strong>${req.type}</strong> Meeting request with <strong>${req.student}</strong></p>
          <p><em>${req.topic}</em></p>
          <p><strong>${req.time}</strong></p>
          <div class="actions">
            <button class="decline" onclick="updateStatus(${req.id}, 'Declined')">Decline</button>
            <button class="accept" onclick="updateStatus(${req.id}, 'Accepted')">Accept</button>
          </div>
        `;
        container.appendChild(div);
      });
    }

    function renderMeetings() {
      const container = document.getElementById("meetingsContainer");
      container.innerHTML = "";

      const decided = meetingRequests.filter(m => m.status !== "Pending");

      if (decided.length === 0) {
        container.innerHTML = "<p>No accepted or declined meetings.</p>";
        return;
      }

      decided.forEach(req => {
        const div = document.createElement("div");
        div.className = "meeting-card";
        div.innerHTML = `
          <p><strong>${req.type}</strong> Meeting with <strong>${req.student}</strong></p>
          <p><em>${req.topic}</em></p>
          <p><strong>${req.time}</strong></p>
          <p>Status: <span style="color:${req.status === 'Accepted' ? 'green' : 'red'}">${req.status}</span></p>
        `;
        container.appendChild(div);
      });
    }

    function updateStatus(id, newStatus) {
      const index = meetingRequests.findIndex(m => m.id === id);
      if (index !== -1) {
        meetingRequests[index].status = newStatus;
        saveToStorage();
        renderRequests();
        renderMeetings();
      }
    }
  const profileIcon = document.getElementById("profileIcon");
  const dropdownMenu = document.getElementById("dropdownMenu");

  profileIcon.addEventListener("click", () => {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
  });

  // Optional: Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!profileIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.style.display = "none";
    }
  });

  function logout() {
    alert("Logging out...");
    window.location.href = "index.html"; // Redirect to login
  }
    // Initial Render
    renderRequests();
    renderMeetings();

