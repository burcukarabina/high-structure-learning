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

   // Page 6: Near-transfer activities
if (page.id === 6) {
  initializeNearTransfer();
}
   // Page 7: Hamiltonian cycle delivery challenge
if (page.id === 7) {
  initializeDeliveryChallenge();
}
// Page 8: Contrasting cases
if (page.id === 8) {
  initializeContrastingCases();
}

// Page 9: Euler's theorem
if (page.id === 9) {
  initializeTheorem();
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

// =========================================
// PAGE 6 — NEAR TRANSFER
// =========================================

function initializeNearTransfer() {

  // =======================================
  // ACTIVITY 1: SORTING DEFINITIONS
  // =======================================

  const definitions = [
    {
      term: "Graph",
      definition: "A collection of vertices and edges connecting them."
    },
    {
      term: "Vertex",
      definition: "A point in a graph."
    },
    {
      term: "Edge",
      definition: "A connection between two vertices."
    },
    {
      term: "Degree",
      definition: "The number of edges meeting at a vertex."
    },
    {
      term: "Walk",
      definition: "A sequence of connected vertices; vertices and edges may repeat."
    },
    {
      term: "Trail",
      definition: "A walk in which no edge is repeated."
    }
  ];

  const bank = document.getElementById("definition-bank");
  const buckets = document.getElementById("term-buckets");
  const matchingFeedback = document.getElementById("matching-feedback");
  const matchingCheck = document.getElementById("matching-check");
  const matchingReset = document.getElementById("matching-reset");

  let selectedCard = null;

  function shuffle(items) {
    const result = [...items];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  function clearFeedback() {
    matchingFeedback.textContent = "";

    document.querySelectorAll(
      "#definition-bank .sorting-item, #term-buckets .sorting-item"
    ).forEach(card => {
      card.classList.remove("answer-correct", "answer-incorrect");
    });

    document.querySelectorAll(
      "#term-buckets .sorting-bucket"
    ).forEach(bucket => {
      bucket.classList.remove("answer-correct", "answer-incorrect");
    });
  }

  function deselectCard() {
    if (selectedCard) {
      selectedCard.classList.remove("is-selected");
      selectedCard.setAttribute("aria-pressed", "false");
    }

    selectedCard = null;
  }

  function selectCard(card) {
    if (selectedCard === card) {
      deselectCard();
      return;
    }

    deselectCard();

    selectedCard = card;
    card.classList.add("is-selected");
    card.setAttribute("aria-pressed", "true");
  }

  function moveCard(card, destination) {
    if (!card || !destination) return;

    const existingCard = destination.querySelector(".sorting-item");

    // Each bucket holds one definition.
    // Return an existing card to the bank before replacing it.
    if (existingCard && existingCard !== card) {
      bank.appendChild(existingCard);
    }

    destination.appendChild(card);

    deselectCard();
    clearFeedback();
  }

  function createCard(item) {
    const card = document.createElement("button");

    card.type = "button";
    card.className = "sorting-item";
    card.draggable = true;

    card.dataset.term = item.term;
    card.textContent = item.definition;

    card.setAttribute("aria-pressed", "false");
    card.setAttribute(
      "aria-label",
      `${item.definition}. Select this card, then select a graph theory term.`
    );

    // Click or keyboard selection
    card.addEventListener("click", event => {
      event.stopPropagation();
      selectCard(card);
    });

    // Drag-and-drop
    card.addEventListener("dragstart", event => {
      event.dataTransfer.setData("text/plain", item.term);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("is-dragging");
    });

    card.addEventListener("dragend", () => {
      card.classList.remove("is-dragging");
    });

    return card;
  }

  function createBucket(term) {
    const bucket = document.createElement("div");
    bucket.className = "sorting-bucket";

    const heading = document.createElement("h4");
    heading.textContent = term;

    const dropzone = document.createElement("div");
    dropzone.className = "sorting-dropzone";
    dropzone.dataset.term = term;

    dropzone.setAttribute("role", "button");
    dropzone.setAttribute("tabindex", "0");
    dropzone.setAttribute(
      "aria-label",
      `Place selected definition in ${term}`
    );

    function activateDropzone() {
      if (selectedCard) {
        moveCard(selectedCard, dropzone);
      }
    }

    dropzone.addEventListener("click", activateDropzone);

    dropzone.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateDropzone();
      }
    });

    dropzone.addEventListener("dragover", event => {
      event.preventDefault();
      dropzone.classList.add("is-dragover");
      event.dataTransfer.dropEffect = "move";
    });

    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("is-dragover");
    });

    dropzone.addEventListener("drop", event => {
      event.preventDefault();
      dropzone.classList.remove("is-dragover");

      const draggedTerm = event.dataTransfer.getData("text/plain");

      const card = [...document.querySelectorAll(".sorting-item")]
        .find(item => item.dataset.term === draggedTerm);

      if (card) {
        moveCard(card, dropzone);
      }
    });

    bucket.appendChild(heading);
    bucket.appendChild(dropzone);

    return bucket;
  }

  function renderMatching() {
    selectedCard = null;

    bank.innerHTML = "";
    buckets.innerHTML = "";

    shuffle(definitions).forEach(item => {
      bank.appendChild(createCard(item));
    });

    definitions.forEach(item => {
      buckets.appendChild(createBucket(item.term));
    });

    matchingFeedback.textContent = "";
  }

  matchingCheck.addEventListener("click", () => {
    const allBuckets = buckets.querySelectorAll(".sorting-bucket");

    let correct = 0;
    let placed = 0;

    allBuckets.forEach(bucket => {
      const dropzone = bucket.querySelector(".sorting-dropzone");
      const card = dropzone.querySelector(".sorting-item");

      bucket.classList.remove("answer-correct", "answer-incorrect");

      if (!card) return;

      placed++;

      if (card.dataset.term === dropzone.dataset.term) {
        correct++;
        bucket.classList.add("answer-correct");
      } else {
        bucket.classList.add("answer-incorrect");
      }
    });

    if (correct === definitions.length) {
      matchingFeedback.textContent =
        "Excellent! You matched all six definitions correctly.";
    } else if (placed < definitions.length) {
      matchingFeedback.textContent =
        `You have placed ${placed} of ${definitions.length} definitions. ` +
        "Complete the remaining matches and check again.";
    } else {
      matchingFeedback.textContent =
        `${correct} of ${definitions.length} correct. ` +
        "Review the highlighted matches and try again.";
    }
  });

  matchingReset.addEventListener("click", renderMatching);

  // Allow cards to be returned to the bank.
  bank.addEventListener("dragover", event => {
    event.preventDefault();
  });

  bank.addEventListener("drop", event => {
    event.preventDefault();

    const draggedTerm = event.dataTransfer.getData("text/plain");

    const card = [...document.querySelectorAll(".sorting-item")]
      .find(item => item.dataset.term === draggedTerm);

    if (card) {
      bank.appendChild(card);
      deselectCard();
      clearFeedback();
    }
  });

  bank.addEventListener("click", event => {
    if (event.target.closest(".sorting-item")) return;

    if (selectedCard) {
      const card = selectedCard;
      bank.appendChild(card);
      deselectCard();
      clearFeedback();
    }
  });

  renderMatching();


    // =======================================
  // ACTIVITY 2: APPLY TO A NEW GRAPH
  // =======================================

  const graphPool = [
    {
      vertices: {
        A: [70, 145], B: [170, 55], C: [170, 235],
        D: [300, 85], E: [350, 215]
      },
      edges: [
        ["A","B"], ["A","C"], ["B","C"],
        ["B","D"], ["C","D"], ["D","E"]
      ],
      degreeVertex: "D",
      route: ["A","B","C","B"]
    },
    {
      vertices: {
        A: [70, 70], B: [210, 50], C: [350, 70],
        D: [350, 220], E: [210, 240], F: [70, 220]
      },
      edges: [
        ["A","B"], ["B","C"], ["C","D"],
        ["D","E"], ["E","F"], ["F","A"],
        ["B","E"]
      ],
      degreeVertex: "B",
      route: ["A","B","E","D"]
    },
    {
      vertices: {
        A: [70, 145], B: [180, 55], C: [300, 55],
        D: [350, 145], E: [300, 235], F: [180, 235]
      },
      edges: [
        ["A","B"], ["B","C"], ["C","D"],
        ["D","E"], ["E","F"], ["F","A"],
        ["B","F"], ["C","E"]
      ],
      degreeVertex: "F",
      route: ["A","B","C","E"]
    },
    {
      vertices: {
        A: [70, 145], B: [170, 55], C: [300, 55],
        D: [350, 145], E: [300, 235], F: [170, 235]
      },
      edges: [
        ["A","B"], ["A","F"], ["B","C"],
        ["C","D"], ["D","E"], ["E","F"],
        ["B","F"]
      ],
      degreeVertex: "A",
      route: ["A","B","D","E"]
    },
    {
      vertices: {
        A: [70, 145], B: [160, 55], C: [270, 55],
        D: [350, 145], E: [270, 235], F: [160, 235]
      },
      edges: [
        ["A","B"], ["B","C"], ["C","D"],
        ["D","E"], ["E","F"], ["F","A"],
        ["A","C"], ["C","E"]
      ],
      degreeVertex: "C",
      route: ["A","C","E","D"]
    },
    {
      vertices: {
        A: [70, 80], B: [210, 50], C: [350, 80],
        D: [350, 220], E: [210, 250], F: [70, 220]
      },
      edges: [
        ["A","B"], ["B","C"], ["C","D"],
        ["D","E"], ["E","F"], ["F","A"],
        ["A","E"], ["B","D"]
      ],
      degreeVertex: "E",
      route: ["A","E","D","B"]
    },
    {
      vertices: {
        A: [70, 145], B: [170, 55], C: [300, 55],
        D: [350, 145], E: [300, 235], F: [170, 235],
        G: [210, 145]
      },
      edges: [
        ["A","B"], ["B","C"], ["C","D"],
        ["D","E"], ["E","F"], ["F","A"],
        ["B","G"], ["G","E"], ["G","F"]
      ],
      degreeVertex: "G",
      route: ["B","G","F","A"]
    },
    {
      vertices: {
        A: [70, 70], B: [210, 50], C: [350, 70],
        D: [350, 220], E: [210, 240], F: [70, 220]
      },
      edges: [
        ["A","B"], ["B","C"], ["C","D"],
        ["D","E"], ["E","F"], ["F","A"],
        ["A","D"], ["B","E"]
      ],
      degreeVertex: "D",
      route: ["A","D","E","B"]
    }
  ];

  const svg = document.getElementById("transfer-graph-svg");
  const transferCheck = document.getElementById("transfer-check");
  const transferReset = document.getElementById("transfer-reset");
  const overallFeedback =
    document.getElementById("transfer-overall-feedback");

  const SVG_NS = "http://www.w3.org/2000/svg";

  let remainingGraphs = [];
  let currentGraph = null;

  function edgeExists(graph, a, b) {
    return graph.edges.some(([u, v]) =>
      (u === a && v === b) ||
      (u === b && v === a)
    );
  }

  function degreeOf(graph, vertex) {
    return graph.edges.filter(([a, b]) =>
      a === vertex || b === vertex
    ).length;
  }

  function isWalk(graph, route) {
    for (let i = 0; i < route.length - 1; i++) {
      if (!edgeExists(graph, route[i], route[i + 1])) {
        return false;
      }
    }
    return true;
  }

  function isTrail(graph, route) {
    if (!isWalk(graph, route)) return false;

    const used = new Set();

    for (let i = 0; i < route.length - 1; i++) {
      const edge = [route[i], route[i + 1]].sort().join("-");

      if (used.has(edge)) return false;
      used.add(edge);
    }

    return true;
  }

  function makeSvgElement(tag, attributes = {}) {
    const element = document.createElementNS(SVG_NS, tag);

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;
  }

  function drawGraph(graph) {
    svg.innerHTML = "";

    const edgesGroup = makeSvgElement("g", {
      class: "definition-edges"
    });

    graph.edges.forEach(([a, b]) => {
      const [x1, y1] = graph.vertices[a];
      const [x2, y2] = graph.vertices[b];

      edgesGroup.appendChild(makeSvgElement("line", {
        x1, y1, x2, y2
      }));
    });

    svg.appendChild(edgesGroup);

    const verticesGroup = makeSvgElement("g", {
      class: "definition-vertices"
    });

    const labelsGroup = makeSvgElement("g", {
      class: "transfer-graph-labels"
    });

    Object.entries(graph.vertices).forEach(([name, [x, y]]) => {
      verticesGroup.appendChild(makeSvgElement("circle", {
        cx: x,
        cy: y,
        r: 13
      }));

      const label = makeSvgElement("text", {
        x,
        y: y - 22,
        "text-anchor": "middle"
      });

      label.textContent = name;
      labelsGroup.appendChild(label);
    });

    svg.appendChild(verticesGroup);
    svg.appendChild(labelsGroup);

    svg.setAttribute(
      "aria-label",
      `Graph with ${Object.keys(graph.vertices).length} vertices ` +
      `and ${graph.edges.length} edges. ` +
      graph.edges.map(([a, b]) => `${a} to ${b}`).join(", ") + "."
    );
  }

  function clearTransferAnswers() {
    [
      "vertices", "edges", "degree", "walk", "trail"
    ].forEach(key => {
      const input = document.getElementById(`transfer-${key}`);
      const feedback = document.getElementById(`feedback-${key}`);

      input.value = "";
      input.classList.remove("answer-correct", "answer-incorrect");
      feedback.textContent = "";
    });

    overallFeedback.textContent = "";
  }

  function loadGraph() {
    if (remainingGraphs.length === 0) {
      remainingGraphs = graphPool.map((_, index) => index);

      // Avoid repeating the immediately previous graph.
      if (currentGraph) {
        const previousIndex = graphPool.indexOf(currentGraph);
        const position = remainingGraphs.indexOf(previousIndex);

        if (position !== -1) {
          remainingGraphs.splice(position, 1);
          remainingGraphs.push(previousIndex);
        }
      }
    }

    const nextIndex = Math.floor(Math.random() * remainingGraphs.length);
    const graphIndex = remainingGraphs.splice(nextIndex, 1)[0];

    currentGraph = graphPool[graphIndex];

    drawGraph(currentGraph);

    const routeText = currentGraph.route.join(" → ");

    document.getElementById("transfer-degree-vertex").textContent =
      currentGraph.degreeVertex;

    document.getElementById("transfer-route-walk").textContent =
      routeText;

    document.getElementById("transfer-route-trail").textContent =
      routeText;

    clearTransferAnswers();
  }

  transferCheck.addEventListener("click", () => {
    const graph = currentGraph;

    const answers = {
      vertices: String(Object.keys(graph.vertices).length),
      edges: String(graph.edges.length),
      degree: String(degreeOf(graph, graph.degreeVertex)),
      walk: isWalk(graph, graph.route) ? "yes" : "no",
      trail: isTrail(graph, graph.route) ? "yes" : "no"
    };

    const feedbackMessages = {
      vertices: "Count the labeled points in the graph.",
      edges: "Count each connection between two vertices.",
      degree: `Count the edges meeting at vertex ${graph.degreeVertex}.`,
      walk: "Check whether every consecutive pair of vertices is connected.",
      trail: "A trail must be a valid walk and cannot repeat an edge."
    };

    let correct = 0;
    let answered = 0;

    Object.entries(answers).forEach(([key, answer]) => {
      const input = document.getElementById(`transfer-${key}`);
      const feedback = document.getElementById(`feedback-${key}`);

      const value = input.value.trim().toLowerCase();

      input.classList.remove("answer-correct", "answer-incorrect");

      if (!value) {
        feedback.textContent = "Please enter or select an answer.";
        return;
      }

      answered++;

      if (value === answer) {
        correct++;
        input.classList.add("answer-correct");
        feedback.textContent = "Correct.";
      } else {
        input.classList.add("answer-incorrect");
        feedback.textContent =
          `Not quite. ${feedbackMessages[key]}`;
      }
    });

    if (correct === 5) {
      overallFeedback.textContent =
        "Excellent! You've applied all five concepts correctly. " +
        "Select Try Again to practice with a new graph.";
    } else if (answered < 5) {
      overallFeedback.textContent =
        `You have ${5 - answered} unanswered question(s).`;
    } else {
      overallFeedback.textContent =
        `${correct} of 5 correct. Use the feedback to revise your answers.`;
    }
  });

  transferReset.addEventListener("click", loadGraph);

  loadGraph();
}
// =========================================
// PAGE 7 — HAMILTONIAN CYCLE CHALLENGE
// =========================================

