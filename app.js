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
const flashcard = document.querySelector(".strategy-flashcard");

if (flashcard) {
  flashcard.addEventListener("click", () => {

    const isFlipped = flashcard.classList.toggle("is-flipped");

    flashcard.setAttribute("aria-pressed", String(isFlipped));

    flashcard.setAttribute(
      "aria-label",
      isFlipped
        ? "Return to the reflection question"
        : "Reveal the learning strategy"
    );

  });
};
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
   if (page.id === 1 && window.initializeWordClouds) {
  window.initializeWordClouds();
}
   
  if (page.id === 2) {
    initializeDrawing();
  }

  if (page.id === 3) {
    initializeReflection();
  }

   if (page.id === 4) {
  initializeNetworkPuzzle();
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
/* =========================================
   PAGE 4 — CHALLENGING NETWORK PUZZLE
   ========================================= */

function initializeNetworkPuzzle() {

  const svg = document.getElementById("network-puzzle");
  if (!svg) return;

  const message = document.getElementById("network-message");
  const progress = document.getElementById("network-progress");
  const hintText = document.getElementById("network-hint-text");

  const undoButton = document.getElementById("network-undo");
  const resetButton = document.getElementById("network-reset");
  const hintButton = document.getElementById("network-hint");

  const SVG_NS = "http://www.w3.org/2000/svg";

  // Twelve vertices arranged as an unfamiliar network.
  const vertices = {
    A: [90, 100],
    B: [260, 60],
    C: [450, 80],
    D: [620, 140],
    E: [120, 250],
    F: [290, 200],
    G: [470, 230],
    H: [620, 340],
    I: [90, 410],
    J: [260, 370],
    K: [440, 420],
    L: [570, 450]
  };

  // 22 connections.
// Exactly A and C have odd degree.
// An Eulerian trail exists.
   
  const edgePairs = [
  ["A", "B"],
  ["B", "C"],
  ["C", "D"],
  ["D", "G"],
  ["G", "F"],
  ["F", "E"],
  ["E", "A"],

  ["E", "I"],
  ["I", "J"],
  ["J", "F"],

  ["F", "B"],
  ["B", "G"],
  ["G", "C"],

  ["G", "H"],
  ["H", "K"],
  ["K", "J"],
  ["J", "G"],

  ["H", "L"],
  ["L", "K"],
  ["K", "G"],
   
  ["A", "C"],
  ["E", "H"]
];

  const edges = edgePairs.map(([a, b], id) => ({
    id,
    a,
    b
  }));

  let currentVertex = null;
  let path = [];
  let usedEdges = new Set();

  const edgeElements = new Map();
  const vertexElements = new Map();

  function createSVGElement(tag, attributes = {}) {
    const element = document.createElementNS(SVG_NS, tag);

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;
  }

  // Draw connections.
  edges.forEach(edge => {
    const [x1, y1] = vertices[edge.a];
    const [x2, y2] = vertices[edge.b];

    const line = createSVGElement("line", {
      x1, y1, x2, y2,
      class: "network-edge"
    });

    svg.appendChild(line);
    edgeElements.set(edge.id, line);
  });

  // Draw vertices as keyboard-accessible buttons.
  Object.entries(vertices).forEach(([name, [x, y]]) => {

    const group = createSVGElement("g", {
      class: "network-vertex",
      role: "button",
      tabindex: "0",
      "aria-label": `Point ${name}`
    });

    const circle = createSVGElement("circle", {
      cx: x,
      cy: y,
      r: 17
    });

    const label = createSVGElement("text", {
      x,
      y: y + 5,
      "text-anchor": "middle"
    });

    label.textContent = name;

    group.appendChild(circle);
    group.appendChild(label);
    svg.appendChild(group);

    group.addEventListener("click", () => selectVertex(name));

    group.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectVertex(name);
      }
    });

    vertexElements.set(name, group);
  });

  function updateDisplay() {

    edgeElements.forEach((element, id) => {
      element.classList.toggle("used", usedEdges.has(id));
    });

    vertexElements.forEach((element, name) => {
      element.classList.toggle(
        "current",
        name === currentVertex
      );
    });

    progress.textContent =
      `Connections travelled: ${usedEdges.size} / ${edges.length}`;

    undoButton.disabled =
  currentVertex === null && path.length === 0;
  }

  function selectVertex(name) {

    // First point.
    if (currentVertex === null) {
      currentVertex = name;
      message.textContent = `Starting at point ${name}.`;
      updateDisplay();
      return;
    }

    if (name === currentVertex) {
      message.textContent =
        "Select a different point connected to your current position.";
      return;
    }

    const availableEdge = edges.find(edge => {

      const connects =
        (edge.a === currentVertex && edge.b === name) ||
        (edge.b === currentVertex && edge.a === name);

      return connects && !usedEdges.has(edge.id);
    });

    if (!availableEdge) {

      const connected = edges.some(edge =>
        (edge.a === currentVertex && edge.b === name) ||
        (edge.b === currentVertex && edge.a === name)
      );

      message.textContent = connected
        ? "You have already travelled along that connection."
        : "Those points are not directly connected.";

      return;
    }

    const previousVertex = currentVertex;

    usedEdges.add(availableEdge.id);

    path.push({
      edgeId: availableEdge.id,
      from: previousVertex,
      to: name
    });

    currentVertex = name;

    if (usedEdges.size === edges.length) {

      message.textContent =
        "Success! You travelled along every connection exactly once.";

    } else {

      const hasNextMove = edges.some(edge =>
        !usedEdges.has(edge.id) &&
        (edge.a === currentVertex || edge.b === currentVertex)
      );

      message.textContent = hasNextMove
        ? `You are now at point ${name}.`
        : `You have reached a dead end at point ${name}.
There are still ${edges.length - usedEdges.size}
connections remaining. Try undoing a move
or restarting with a different strategy.`;
    }

    updateDisplay();
  }

  function undoMove() {

    if (path.length === 0) {

      currentVertex = null;
      message.textContent = "Select any point to begin.";
      updateDisplay();
      return;
    }

    const lastMove = path.pop();

    usedEdges.delete(lastMove.edgeId);
    currentVertex = lastMove.from;

    message.textContent =
      `Returned to point ${currentVertex}.`;

    updateDisplay();
  }

  function resetPuzzle() {

    currentVertex = null;
    path = [];
    usedEdges = new Set();

    message.textContent = "Select any point to begin.";

    hintText.hidden = true;
    hintText.textContent = "";

    updateDisplay();
  }

  undoButton.addEventListener("click", undoMove);
  resetButton.addEventListener("click", resetPuzzle);

  hintButton.addEventListener("click", () => {

    hintText.hidden = false;

    hintText.textContent =
      "Think about what happens each time you arrive at a point. " +
      "How will you leave that point without reusing a connection?";
  });

  updateDisplay();
}

// Start textbook
renderPage();
