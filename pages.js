/* =========================================
   HIGH EXPECTATIONS WITH HIGH STRUCTURE
   Interactive Digital Textbook
   pages.js
   ========================================= */

const pages = [

  // PAGE 1
  {
    id: 1,
    type: "learn",
    label: "Opening Reflection",
    title: "High Expectations with High Structure",

    content: `
  <p class="intro-text">
    Before we begin, let's hear from you.
  </p>

  <p>
    Share a word or short phrase for each question.
    Watch the responses develop into live word clouds.
  </p>

  <div class="word-cloud-grid">

    <!-- HIGH EXPECTATIONS -->

    <section
      class="word-cloud-activity"
      data-question="expectations"
    >

      <h2>High Expectations</h2>

      <p>What does high expectations mean to you?</p>

      <form class="word-cloud-form">

        <label for="expectations-input">
          Your word or short phrase
        </label>

        <input
          id="expectations-input"
          class="word-cloud-input"
          type="text"
          maxlength="60"
          required
          placeholder="Enter your response"
        >

        <button type="submit">
          Submit
        </button>

      </form>

      <p class="word-cloud-status" role="status"></p>

      <div class="word-cloud-display"
           aria-label="High expectations word cloud">
      </div>

      <p class="word-cloud-count">0 responses</p>

    </section>

    <!-- HIGH STRUCTURE -->

    <section
      class="word-cloud-activity"
      data-question="structure"
    >

      <h2>High Structure</h2>

      <p>What does high structure mean to you?</p>

      <form class="word-cloud-form">

        <label for="structure-input">
          Your word or short phrase
        </label>

        <input
          id="structure-input"
          class="word-cloud-input"
          type="text"
          maxlength="60"
          required
          placeholder="Enter your response"
        >

        <button type="submit">
          Submit
        </button>

      </form>

      <p class="word-cloud-status" role="status"></p>

      <div class="word-cloud-display"
           aria-label="High structure word cloud">
      </div>

      <p class="word-cloud-count">0 responses</p>

        </section>

  </div> <!-- End of word-cloud-grid -->

  <section class="strategy-reflection">
    <h2>Zoom Out: What Did We Just Learn About Learning?</h2>

    <p>
      Before moving on, consider the learning strategy
      behind this activity.
    </p>

    <div class="flashcard-scene">
  <button
    type="button"
    class="strategy-flashcard"
    aria-pressed="false"
    aria-label="Reveal the learning strategy"
  >
    <span class="flashcard-inner">

      <!-- FRONT -->
      <span class="flashcard-face flashcard-front">
        <span class="flashcard-label">REFLECT</span>

        <span class="flashcard-question">
          Why did we begin by asking you to share
          your existing ideas about high expectations
          and high structure?
        </span>

        <span class="flashcard-hint">
          Click to flip the card.
        </span>
      </span>

      <!-- BACK -->
      <span class="flashcard-face flashcard-back">
        <span class="flashcard-label">LEARNING STRATEGY</span>

        <strong>Activating Prior Knowledge</strong>

        <span>
          Inviting learners to recall and share what they
          already know makes their existing ideas visible
          and creates a foundation for new learning. Recall also strengthens neural connections.
        </span>

        <span class="flashcard-application">
          <strong>Apply it in your teaching:</strong>
          Stop Reviews, Start Recalls.
          Begin a new topic with a brief prediction,
          question, or concept-sharing activity.
          Revisit students' initial responses later
          to make changes in their thinking visible.
        </span>

        <span class="flashcard-hint">
          Click to flip back.
        </span>
      </span>

       </span>
  </button>
    </div> <!-- End of flashcard-scene -->

  </section> <!-- End of strategy-reflection -->
`
  },

  // PAGE 2
  {
    id: 2,
    type: "learn",
    label: "Learning Moment",
    title: "An Interactive Experience",

    content: `
      <div class="graph-activity">
        <svg
          id="drawing-puzzle"
          viewBox="0 0 400 350"
          role="group"
          aria-label="Interactive geometric drawing"
        >
          <g class="graph-edges">
            <line x1="100" y1="160" x2="300" y2="160"/>
            <line x1="100" y1="160" x2="100" y2="300"/>
            <line x1="300" y1="160" x2="300" y2="300"/>
            <line x1="100" y1="300" x2="300" y2="300"/>
            <line x1="100" y1="160" x2="200" y2="60"/>
            <line x1="300" y1="160" x2="200" y2="60"/>
          </g>

          <g class="graph-vertices">
            <circle cx="100" cy="160" r="12"/>
            <circle cx="300" cy="160" r="12"/>
            <circle cx="100" cy="300" r="12"/>
            <circle cx="300" cy="300" r="12"/>
            <circle cx="200" cy="60" r="12"/>
          </g>
        </svg>
      </div>
    `
  },

  // PAGE 3
  {
    id: 3,
    type: "zoom",
    label: "Zoom Out",
    title: "What Just Happened?",

    content: `
      <div class="reflection-card">

        <h2>Let's reflect.</h2>

        <p>
          You were given an interactive element.
        </p>

        <p>
          But were you given a meaningful learning experience?
        </p>

        <label for="reflection-1">
          <strong>
            What were you supposed to learn from the previous activity?
          </strong>
        </label>

        <textarea
          id="reflection-1"
          rows="4"
          placeholder="Your thoughts..."
        ></textarea>

        <p class="reflection-prompt">
          What information or guidance might have helped?
        </p>

      </div>

      <section class="strategy-reflection">

  <h2>Zoom Out: What Did We Just Learn About Learning?</h2>

  <p>
    Before moving on, consider what made the previous
    activity an interaction rather than a meaningful
    learning experience.
  </p>

  <div class="flashcard-scene">

    <button
      type="button"
      class="strategy-flashcard"
      aria-pressed="false"
      aria-label="Reveal the learning strategy"
    >

      <span class="flashcard-inner">

        <!-- FRONT -->
        <span class="flashcard-face flashcard-front">

          <span class="flashcard-label">REFLECT</span>

          <span class="flashcard-question">
            Does making an activity interactive
            necessarily make it a meaningful
            learning experience?
          </span>

          <span class="flashcard-hint">
            Click to flip the card.
          </span>

        </span>

        <!-- BACK -->
        <span class="flashcard-face flashcard-back">

          <span class="flashcard-label">
            LEARNING STRATEGY
          </span>

          <strong>Interactivity ≠ Learning</strong>

          <span>
            Interaction alone does not establish a learning goal.
            Meaningful learning activities require intentional
            design: a clear purpose, appropriate guidance,
            and opportunities to interpret the experience.
          </span>

          <span class="flashcard-application">

            <strong>Apply it in your teaching:</strong>

            Before adding an interactive element to a course,
            identify what students should learn from it.
            Provide a clear task and an opportunity to
            reflect on what the interaction revealed.

          </span>

          <span class="flashcard-hint">
            Click to flip back.
          </span>

        </span>

      </span>

    </button>

  </div>

</section>
    `
  },

  {
  id: 4,
  type: "learn",
  label: "Learning Moment",
  title: "An Interactive Experience: Now with Structure",

  content: `
    <p>
      Consider the network below. Each line represents a connection
      between two points.
    </p>

    <div class="activity-card">
      <h2>Your Challenge</h2>

      <p>
  <strong>Your Challenge:</strong>
  Can you travel along every connection exactly once,
  without retracing any connection?
</p>

<ol>
  <li>
    <strong>Choose a starting point.</strong>
    Click any letter to begin.
  </li>
  <li>
    <strong>Make your first move.</strong>
    Click a connected letter to travel along the line between them.
  </li>
  <li>
    <strong>Continue your route.</strong>
    Click connected letters until you have travelled along every connection.
  </li>
  <li>
    <strong>Remember:</strong>
    You may visit the same letter more than once,
    but you cannot travel along the same line twice.
  </li>
  <li>
    <strong>Watch for crossings:</strong>
    Lines that cross without a marked point are not connected
    at that crossing.
  </li>
</ol>

<p>
  <strong>Your goal:</strong>
  Find a route that uses every connection exactly once.
</p>
    </div>

    <div class="graph-activity network-activity">
      <svg
        id="network-puzzle"
        viewBox="0 0 700 480"
        role="group"
        aria-label="Interactive network puzzle with twelve points"
      ></svg>
    </div>

    <div class="network-status" role="status" aria-live="polite">
      <p id="network-message">
        Select any point to begin.
      </p>

      <p id="network-progress">
        Connections travelled: 0 / 22
      </p>
    </div>

    <div class="network-controls">
      <button type="button" id="network-undo" class="secondary">
        Undo
      </button>

      <button type="button" id="network-reset" class="secondary">
        Reset
      </button>

      <button type="button" id="network-hint">
        Hint
      </button>
    </div>

    <p id="network-hint-text" class="network-hint" hidden></p>
       <section class="strategy-reflection">

  <h2>Zoom Out: What Did We Just Learn About Learning?</h2>

  <p>
    Think about how this challenge differed from
    the earlier interactive experience.
  </p>

  <div class="flashcard-scene">

    <button
      type="button"
      class="strategy-flashcard"
      aria-pressed="false"
      aria-label="Reveal the learning strategy"
    >

      <span class="flashcard-inner">

        <!-- FRONT -->
        <span class="flashcard-face flashcard-front">

          <span class="flashcard-label">REFLECT</span>

          <span class="flashcard-question">
            What helped you approach this challenging task,
            even before you knew how to solve it?
          </span>

          <span class="flashcard-hint">
            Click to flip the card.
          </span>

        </span>

        <!-- BACK -->
        <span class="flashcard-face flashcard-back">

          <span class="flashcard-label">
            LEARNING STRATEGY
          </span>

          <strong>High Expectations, High Structure</strong>

          <span>
            The task remained intellectually challenging,
            but clear instructions, a defined goal,
            progress indicators, and opportunities for
            feedback helped make the challenge manageable.
          </span>

          <span class="flashcard-application">

            <strong>Apply it in your teaching:</strong>

            Keep the intellectual challenge high while
            providing clear expectations, purposeful steps,
            and timely feedback. Structure should support
            students' thinking, not replace it. 
            Structure can be made less or more visible 
            depending on your audience and their background.

          </span>

          <span class="flashcard-hint">
            Click to flip back.
          </span>

        </span>

      </span>

    </button>

  </div>

</section>
  `
},

  {
  id: 5,
  type: "learn",
  label: "Learning Moment 3",
  title: "Learning the Language of Graphs",

  content: `
    <p class="intro-text">
      Before exploring how to solve the network challenge,
      let's learn a few basic ideas from graph theory.
    </p>

    <p>
      A graph is a mathematical model of connections.
      Its language helps us describe and analyze networks.
    </p>

    <div class="definition-grid">

      <!-- GRAPH -->
      <div class="definition-card">
        <h2>Graph</h2>
        <p>
          A collection of <strong>vertices</strong>
          and <strong>edges</strong> connecting them.
        </p>

        <svg viewBox="0 0 240 150"
             role="img"
             aria-label="Graph with four vertices and four edges">
          <g class="definition-edges">
            <line x1="50" y1="40" x2="190" y2="40"/>
            <line x1="50" y1="40" x2="50" y2="115"/>
            <line x1="190" y1="40" x2="190" y2="115"/>
            <line x1="50" y1="115" x2="190" y2="115"/>
          </g>
          <g class="definition-vertices">
            <circle cx="50" cy="40" r="9"/>
            <circle cx="190" cy="40" r="9"/>
            <circle cx="50" cy="115" r="9"/>
            <circle cx="190" cy="115" r="9"/>
          </g>
        </svg>
      </div>

      <!-- VERTEX -->
      <div class="definition-card">
        <h2>Vertex</h2>
        <p>
          A <strong>point</strong> in a graph.
          The plural is <em>vertices</em>.
        </p>

        <svg viewBox="0 0 240 150"
             role="img"
             aria-label="Graph with one vertex highlighted">
          <g class="definition-edges">
            <line x1="50" y1="40" x2="190" y2="40"/>
            <line x1="50" y1="40" x2="120" y2="115"/>
            <line x1="190" y1="40" x2="120" y2="115"/>
          </g>
          <g class="definition-vertices">
            <circle cx="50" cy="40" r="9"/>
            <circle cx="190" cy="40" r="9"/>
            <circle cx="120" cy="115" r="12"
                    class="definition-highlight"/>
          </g>
        </svg>
      </div>

      <!-- EDGE -->
      <div class="definition-card">
        <h2>Edge</h2>
        <p>
          A <strong>connection</strong> between
          two vertices.
        </p>

        <svg viewBox="0 0 240 150"
             role="img"
             aria-label="Graph with one edge highlighted">
          <g class="definition-edges">
            <line x1="50" y1="40" x2="190" y2="40"/>
            <line x1="50" y1="40" x2="120" y2="115"/>
            <line x1="190" y1="40" x2="120" y2="115"
                  class="definition-highlight-edge"/>
          </g>
          <g class="definition-vertices">
            <circle cx="50" cy="40" r="9"/>
            <circle cx="190" cy="40" r="9"/>
            <circle cx="120" cy="115" r="9"/>
          </g>
        </svg>
      </div>

      <!-- DEGREE -->
      <div class="definition-card">
        <h2>Degree</h2>
        <p>
          The <strong>number of edges</strong>
          meeting at a vertex.
        </p>

        <svg viewBox="0 0 240 150"
             role="img"
             aria-label="Central vertex of degree three">
          <g class="definition-edges">
            <line x1="120" y1="75" x2="45" y2="30"/>
            <line x1="120" y1="75" x2="195" y2="30"/>
            <line x1="120" y1="75" x2="120" y2="130"/>
          </g>
          <g class="definition-vertices">
            <circle cx="45" cy="30" r="9"/>
            <circle cx="195" cy="30" r="9"/>
            <circle cx="120" cy="130" r="9"/>
            <circle cx="120" cy="75" r="12"
                    class="definition-highlight"/>
          </g>
          <text x="143" y="80" class="definition-svg-label">
            Degree 3
          </text>
        </svg>
      </div>

      <!-- WALK -->
      <div class="definition-card">
        <h2>Walk</h2>
        <p>
          A sequence of connected vertices.
          Vertices and edges may be repeated.
        </p>

        <svg viewBox="0 0 240 150"
             role="img"
             aria-label="Triangle graph showing walk A to B to C to A to B">
          <g class="definition-edges">
            <line x1="50" y1="115" x2="120" y2="30"/>
            <line x1="120" y1="30" x2="190" y2="115"/>
            <line x1="190" y1="115" x2="50" y2="115"/>
          </g>
          <g class="definition-vertices">
            <circle cx="50" cy="115" r="9"/>
            <circle cx="120" cy="30" r="9"/>
            <circle cx="190" cy="115" r="9"/>
          </g>
          <g class="definition-svg-label">
            <text x="33" y="133">A</text>
            <text x="116" y="17">B</text>
            <text x="198" y="133">C</text>
          </g>
          <text x="120" y="145"
                text-anchor="middle"
                class="definition-route-label">
            A → B → C → A → B
          </text>
        </svg>
      </div>

      <!-- TRAIL -->
      <div class="definition-card">
        <h2>Trail</h2>
        <p>
          A walk that <strong>does not repeat any edge</strong>.
          Vertices may be revisited.
        </p>

        <svg viewBox="0 0 240 150"
             role="img"
             aria-label="Triangle graph showing trail A to B to C to A">
          <g class="definition-edges">
            <line x1="50" y1="115" x2="120" y2="30"/>
            <line x1="120" y1="30" x2="190" y2="115"/>
            <line x1="190" y1="115" x2="50" y2="115"/>
          </g>
          <g class="definition-vertices">
            <circle cx="50" cy="115" r="9"/>
            <circle cx="120" cy="30" r="9"/>
            <circle cx="190" cy="115" r="9"/>
          </g>
          <g class="definition-svg-label">
            <text x="33" y="133">A</text>
            <text x="116" y="17">B</text>
            <text x="198" y="133">C</text>
          </g>
          <text x="120" y="145"
                text-anchor="middle"
                class="definition-route-label">
            A → B → C → A
          </text>
        </svg>
      </div>

    </div>

        <div class="activity-card">
      <h3>Think Back to the Challenge</h3>
      <p>
        Which of these concepts describes the kind
        of route you were trying to find on the previous page?
      </p>
      <p>
        Keep your answer in mind as you move to
        the matching activity.
      </p>
    </div>

    <!-- LEARNING STRATEGY FLASHCARD -->

    <section class="strategy-reflection">

      <h2>Zoom Out: What Did We Just Learn About Learning?</h2>

      <p>
        Think about how the illustrations helped you
        make sense of the graph theory definitions.
      </p>

      <div class="flashcard-scene">

        <button
          type="button"
          class="strategy-flashcard"
          aria-pressed="false"
          aria-label="Reveal the learning strategy"
        >

          <span class="flashcard-inner">

            <!-- FRONT -->
            <span class="flashcard-face flashcard-front">

              <span class="flashcard-label">REFLECT</span>

              <span class="flashcard-question">
                How might sketching or scribbling while
                listening or reading help you learn
                something new?
              </span>

              <span class="flashcard-hint">
                Click to flip the card.
              </span>

            </span>

            <!-- BACK -->
            <span class="flashcard-face flashcard-back">

              <span class="flashcard-label">
                LEARNING STRATEGY
              </span>

              <strong>Visual Learning & Active Processing</strong>

              <span>
                Combining words with meaningful visuals
                can support comprehension and recall.
                Sketching relationships, annotating diagrams,
                and creating simple visual notes encourage
                learners to actively process information.
              </span>

              <span class="flashcard-application">

                <strong>Apply it in your teaching:</strong>

                Encourage students to sketch relationships, annotate diagrams, 
                or create simple visual representations while listening or reading.
                The goal is not artistic quality, but
                making thinking visible.

              </span>

              <span class="flashcard-hint">
                Click to flip back.
              </span>

            </span>

          </span>

        </button>

      </div>

    </section>
  `
},

  {
  id: 6,
  type: "learn",
  label: "Your Turn",
  title: "Near Transfer: Apply What You've Learned",

  content: `

    <p class="intro-text">
      You've explored six important concepts from graph theory.
      Now it's your turn to use them.
    </p>

    <p>
      Complete two short activities. You can check your answers,
      learn from the feedback, and try again.
    </p>

    <!-- =====================================
         YOUR TURN 1: MATCHING
         ===================================== -->

    <section class="activity-card near-transfer-activity">

      <span class="activity-eyebrow">YOUR TURN 1</span>

  <h2>Match the Concepts</h2>

  <p>
    Drag each definition card to the correct graph theory term.
    You can also select a card and then select its destination.
  </p>

  <div class="sorting-layout">

    <!-- LEFT: DEFINITIONS -->

    <div class="sorting-column">

      <h3>Definitions</h3>

      <div
        id="definition-bank"
        class="sorting-bank"
        aria-label="Definition cards"
      ></div>

    </div>

    <!-- RIGHT: TERMS -->

    <div class="sorting-column">

      <h3>Graph Theory Terms</h3>

      <div
        id="term-buckets"
        class="sorting-buckets"
      ></div>

    </div>

  </div>

  <div class="near-transfer-controls">

    <button type="button" id="matching-check">
      Check My Matches
    </button>

    <button type="button" id="matching-reset" class="secondary">
      Try Again
    </button>

  </div>

  <p
    id="matching-feedback"
    class="near-transfer-feedback"
    role="status"
    aria-live="polite"
  ></p>

</section>


    <!-- =====================================
         YOUR TURN 2: GRAPH APPLICATION
         ===================================== -->

    <section class="activity-card near-transfer-activity">

      <span class="activity-eyebrow">YOUR TURN 2</span>

      <h2>Apply the Concepts</h2>

      <p>
  Study the graph below and use what you have learned
  to answer the five questions.
</p>

<p>
  Check your answers and use the feedback to revise them.
  Select <strong>Try Again</strong> for a new graph.
</p>

<div class="transfer-graph">

  <svg
    id="transfer-graph-svg"
    viewBox="0 0 420 290"
    role="img"
    aria-label="Graph for the near-transfer activity"
  ></svg>

</div>

<div id="transfer-questions" class="transfer-questions">

  <div class="transfer-question">
    <label for="transfer-vertices">
      <strong>1.</strong>
      How many vertices does the graph contain?
    </label>

    <input type="number" id="transfer-vertices" min="0">

    <p id="feedback-vertices" class="question-feedback"></p>
  </div>

  <div class="transfer-question">
    <label for="transfer-edges">
      <strong>2.</strong>
      How many edges does the graph contain?
    </label>

    <input type="number" id="transfer-edges" min="0">

    <p id="feedback-edges" class="question-feedback"></p>
  </div>

  <div class="transfer-question">
    <label for="transfer-degree">
      <strong>3.</strong>
      What is the degree of vertex
      <span id="transfer-degree-vertex">D</span>?
    </label>

    <input type="number" id="transfer-degree" min="0">

    <p id="feedback-degree" class="question-feedback"></p>
  </div>

  <div class="transfer-question">
    <label for="transfer-walk">
      <strong>4.</strong>
      Is
      <strong id="transfer-route-walk"></strong>
      a valid walk?
    </label>

    <select id="transfer-walk">
      <option value="">Choose an answer</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>

    <p id="feedback-walk" class="question-feedback"></p>
  </div>

  <div class="transfer-question">
    <label for="transfer-trail">
      <strong>5.</strong>
      Is
      <strong id="transfer-route-trail"></strong>
      a trail?
    </label>

    <select id="transfer-trail">
      <option value="">Choose an answer</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>

    <p id="feedback-trail" class="question-feedback"></p>
  </div>

</div>

<div class="near-transfer-controls">

  <button type="button" id="transfer-check">
    Check My Answers
  </button>

  <button type="button" id="transfer-reset" class="secondary">
    Try Again
  </button>

</div>

<p
  id="transfer-overall-feedback"
  class="near-transfer-feedback"
  role="status"
  aria-live="polite"
></p>

    </section>


    <!-- =====================================
         REFLECTION FLASHCARD
         ===================================== -->

    <section class="strategy-reflection">

      <h2>Zoom Out: What Did We Just Learn About Learning?</h2>

      <p>
        Think about why you were asked to apply these concepts
        immediately after learning them.
      </p>

      <div class="flashcard-scene">

        <button
          type="button"
          class="strategy-flashcard"
          aria-pressed="false"
          aria-label="Reveal the learning strategy"
        >

          <span class="flashcard-inner">

            <span class="flashcard-face flashcard-front">

              <span class="flashcard-label">REFLECT</span>

              <span class="flashcard-question">
                Why did we move from learning definitions
                to applying them to a new graph?
              </span>

              <span class="flashcard-hint">
                Click to flip the card.
              </span>

            </span>

            <span class="flashcard-face flashcard-back">

              <span class="flashcard-label">
                LEARNING STRATEGY
              </span>

              <strong>Near Transfer</strong>

              <span>
                Near transfer involves applying recently learned
                knowledge to a new but closely related situation.
                It helps learners move beyond recognizing information
                toward using it.
              </span>

              <span class="flashcard-application">

                <strong>Apply it in your teaching:</strong>

                After introducing a concept, provide a short
                application task that closely resembles the examples
                students have studied.

                Offer feedback and opportunities to revise
                before increasing the complexity.

              </span>

              <span class="flashcard-hint">
                Click to flip back.
              </span>

            </span>

          </span>

        </button>

      </div>

    </section>

  `
},

  {
  id: 7,
  type: "learn",
  label: "Explore",
  title: "Cycles and Hamiltonian Cycles",

  content: `

    <section class="learning-intro">

      <h2>Why Do We Care About Graphs?</h2>

      <p>
        Imagine you're planning a delivery route.
        A driver must leave a distribution centre,
        visit every delivery location, and return
        to the distribution centre.
      </p>

      <p>
        Ideally, the driver would visit each location
        only once.
      </p>

      <div class="concept-highlight">
        <strong>The question:</strong>
        Can we find a route that visits every location
        exactly once before returning to where we started?
      </div>

      <p>
        Graph theory gives us a way to represent
        and investigate this problem.
      </p>

    </section>


    <!-- =====================================
         DEFINITIONS
         ===================================== -->

    <section class="concept-section">

      <h2>Two New Concepts</h2>

      <div class="concept-cards">

        <article class="concept-card">

          <h3>Cycle</h3>

          <p>
            A <strong>cycle</strong> is a closed trail
            that does not repeat any vertices,
            except that the starting and ending
            vertices are the same.
          </p>

        </article>

        <article class="concept-card">

          <h3>Hamiltonian Cycle</h3>

          <p>
            A <strong>Hamiltonian cycle</strong>
            is a cycle that visits every vertex
            of the graph exactly once before
            returning to its starting vertex.
          </p>

        </article>

      </div>

      <p class="concept-note">
        <strong>Important:</strong>
        A Hamiltonian cycle must visit every vertex,
        but it does not need to use every edge.
      </p>

    </section>


    <!-- =====================================
         INTERACTIVE DELIVERY CHALLENGE
         ===================================== -->

    <section class="activity-card delivery-activity">

      <span class="activity-eyebrow">YOUR CHALLENGE</span>

      <h2>Plan the Delivery Route</h2>

      <p>
        The graph below represents a small delivery network.
        Each vertex is a location, and each edge represents
        an available direct connection.
      </p>

      <p>
        <strong>Your task:</strong>
        Start at the distribution centre
        <strong>A</strong>, visit every other location
        exactly once, and return to A.
      </p>

      <div class="delivery-layout">

        <div class="delivery-graph-panel">

          <svg
            id="delivery-graph"
            viewBox="0 0 420 320"
            role="group"
            aria-label="Interactive delivery network with six locations"
          ></svg>

        </div>

        <div class="delivery-status-panel">

          <h3>Your Route</h3>

          <p
            id="delivery-route"
            class="delivery-route"
            aria-live="polite"
          >
            A
          </p>

          <p id="delivery-progress">
            Locations visited: 1 of 6
          </p>

          <p
            id="delivery-feedback"
            class="delivery-feedback"
            role="status"
            aria-live="polite"
          >
            Select a location connected to A.
          </p>

          <div class="delivery-controls">

            <button type="button" id="delivery-undo">
              Undo
            </button>

            <button
              type="button"
              id="delivery-reset"
              class="secondary"
            >
              Try Again
            </button>

          </div>

        </div>

      </div>

    </section>


    <!-- =====================================
         REAL-WORLD CONNECTION
         ===================================== -->

    <section class="concept-section">

      <h2>From Graphs to Real-World Decisions</h2>

      <p>
        A Hamiltonian cycle tells us whether
        a route exists that visits every location
        exactly once and returns to the start.
      </p>

      <p>
        But what if some roads are longer than others?
        Which route would minimize the total distance?
      </p>

      <p>
        This leads to a related optimization problem:
        the <strong>Travelling Salesperson Problem</strong>.
      </p>

      <div class="concept-highlight">
        Finding a Hamiltonian cycle is about
        <strong>whether a suitable route exists</strong>.
        Finding the shortest such route introduces
        an additional optimization challenge.
      </div>

    </section>


    <!-- =====================================
         REFLECTION FLASHCARD
         ===================================== -->

    <section class="strategy-reflection">

      <h2>Zoom Out: What Did We Just Learn About Learning?</h2>

      <p>
        Think about why we began with a delivery problem
        before introducing the mathematical definitions.
      </p>

      <div class="flashcard-scene">

        <button
          type="button"
          class="strategy-flashcard"
          aria-pressed="false"
          aria-label="Reveal the learning strategy"
        >

          <span class="flashcard-inner">

            <span class="flashcard-face flashcard-front">

              <span class="flashcard-label">REFLECT</span>

              <span class="flashcard-question">
                Why might introducing a real-world problem
                help students learn an abstract concept?
              </span>

              <span class="flashcard-hint">
                Click to flip the card.
              </span>

            </span>

            <span class="flashcard-face flashcard-back">

              <span class="flashcard-label">
                LEARNING STRATEGY
              </span>

              <strong>Authentic Contexts</strong>

              <span>
                Meaningful applications can help learners
                recognize why a concept matters and
                when it might be useful.
              </span>

              <span class="flashcard-application">

                <strong>Apply it in your teaching:</strong>

                Introduce a realistic problem that creates
                a need for the concept. Then return to that
                problem after students have learned
                the relevant mathematics.

              </span>

              <span class="flashcard-hint">
                Click to flip back.
              </span>

            </span>

          </span>

        </button>

      </div>

    </section>

  `
},

  {
    id: 8,
    type: "learn",
    label: "Your Turn",
    title: "Predict Before Drawing",
    content: `<p>Coming soon: Applying the one-stroke drawing principle.</p>`
  },

  {
    id: 9,
    type: "zoom",
    label: "Zoom Out 3",
    title: "The Power of Scaffolding",
    content: `<p>Coming soon: Guided practice, feedback, and fading support.</p>`
  },

  {
    id: 10,
    type: "learn",
    label: "Learning Moment 4",
    title: "Beyond the Puzzle",
    content: `<p>Coming soon: Graph theory and street networks.</p>`
  },

  {
    id: 11,
    type: "zoom",
    label: "Zoom Out for 5",
    title: "Connecting the Ideas",
    content: `<p>Coming soon: Connecting the learning principles.</p>`
  },

  {
    id: 12,
    type: "zoom",
    label: "The Big Picture",
    title: "High Expectations with High Structure",
    content: `<p>Coming soon: Revisiting our opening reflections.</p>`
  }

];