function initializeDeliveryChallenge() {

  const svg = document.getElementById("delivery-graph");

  if (!svg) return;

  const routeDisplay = document.getElementById("delivery-route");
  const progressDisplay = document.getElementById("delivery-progress");
  const feedback = document.getElementById("delivery-feedback");

  const undoButton = document.getElementById("delivery-undo");
  const resetButton = document.getElementById("delivery-reset");

  const SVG_NS = "http://www.w3.org/2000/svg";


  // =========================================
  // DELIVERY NETWORK
  // =========================================

  // =========================================
// DELIVERY NETWORK POOL
// =========================================

const graphPool = [

  // NETWORK 1 — WARM-UP
  // Starting point: A
  {
    start: "A",
    vertices: {
      A: [75, 150],
      B: [160, 55],
      C: [300, 55],
      D: [355, 150],
      E: [300, 260],
      F: [160, 260]
    },
    edges: [
      ["A","B"], ["B","C"], ["C","D"],
      ["D","E"], ["E","F"], ["F","A"],
      ["A","C"], ["B","E"], ["C","E"],
      ["B","F"]
    ]
  },

  // NETWORK 2 — INTERNAL ROUTES
  // Starting point: C
  {
    start: "C",
    vertices: {
      A: [75, 150],
      B: [175, 55],
      C: [315, 55],
      D: [355, 150],
      E: [315, 255],
      F: [175, 255]
    },
    edges: [
      ["A","B"], ["B","C"], ["C","D"],
      ["D","E"], ["E","F"], ["A","C"],
      ["A","D"], ["B","E"], ["C","E"],
      ["D","F"]
    ]
  },

  // NETWORK 3 — CONNECTED GROUPS
  // Starting point: B
  {
    start: "B",
    vertices: {
      A: [85, 150],
      B: [180, 60],
      C: [180, 240],
      D: [310, 60],
      E: [310, 240],
      F: [390, 150]
    },
    edges: [
      ["A","B"], ["B","C"], ["C","A"],
      ["D","E"], ["E","F"], ["F","D"],
      ["B","D"], ["C","E"], ["A","F"]
    ]
  },

  // NETWORK 4 — CROSS CONNECTIONS
  // Starting point: E
  {
    start: "E",
    vertices: {
      A: [70, 150],
      B: [170, 55],
      C: [310, 55],
      D: [370, 150],
      E: [310, 255],
      F: [170, 255]
    },
    edges: [
      ["A","B"], ["B","C"], ["C","D"],
      ["D","E"], ["E","F"], ["A","C"],
      ["B","E"], ["C","F"], ["A","E"],
      ["D","F"]
    ]
  },

  // NETWORK 5 — CONSTRAINED ROUTE
  // Starting point: F
  // Exactly one Hamiltonian cycle, ignoring direction.
  {
    start: "F",
    vertices: {
      A: [80, 80],
      B: [220, 45],
      C: [355, 80],
      D: [355, 235],
      E: [220, 270],
      F: [80, 235]
    },
    edges: [
      ["A","B"], ["B","C"], ["C","D"],
      ["D","E"], ["E","A"], ["A","F"],
      ["F","C"], ["B","E"]
    ]
  },

  // NETWORK 6 — MANY POSSIBILITIES
  // Starting point: D
  {
    start: "D",
    vertices: {
      A: [75, 150],
      B: [170, 55],
      C: [305, 55],
      D: [370, 150],
      E: [305, 255],
      F: [170, 255]
    },
    edges: [
      ["A","B"], ["B","C"], ["C","D"],
      ["D","E"], ["E","F"], ["A","D"],
      ["A","E"], ["B","F"], ["C","F"],
      ["B","E"], ["D","F"]
    ]
  },

  // NETWORK 7 — ALTERNATIVE CONNECTIONS
  // Starting point: B
  {
    start: "B",
    vertices: {
      A: [75, 150],
      B: [170, 55],
      C: [310, 55],
      D: [370, 150],
      E: [310, 255],
      F: [170, 255]
    },
    edges: [
      ["B","D"], ["D","F"], ["F","A"],
      ["A","C"], ["C","E"], ["E","B"],
      ["A","B"], ["C","D"], ["E","F"]
    ]
  },

  // NETWORK 8 — FINAL CHALLENGE
  // Starting point: F
  {
    start: "F",
    vertices: {
      A: [70, 155],
      B: [170, 50],
      C: [310, 50],
      D: [370, 155],
      E: [310, 260],
      F: [170, 260]
    },
    edges: [
      ["A","B"], ["B","D"], ["D","E"],
      ["E","C"], ["C","F"], ["F","A"],
      ["A","C"], ["B","E"], ["D","F"],
      ["B","C"], ["A","E"]
    ]
  }

];

let remainingGraphs = [];
let currentGraph = null;

let vertices = {};
let edges = [];
let vertexNames = [];

let route = ["A"];

const vertexElements = new Map();
const edgeElements = [];


  // =========================================
  // SVG HELPER
  // =========================================

  function createSVGElement(tag, attributes = {}) {

    const element = document.createElementNS(SVG_NS, tag);

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;

  }


  // =========================================
  // CHECK CONNECTION
  // =========================================

  function connected(a, b) {

    return edges.some(([u, v]) =>
      (u === a && v === b) ||
      (u === b && v === a)
    );

  }
function drawNetwork() {

  svg.innerHTML = "";

  vertexElements.clear();
  edgeElements.length = 0;

  // =========================================
  // DRAW EDGES
  // =========================================

  edges.forEach(([a, b]) => {

    const [x1, y1] = vertices[a];
    const [x2, y2] = vertices[b];

    const line = createSVGElement("line", {
      x1,
      y1,
      x2,
      y2,
      class: "delivery-edge"
    });

    svg.appendChild(line);

    edgeElements.push({ a, b, element: line });

  });


  // =========================================
  // DRAW VERTICES
  // =========================================

  vertexNames.forEach(name => {

    const [x, y] = vertices[name];

    const group = createSVGElement("g", {
      class: "delivery-vertex",
      role: "button",
      tabindex: "0",
      "aria-label": `Location ${name}`
    });

    const circle = createSVGElement("circle", {
      cx: x,
      cy: y,
      r: 19
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

    group.addEventListener("click", () => {
      selectLocation(name);
    });

    group.addEventListener("keydown", event => {

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectLocation(name);
      }

    });

    vertexElements.set(name, group);

  });
}
   function loadNewNetwork() {

  if (remainingGraphs.length === 0) {
    remainingGraphs = graphPool.map((_, index) => index);
  }

  // Avoid showing the same network twice in a row.
  let available = remainingGraphs;

  if (currentGraph && remainingGraphs.length > 1) {
    const previousIndex = graphPool.indexOf(currentGraph);

    available = remainingGraphs.filter(
      index => index !== previousIndex
    );
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  const selectedIndex = available[randomIndex];

  remainingGraphs = remainingGraphs.filter(
    index => index !== selectedIndex
  );

  currentGraph = graphPool[selectedIndex];

  vertices = currentGraph.vertices;
  edges = currentGraph.edges;
  vertexNames = Object.keys(vertices);

  // Start at this network's distribution centre.
  route = [currentGraph.start];

  drawNetwork();

  // Update the displayed starting location.
  const startLabel = document.getElementById("delivery-start");

  if (startLabel) {
    startLabel.textContent = currentGraph.start;
  }

  feedback.textContent =
    `New delivery network! Start at ${currentGraph.start}, ` +
    "visit every other location exactly once, " +
    `and return to ${currentGraph.start}.`;

  updateDisplay();
}

  // =========================================
  // SELECT LOCATION
  // =========================================

  function selectLocation(name) {

  const current = route[route.length - 1];
  const start = currentGraph.start;

  // Stop after completing the cycle.
  if (
    route.length === vertexNames.length + 1 &&
    current === start
  ) {
    return;
  }

  // Check whether a direct connection exists.
  if (!connected(current, name)) {

    feedback.textContent =
      `There is no direct connection from ${current} to ${name}.`;

    return;
  }

  // Returning to the distribution centre.
  if (name === start) {

    if (route.length !== vertexNames.length) {

      feedback.textContent =
        `You must visit every other location before returning to ${start}.`;

      return;
    }

    route.push(start);

    feedback.textContent =
      "Success! You found a Hamiltonian cycle.";

    updateDisplay();
    return;
  }

  // Prevent repeated locations.
  if (route.includes(name)) {

    feedback.textContent =
      "You've already visited that location. " +
      "A Hamiltonian cycle visits each vertex exactly once.";

    return;
  }

  route.push(name);

  if (route.length === vertexNames.length) {

    feedback.textContent = connected(name, start)
      ? `All locations visited! Return to ${start} to complete the cycle.`
      : `All locations visited, but there is no direct connection ` +
        `to ${start}. Undo a move and try a different route.`;

  } else {

    feedback.textContent =
      `Now at location ${name}. Choose your next location.`;
  }

  updateDisplay();
}


  // =========================================
  // UPDATE DISPLAY
  // =========================================

  function updateDisplay() {

    routeDisplay.textContent = route.join(" → ");

    const visitedCount = new Set(route).size;

    progressDisplay.textContent =
      `Locations visited: ${visitedCount} of ${vertexNames.length}`;

    const current = route[route.length - 1];

    vertexElements.forEach((element, name) => {

      element.classList.toggle(
        "visited",
        route.includes(name)
      );

      element.classList.toggle(
        "current",
        name === current
      );

    });

    edgeElements.forEach(({ a, b, element }) => {

      let used = false;

      for (let i = 0; i < route.length - 1; i++) {

        const u = route[i];
        const v = route[i + 1];

        if (
          (a === u && b === v) ||
          (a === v && b === u)
        ) {
          used = true;
          break;
        }

      }

      element.classList.toggle("used", used);

    });

    undoButton.disabled = route.length <= 1;

  }


  // =========================================
  // UNDO
  // =========================================

  undoButton.addEventListener("click", () => {

    if (route.length <= 1) return;

    route.pop();

    feedback.textContent =
      "Last move removed. Continue building your route.";

    updateDisplay();

  });


  // =========================================
  // RESET
  // =========================================

resetButton.addEventListener("click", loadNewNetwork);


  // Initialize
 loadNewNetwork();

}

// =========================================
// PAGE 8 — CONTRASTING CASES
// =========================================

function initializeContrastingCases() {

  const container = document.getElementById("contrast-graphs");

  if (!container) return;

  const SVG_NS = "http://www.w3.org/2000/svg";

  const graphs = [

    // GRAPH A: TWO TRIANGLES SHARING A VERTEX
    {
      name: "Graph A",
      vertices: {
        A: [35, 110],
        B: [100, 40],
        C: [100, 180],
        D: [165, 40],
        E: [165, 180]
      },
      edges: [
        ["A", "B"],
        ["B", "C"],
        ["C", "A"],
        ["C", "D"],
        ["D", "E"],
        ["E", "C"]
      ],
      explanation:
        "The two triangles share vertex C. " +
        "Every edge can be used exactly once in an Eulerian circuit. " +
        "However, a Hamiltonian cycle is impossible because " +
        "visiting both triangles would require returning to C."
    },

    // GRAPH B: SQUARE WITH BOTH DIAGONALS
    {
      name: "Graph B",
      vertices: {
        A: [45, 45],
        B: [165, 45],
        C: [165, 165],
        D: [45, 165]
      },
      edges: [
        ["A", "B"],
        ["B", "C"],
        ["C", "D"],
        ["D", "A"],
        ["A", "C"],
        ["B", "D"]
      ],
      explanation:
        "The outer square is a Hamiltonian cycle. " +
        "However, all four vertices have degree 3, " +
        "so an Eulerian trail does not exist."
    },

    // GRAPH C: SIMPLE SQUARE
    {
      name: "Graph C",
      vertices: {
        A: [45, 45],
        B: [165, 45],
        C: [165, 165],
        D: [45, 165]
      },
      edges: [
        ["A", "B"],
        ["B", "C"],
        ["C", "D"],
        ["D", "A"]
      ],
      explanation:
        "Following the square uses every edge exactly once " +
        "and visits every vertex exactly once before returning " +
        "to the start. Both properties hold."
    },
     // GRAPH D: SQUARE WITH AN ADDITIONAL EDGE
{
  name: "Graph D",
  vertices: {
    A: [45, 45],
    B: [165, 45],
    C: [165, 165],
    D: [45, 165],
    E: [105, 205]
  },
  edges: [
    ["A", "B"],
    ["B", "C"],
    ["C", "D"],
    ["D", "A"],
    ["D", "E"]
  ],
  explanation:
    "Exactly two vertices, D and E, have odd degree. " +
    "An Eulerian trail exists, starting at one of them " +
    "and ending at the other. A Hamiltonian cycle is " +
    "impossible because E has only one connection."
}

  ];


  // =========================================
  // GRAPH THEORY HELPERS
  // =========================================

  function degreeOf(graph, vertex) {

    return graph.edges.filter(([a, b]) =>
      a === vertex || b === vertex
    ).length;

  }

  function oddVertices(graph) {

    return Object.keys(graph.vertices).filter(
      vertex => degreeOf(graph, vertex) % 2 !== 0
    );

  }

  // These three graphs are connected.
  function hasEulerianTrail(graph) {

    const count = oddVertices(graph).length;

    return count === 0 || count === 2;

  }

  function hasHamiltonianCycle(graph) {

    const names = Object.keys(graph.vertices);
    const start = names[0];

    function connected(a, b) {

      return graph.edges.some(([u, v]) =>
        (u === a && v === b) ||
        (u === b && v === a)
      );

    }

    function search(current, visited) {

      if (visited.size === names.length) {
        return connected(current, start);
      }

      for (const next of names) {

        if (
          !visited.has(next) &&
          connected(current, next)
        ) {

          const newVisited = new Set(visited);
          newVisited.add(next);

          if (search(next, newVisited)) {
            return true;
          }

        }

      }

      return false;

    }

    return search(start, new Set([start]));

  }


  // =========================================
  // DRAW A GRAPH
  // =========================================

  function makeSVGElement(tag, attributes = {}) {

    const element = document.createElementNS(
      SVG_NS,
      tag
    );

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });

    return element;

  }

  function drawGraph(graph, index) {

    const svg = makeSVGElement("svg", {
      viewBox: "0 0 210 220",
      class: "contrast-svg",
      role: "img",
      "aria-label":
        `${graph.name}: ` +
        graph.edges.map(([a, b]) => `${a} to ${b}`).join(", ")
    });

    const edgeGroup = makeSVGElement("g", {
      class: "contrast-edges"
    });

    graph.edges.forEach(([a, b]) => {

      const [x1, y1] = graph.vertices[a];
      const [x2, y2] = graph.vertices[b];

      edgeGroup.appendChild(
        makeSVGElement("line", { x1, y1, x2, y2 })
      );

    });

    svg.appendChild(edgeGroup);

    Object.entries(graph.vertices).forEach(([name, [x, y]]) => {

      const group = makeSVGElement("g", {
        class: "contrast-vertex"
      });

      const circle = makeSVGElement("circle", {
        cx: x,
        cy: y,
        r: 15
      });

      const label = makeSVGElement("text", {
        x,
        y: y + 5,
        "text-anchor": "middle"
      });

      label.textContent = name;

      group.appendChild(circle);
group.appendChild(label);

      svg.appendChild(group);

    });

    return svg;

  }


  // =========================================
  // RENDER THREE COMPARISON CARDS
  // =========================================

  graphs.forEach((graph, index) => {

    const card = document.createElement("div");
    card.className = "contrast-card";

    const heading = document.createElement("h3");
    heading.textContent = graph.name;

    const svg = drawGraph(graph, index);

    const questions = document.createElement("div");
    questions.className = "contrast-questions";

    questions.innerHTML = `
      <label for="contrast-euler-${index}">
        Eulerian trail?
      </label>

      <select id="contrast-euler-${index}">
        <option value="">Choose...</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <label for="contrast-hamilton-${index}">
        Hamiltonian cycle?
      </label>

      <select id="contrast-hamilton-${index}">
        <option value="">Choose...</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>
    `;

    card.appendChild(heading);
    card.appendChild(svg);
    card.appendChild(questions);

    container.appendChild(card);

  });


  // =========================================
  // CHECK PREDICTIONS
  // =========================================

  const checkButton = document.getElementById("contrast-check");
  const feedback = document.getElementById("contrast-feedback");
  const explanations = document.getElementById(
    "contrast-explanations"
  );

  checkButton.addEventListener("click", () => {

    let correct = 0;
    let answered = 0;

    graphs.forEach((graph, index) => {

      const eulerInput = document.getElementById(
        `contrast-euler-${index}`
      );

      const hamiltonInput = document.getElementById(
        `contrast-hamilton-${index}`
      );

      const eulerAnswer =
        hasEulerianTrail(graph) ? "yes" : "no";

      const hamiltonAnswer =
        hasHamiltonianCycle(graph) ? "yes" : "no";

      [
        [eulerInput, eulerAnswer],
        [hamiltonInput, hamiltonAnswer]
      ].forEach(([input, answer]) => {

        input.classList.remove(
          "answer-correct",
          "answer-incorrect"
        );

        if (!input.value) return;

        answered++;

        if (input.value === answer) {
          correct++;
          input.classList.add("answer-correct");
        } else {
          input.classList.add("answer-incorrect");
        }

      });

    });

    if (answered < graphs.length * 2) {

      feedback.textContent =
  `You have answered ${answered} of ${graphs.length * 2} questions. ` +
  "Complete the remaining predictions before checking.";

      return;

    }

    feedback.textContent =
  `${correct} of ${graphs.length * 2} predictions correct. ` +
  "Compare the explanations below.";

    explanations.innerHTML = "";

    graphs.forEach(graph => {

      const paragraph = document.createElement("p");

      paragraph.textContent =
        `${graph.name}: ${graph.explanation}`;

      explanations.appendChild(paragraph);

    });

    explanations.hidden = false;

  });


}

  // =========================================
