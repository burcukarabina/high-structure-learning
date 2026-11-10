/* =========================================
   Interactive Digital Textbook
   app.js
   ========================================= */

let currentPage = 0;

// DOM elements
const pageContent = document.getElementById("page-content");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const progressTrack = document.querySelector(".progress-track");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Store reflection responses locally
const reflections = {};

// Render current page
function renderPage() {

  const page = pages[currentPage];

  pageContent.className =
    page.type === "zoom" ? "page-zoom" : "page-learn";

  pageContent.innerHTML = `
    <span class="page-label">${page.label}</span>
    <h1>${page.title}</h1>
    ${page.content}
  `;

  // Update progress
  const pageNumber = currentPage + 1;
  const totalPages = pages.length;
  const progress = (pageNumber / totalPages) * 100;

  progressText.textContent =
    `Page ${pageNumber} of ${totalPages}`;

  progressFill.style.width = `${progress}%`;

  progressTrack.setAttribute(
    "aria-valuenow",
    Math.round(progress)
  );

  // Navigation
  prevBtn.disabled = currentPage === 0;

  nextBtn.textContent =
    currentPage === totalPages - 1
      ? "Finish"
      : "Continue →";

  // Initialize page-specific interactions
  if (page.id === 2) {
    initializeDrawing();
  }

  if (page.id === 3) {
    initializeReflection();
  }

  window.scrollTo({ top: 0, behavior: "instant" });
}

// Drawing interaction
function initializeDrawing() {

  const edges = document.querySelectorAll(
    "#drawing-puzzle .graph-edges line"
  );

  edges.forEach(edge => {

    edge.addEventListener("click", () => {
      edge.classList.toggle("selected");
    });

  });
}

// Reflection
function initializeReflection() {

  const textarea = document.getElementById("reflection-1");

  if (!textarea) return;

  textarea.value = reflections[3] || "";

  textarea.addEventListener("input", () => {
    reflections[3] = textarea.value;
  });
}

// Previous page
prevBtn.addEventListener("click", () => {

  if (currentPage > 0) {
    currentPage--;
    renderPage();
  }

});

// Next page
nextBtn.addEventListener("click", () => {

  if (currentPage < pages.length - 1) {
    currentPage++;
    renderPage();
  }

});

// Start textbook
renderPage();
