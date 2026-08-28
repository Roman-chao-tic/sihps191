// ============================================================
// EDIT THIS FILE to change the prototype's sample content.
// Later, this can be replaced with API/database data without
// changing the visual components.
// ============================================================

export const appData = {
  brand: {
    name: "Smaran Caregiver",
    tagline: "Memory & cognitive care",
  },

  patient: {
    name: "Mrs. Anita",
    firstName: "Anita",
    role: "Patient",
  },

  caregiver: {
    name: "Sarah",
    relation: "Daughter & caregiver",
    note: "Sarah left a new message: “I'll call you after lunch.”",
  },

  games: [
    {
      title: "Remember & Match",
      description: "Match familiar objects and faces",
      duration: "5 min",
      level: "Gentle",
      tone: "lavender",
      icon: "brain",
    },
    {
      title: "Picture Pairs",
      description: "Find the two pictures that belong together",
      duration: "7 min",
      level: "Easy",
      tone: "peach",
      icon: "sparkles",
    },
    {
      title: "Word Recall",
      description: "Recall simple words from earlier",
      duration: "5 min",
      level: "Gentle",
      tone: "mint",
      icon: "brain",
    },
  ],

  reminders: [
    { title: "Morning medicine", time: "8:30 AM", done: true },
    { title: "Breakfast", time: "9:00 AM", done: true },
    { title: "Call Sarah", time: "12:30 PM", done: false },
    { title: "Afternoon walk", time: "4:00 PM", done: false },
    { title: "Evening medicine", time: "8:30 PM", done: false },
  ],

  memories: [
    { title: "Family picnic", date: "May 2026", tone: "blue" },
    { title: "Garden afternoon", date: "April 2026", tone: "green" },
    { title: "Birthday dinner", date: "March 2026", tone: "rose" },
  ],
};