// Page 9 REVEAL EULER'S THEOREM
// =========================================

const theoremButton = document.getElementById(
  "contrast-theorem-button"
);

const theorem = document.getElementById(
  "contrast-theorem"
);

const returnSection = document.getElementById(
  "contrast-return"
);

const celebration = document.getElementById(
  "contrast-celebration"
);

theoremButton.addEventListener("click", () => {

  theorem.hidden = false;
  returnSection.hidden = false;

  theoremButton.textContent = "Theorem Revealed";
  theoremButton.disabled = true;

  // Respect reduced-motion preferences.
  if (
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    return;
  }

  // Create a short burst of gold particles.
  const colors = [
    "#f4d35e",
    "#d4a017",
    "#f9e8a4",
    "#c49a24",
    "#ffffff"
  ];

  for (let i = 0; i < 28; i++) {

    const particle = document.createElement("span");

    particle.className = "contrast-particle";

    particle.style.setProperty(
      "--angle",
      `${(i / 28) * 360}deg`
    );

    particle.style.setProperty(
      "--distance",
      `${70 + Math.random() * 120}px`
    );

    particle.style.backgroundColor =
      colors[i % colors.length];

    celebration.appendChild(particle);

    particle.addEventListener(
      "animationend",
      () => particle.remove(),
      { once: true }
    );

   }

}); // End of theorem button event listener

} // End of initializeTheorem()

// =========================================
// START TEXTBOOK
// =========================================

renderPage();
