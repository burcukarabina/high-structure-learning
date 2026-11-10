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

      <div class="activity-card">
        <h2>What do these ideas mean to you?</h2>

        <p>
          <strong>High Expectations:</strong>
          What comes to mind?
        </p>

        <p>
          <strong>High Structure:</strong>
          What comes to mind?
        </p>

        <p>
          Submit a word or short phrase for each question
          using the activity below.
        </p>
      </div>

      <div class="vevox-container">
        <iframe
          src="https://vevox.app/#/m/451727944"
          title="Vevox live word cloud activity"
          allow="fullscreen">
        </iframe>
      </div>
    `
  },

  // PAGE 2
  {
    id: 2,
    type: "learn",
    label: "Learning Moment 1",
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
    label: "Zoom Out 1",
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

      <div class="activity-card">
        <h3>Interactivity ≠ Learning</h3>

        <p>
          An interactive element can invite participation,
          but interaction alone does not establish a learning goal.
        </p>

        <p>
          Meaningful learning activities need intentional design:
          a clear purpose, appropriate guidance, and opportunities
          for learners to interpret their experience.
        </p>
      </div>
    `
  },

  // REMAINING PAGES

  {
    id: 4,
    type: "learn",
    label: "Learning Moment 2",
    title: "Look Again",
    content: `<p>Coming soon: Discovering vertices and edges.</p>`
  },

  {
    id: 5,
    type: "learn",
    label: "Your Turn",
    title: "Discovering Structure",
    content: `<p>Coming soon: Identifying the important features of a graph.</p>`
  },

  {
    id: 6,
    type: "zoom",
    label: "Zoom Out 2",
    title: "How Experts See Problems",
    content: `<p>Coming soon: Expert–novice thinking and cognitive apprenticeship.</p>`
  },

  {
    id: 7,
    type: "learn",
    label: "Learning Moment 3",
    title: "Discover the Pattern",
    content: `<p>Coming soon: Odd and even vertices.</p>`
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
