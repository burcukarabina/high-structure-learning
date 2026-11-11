/* =========================================
   HIGH EXPECTATIONS WITH HIGH STRUCTURE
   Interactive Digital Textbook
   app.js
   ========================================= */

// =========================================
// GLOBAL STATE
// =========================================

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


// =========================================
// FLASHCARDS
// =========================================

function initializeFlashcards() {

  document.querySelectorAll(".strategy-flashcard").forEach(flashcard => {

    flashcard.addEventListener("click", () => {

      const isFlipped = flashcard.classList.toggle("is-flipped");

      flashcard.setAttribute(
        "aria-pressed",
        String(isFlipped)
      );

      flashcard.setAttribute(
        "aria-label",
        isFlipped
          ? "Return to the reflection question"
          : "Reveal the learning strategy"
      );

    });

  });

}


// =========================================
// RENDER CURRENT PAGE
// =========================================

function renderPage() {

  const page = pages[currentPage];

  // Apply page styling
  pageContent.className =
    page.type === "zoom" ? "page-zoom" : "page-learn";

  // Render page content
  pageContent.innerHTML = `
    <span class="page-label">${page.label}</span>
    <h1>${page.title}</h1>
    ${page.content}
  `;

  // Initialize flashcards on the current page
  initializeFlashcards();


  // =========================================
  // UPDATE PROGRESS
  // =========================================

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


  // =========================================
  // UPDATE NAVIGATION
  // =========================================

  prevBtn.disabled = currentPage === 0;

  nextBtn.textContent =
    currentPage === totalPages - 1
      ? "Finish"
      : "Continue →";


  // =========================================
  // INITIALIZE PAGE-SPECIFIC INTERACTIONS
  // =========================================

  // Page 1: Firebase word clouds
  if (page.id === 1 && window.initializeWordClouds) {
    window.initializeWordClouds();
  }

  // Page 2: Interactive drawing
  if (page.id === 2) {
    initializeDrawing();
  }

  // Page 3: Reflection
  if (page.id === 3) {
    initializeReflection();
  }

  // Page 4: Network puzzle
  if (page.id === 4) {
    initializeNetworkPuzzle();
  }

  // Scroll to top when changing pages
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

}


// =========================================
// PAGE 2 — INTERACTIVE DRAWING
// =========================================

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


// =========================================
// PAGE 3 — REFLECTION
// =========================================

function initializeReflection() {

  const textarea = document.getElementById("reflection-1");

  if (!textarea) return;

  // Restore previous response
  textarea.value = reflections[3] || "";

  // Save response as the user types
  textarea.addEventListener("input", () => {
    reflections[3] = textarea.value;
  });

}


// =========================================
// NAVIGATION
// =========================================

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


// =========================================
// PAGE 4 — CHALLENGING NETWORK PUZZLE
// =========================================

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


  // =========================================
  // NETWORK STRUCTURE
  // =========================================

  // Twelve vertices arranged as an unfamiliar network
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
  // Exactly A and G have odd degree.
  // Therefore, an Eulerian trail exists.

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


  // =========================================
  // PUZZLE STATE
  // =========================================

  let currentVertex = null;

  let path = [];

  let usedEdges = new Set();

  const edgeElements = new Map();
  const vertexElements = new Map();


  // =========================================
  // SVG HELPER
  // =========================================

  function createSVGElement(tag, attributes = {}) {

    const element = document.createElementNS(
      SVG_NS,
      tag
    );

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;

  }


  // =========================================
  // DRAW EDGES
  // =========================================

  edges.forEach(edge => {

    const [x1, y1] = vertices[edge.a];
    const [x2, y2] = vertices[edge.b];

    const line = createSVGElement("line", {
      x1,
      y1,
      x2,
      y2,
      class: "network-edge"
    });

    svg.appendChild(line);

    edgeElements.set(edge.id, line);

  });


  // =========================================
  // DRAW VERTICES
  // =========================================

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


    // Mouse interaction
    group.addEventListener("click", () => {
      selectVertex(name);
    });


    // Keyboard interaction
    group.addEventListener("keydown", event => {

      if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();

        selectVertex(name);

      }

    });

    vertexElements.set(name, group);

  });


  // =========================================
  // UPDATE PUZZLE DISPLAY
  // =========================================

  function updateDisplay() {

    // Highlight travelled connections
    edgeElements.forEach((element, id) => {

      element.classList.toggle(
        "used",
        usedEdges.has(id)
      );

    });


    // Highlight current vertex
    vertexElements.forEach((element, name) => {

      element.classList.toggle(
        "current",
        name === currentVertex
      );

    });


    // Update progress
    progress.textContent =
      `Connections travelled: ${usedEdges.size} / ${edges.length}`;


    // Update Undo button
    undoButton.disabled =
      currentVertex === null && path.length === 0;

  }


  // =========================================
  // SELECT A VERTEX
  // =========================================

  function selectVertex(name) {

    // First point
    if (currentVertex === null) {

      currentVertex = name;

      message.textContent =
        `Starting at point ${name}.`;

      updateDisplay();

      return;

    }


    // Prevent selecting the same vertex
    if (name === currentVertex) {

      message.textContent =
        "Select a different point connected to your current position.";

      return;

    }


    // Find an unused edge connecting the vertices
    const availableEdge = edges.find(edge => {

      const connects =
        (edge.a === currentVertex && edge.b === name) ||
        (edge.b === currentVertex && edge.a === name);

      return connects && !usedEdges.has(edge.id);

    });


    // Handle invalid moves
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


    // Record the move
    const previousVertex = currentVertex;

    usedEdges.add(availableEdge.id);

    path.push({

      edgeId: availableEdge.id,
      from: previousVertex,
      to: name

    });

    currentVertex = name;


    // Check for completion
    if (usedEdges.size === edges.length) {

      message.textContent =
        "Success! You travelled along every connection exactly once.";

    } else {

      // Check whether another move is available
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


  // =========================================
  // UNDO MOVE
  // =========================================

  function undoMove() {

    if (path.length === 0) {

      currentVertex = null;

      message.textContent =
        "Select any point to begin.";

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


  // =========================================
  // RESET PUZZLE
  // =========================================

  function resetPuzzle() {

    currentVertex = null;

    path = [];

    usedEdges = new Set();

    message.textContent =
      "Select any point to begin.";

    hintText.hidden = true;

    hintText.textContent = "";

    updateDisplay();

  }


  // =========================================
  // BUTTON CONTROLS
  // =========================================

  undoButton.addEventListener(
    "click",
    undoMove
  );

  resetButton.addEventListener(
    "click",
    resetPuzzle
  );

  hintButton.addEventListener("click", () => {

    hintText.hidden = false;

    hintText.textContent =
      "Think about what happens each time you arrive at a point. " +
      "How will you leave that point without reusing a connection?";

  });


  // Initialize display
  updateDisplay();

}


// =========================================
// START TEXTBOOK
// =========================================

renderPage();
