const todayDate = document.getElementById("todayDate");
todayDate.textContent = new Intl.DateTimeFormat("en-IN", {
  weekday: "long", day: "numeric", month: "short", year: "numeric"
}).format(new Date());

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

const modal = document.getElementById("gameModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const activityQuestion = document.getElementById("activityQuestion");
const answerGrid = document.getElementById("answerGrid");
const activityResult = document.getElementById("activityResult");

const activities = {
  faces: {
    title: "Who is in the picture?",
    description: "Choose the face that matches the familiar person.",
    question: "👩",
    answers: ["👨", "👩", "👴"],
    correct: "👩"
  },
  objects: {
    title: "Familiar things",
    description: "Which object did you see earlier?",
    question: "☕",
    answers: ["📷", "☕", "🌸"],
    correct: "☕"
  },
  routine: {
    title: "My daily routine",
    description: "Which activity usually comes first in the morning?",
    question: "🌅",
    answers: ["🚶", "🌅", "🍵"],
    correct: "🌅"
  }
};

document.querySelectorAll("[data-game]").forEach(button => {
  button.addEventListener("click", () => openActivity(button.dataset.game));
});

function openActivity(type) {
  const activity = activities[type];
  modalTitle.textContent = activity.title;
  modalDescription.textContent = activity.description;
  activityQuestion.textContent = activity.question;
  activityResult.textContent = "";
  answerGrid.innerHTML = "";

  activity.answers.forEach(answer => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;
    button.addEventListener("click", () => {
      if (answer === activity.correct) {
        activityResult.textContent = "Well done! That’s right. 🌿";
      } else {
        activityResult.textContent = "That's okay — let's try another one. 💛";
      }
    });
    answerGrid.appendChild(button);
  });

  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

document.getElementById("notificationBtn").addEventListener("click", () => {
  alert("Prototype notification: Today’s memory activity is ready.");
});

document.getElementById("profileBtn").addEventListener("click", () => {
  alert("Prototype profile menu — connect this to authentication later.");
});

document.getElementById("noteBtn").addEventListener("click", () => {
  const note = prompt("Add a short caregiver note for today:");
  if (note && note.trim()) {
    alert("Note saved locally for this prototype.");
  }
});

/*
  EASY FUTURE BACKEND HOOK:
  Replace the mock `activities` object above with data fetched from an API.

  Example later:
  const response = await fetch("/api/activities");
  const activities = await response.json();

  Keep the UI functions the same so the frontend can later be connected
  to Firebase, Supabase, Node/Express, Django, etc. without rebuilding
  the page structure.
*/
