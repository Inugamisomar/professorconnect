const facultyMap = {
CAH: ["Dr. Eleanor Castillo", "Dr. Marcus Villanueva", "Dr. Aileen Santos", "Dr. Jonathan Ramos", "Dr. Beatrice Lim"],
COA: ["Dr. Rafael Dela Cruz", "Dr. Liza Montano", "Dr. Paolo Enriquez", "Dr. Kristine Navarro", "Dr. Miguel Bautista"],
CBA: ["Dr. Steven Tan", "Dr. Camille Yu", "Dr. Arnold Reyes", "Dr. Monica Javier", "Dr. Dennis Chua"],
CCIT: ["Ivan Maurat", "Leonila Valdez", "Donna Lyn Lopez", "Aileen Gail R. Lumabas-Angeles", "Emeliza Yabut", "Ryan Richard Guadana", "Eliseo Ramirez"],
CEAS: ["Dr. Francis Lopez", "Dr. Regina Aquino", "Dr. Victor Manalo", "Dr. Janine Torres", "Dr. Edgar Cruz"],
COE: ["Dr. Melinda Soriano", "Dr. Joshua Ferrer", "Dr. Clarisse Uy", "Dr. Benedict Ramos", "Dr. April Gomez"],
CTHM: ["Dr. Michelle Arrieta", "Dr. Raymond Dizon", "Dr. Trisha Loyola", "Dr. Alvin Gutierrez", "Dr. Jeanette Evangelista"]
};

const departmentSelect = document.getElementById("department");
const facultySelect = document.getElementById("faculty");
const nextStep1Btn = document.getElementById("next-step-1");

departmentSelect.addEventListener("change", function () {
  facultySelect.innerHTML = '<option value="">Select faculty</option>';
  if (this.value && facultyMap[this.value]) {
    facultySelect.disabled = false;
    facultyMap[this.value].forEach((faculty) => {
      const opt = document.createElement("option");
      opt.value = faculty;
      opt.textContent = faculty;
      facultySelect.appendChild(opt);
    });
  } else {
    facultySelect.disabled = true;
  }
  nextStep1Btn.disabled = true;
});

facultySelect.addEventListener("change", function () {
  nextStep1Btn.disabled = this.value === "";
});

nextStep1Btn.addEventListener("click", () => {
  if (!departmentSelect.value) {
    alert("Please select a department.");
    return;
  }
  if (!facultySelect.value) {
    alert("Please select a faculty member.");
    return;
  }
  goToStep(2);
});

document.getElementById("next-step-2").addEventListener("click", function () {
  const date = document.getElementById("appointment-date").value;
  if (!date) {
    alert("Please select a date.");
    return;
  }
  goToStep(3);
});

document.getElementById("next-step-3").addEventListener("click", function () {
  const time = document.getElementById("appointment-time").value;
  if (!time) {
    alert("Please select a time slot.");
    return;
  }
  goToStep(4);
});

function goToStep(stepNumber) {
  document.querySelectorAll(".step-content").forEach((step) => step.classList.remove("active"));
  document.querySelector(`#step-${stepNumber}`).classList.add("active");

  document.querySelectorAll(".step-circle").forEach((el, idx) => {
    el.classList.toggle("active", idx + 1 === stepNumber);
  });
}

function submitMeeting() {
  const topic = document.getElementById("meeting-topic").value.trim();
  const desc = document.getElementById("meeting-description").value.trim();

  if (!topic || !desc) {
    alert("Please fill in all meeting details.");
    return;
  }

  alert(`Meeting submitted:\nTopic: ${topic}\nDescription: ${desc}`);

  // Reset form fields
  departmentSelect.value = "";
  facultySelect.innerHTML = '<option value="">Select department first</option>';
  facultySelect.disabled = true;
  document.getElementById("appointment-date").value = "";
  document.getElementById("appointment-time").value = "";
  document.getElementById("meeting-topic").value = "";
  document.getElementById("meeting-description").value = "";
  nextStep1Btn.disabled = true;

  goToStep(1);
}

flatpickr("#appointment-date", {
  minDate: "today",
  dateFormat: "Y-m-d",
  disable: [
    function (date) {
      return date.getDay() === 0 || date.getDay() === 6;
    },
  ],
});

// Profile dropdown functionality
const profileIcon = document.getElementById("profileIcon");
const dropdownMenu = document.getElementById("dropdownMenu");

profileIcon.addEventListener("click", () => {
  dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", function (e) {
  if (!profileIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = "none";
  }
});

function logout() {
  alert("Logging out...");
  window.location.href = "index.html"; // Update this as needed
}
