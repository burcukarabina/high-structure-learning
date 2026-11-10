/* =========================================
   INTERACTIVE LEARNING TOOLS
   Firebase + Live Word Clouds
   ========================================= */

import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk-6hSgkGVldmNP_5N6cfJhteEcAz0nxI",
  authDomain: "high-structure-learning.firebaseapp.com",
  projectId: "high-structure-learning",
  storageBucket: "high-structure-learning.firebasestorage.app",
  messagingSenderId: "630714949012",
  appId: "1:630714949012:web:ed9875fb6109ab77f6c381"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const responsesCollection = collection(db, "wordCloudResponses");

let currentUser = null;
let responses = [];
let unsubscribeResponses = null;


// =========================================
// AUTHENTICATION
// =========================================

onAuthStateChanged(auth, async (user) => {

  if (user) {
    currentUser = user;
    startListening();
    initializeWordClouds();
    return;
  }

  currentUser = null;

  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("Firebase authentication error:", error);
    showCloudError("Unable to connect. Please refresh the page.");
  }

});


// =========================================
// REAL-TIME DATABASE LISTENER
// =========================================

function startListening() {

  if (unsubscribeResponses) return;

  unsubscribeResponses = onSnapshot(
    responsesCollection,

    (snapshot) => {

      responses = snapshot.docs.map(document => ({
        id: document.id,
        ...document.data()
      }));

      renderWordClouds();
      updateSubmissionStates();

    },

    (error) => {
      console.error("Firestore error:", error);
      showCloudError("Unable to load live responses.");
    }
  );

}


// =========================================
// INITIALIZE WORD CLOUD INTERFACE
// =========================================

function initializeWordClouds() {

  const containers = document.querySelectorAll(".word-cloud-activity");

  containers.forEach(container => {

    const question = container.dataset.question;
    const form = container.querySelector(".word-cloud-form");
    const input = container.querySelector(".word-cloud-input");
    const status = container.querySelector(".word-cloud-status");

    if (!form || !input || form.dataset.initialized) return;

    form.dataset.initialized = "true";

    form.addEventListener("submit", async (event) => {

      event.preventDefault();

      if (!currentUser) {
        status.textContent = "Connecting. Please try again shortly.";
        return;
      }

      const answer = input.value.trim().replace(/\s+/g, " ");

      if (!answer || answer.length > 60) {
        status.textContent = "Enter a response of 1–60 characters.";
        return;
      }

      const responseId = `${currentUser.uid}_${question}`;

      const submitButton = form.querySelector("button");
      submitButton.disabled = true;

      status.textContent = "Submitting...";

      try {

        await setDoc(
          doc(db, "wordCloudResponses", responseId),
          {
            question,
            text: answer,
            userId: currentUser.uid,
            createdAt: serverTimestamp()
          }
        );

        status.textContent = "Thank you! Your response has been added.";
        input.value = "";

      } catch (error) {

        console.error("Submission error:", error);

        status.textContent =
          "Unable to submit. You may already have responded.";

        submitButton.disabled = false;
      }

    });

  });

  renderWordClouds();
  updateSubmissionStates();
}


// =========================================
// DISPLAY WORD CLOUDS
// =========================================

function renderWordClouds() {

  document.querySelectorAll(".word-cloud-activity").forEach(container => {

    const question = container.dataset.question;
    const cloud = container.querySelector(".word-cloud-display");
    const count = container.querySelector(".word-cloud-count");

    if (!cloud) return;

    const questionResponses = responses.filter(
      response => response.question === question
    );

    const frequencies = new Map();

    questionResponses.forEach(response => {

      const word = response.text.trim().replace(/\s+/g, " ");
      const key = word.toLocaleLowerCase("en");

      if (!key) return;

      if (frequencies.has(key)) {
        frequencies.get(key).count++;
      } else {
        frequencies.set(key, {
          text: word,
          count: 1
        });
      }

    });

    const words = [...frequencies.values()].sort(
      (a, b) => b.count - a.count || a.text.localeCompare(b.text)
    );

    cloud.replaceChildren();

    if (words.length === 0) {

      const empty = document.createElement("p");
      empty.className = "word-cloud-empty";
      empty.textContent = "Responses will appear here.";
      cloud.appendChild(empty);

    } else {

      const maximum = Math.max(...words.map(word => word.count));

      words.forEach(word => {

        const span = document.createElement("span");

        span.className = "word-cloud-word";

        // Relative font size: 1 to 2.4 rem
        const size = 1 + (word.count / maximum) * 1.4;

        span.style.fontSize = `${size}rem`;
        span.textContent = word.text;
        span.title = `${word.count} response(s)`;

        cloud.appendChild(span);

      });

    }

    if (count) {
      count.textContent =
        `${questionResponses.length} response(s)`;
    }

  });

}


// =========================================
// PREVENT DUPLICATE SUBMISSIONS
// =========================================

function updateSubmissionStates() {

  if (!currentUser) return;

  document.querySelectorAll(".word-cloud-activity").forEach(container => {

    const question = container.dataset.question;

    const hasSubmitted = responses.some(response =>
      response.id === `${currentUser.uid}_${question}`
    );

    const input = container.querySelector(".word-cloud-input");
    const button = container.querySelector(".word-cloud-form button");
    const status = container.querySelector(".word-cloud-status");

    if (!input || !button) return;

    input.disabled = hasSubmitted;
    button.disabled = hasSubmitted;

    if (hasSubmitted && status) {
      status.textContent = "Your response has been recorded.";
    }

  });

}


// =========================================
// ERROR DISPLAY
// =========================================

function showCloudError(message) {

  document.querySelectorAll(".word-cloud-status").forEach(element => {
    element.textContent = message;
  });

}


// Allow app.js to initialize Page 1 when revisited
window.initializeWordClouds = initializeWordClouds;
