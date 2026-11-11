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
renderPage();
