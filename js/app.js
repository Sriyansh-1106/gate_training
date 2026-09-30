/**
 * GATE CSE 2027 Training Platform - Core Application Controller
 * Handles Navigation, Views Rendering, Interactivity, Math Rendering, and State
 */

import { SYLLABUS_DATA, TOTAL_SYLLABUS_HOURS, TOTAL_TOPICS_COUNT } from "./data/syllabus.js";
import { LESSONS_DATABASE } from "./data/lessons.js";
import { PYQ_DATABASE } from "./data/pyqs.js";
import { FORMULA_DATABASE } from "./data/formulas.js";
import { MOCK_TESTS_DATABASE } from "./data/mockTests.js";
import { Storage } from "./modules/storage.js";
import { Visualizers } from "./modules/visualizers.js";
import { ExamEngine } from "./modules/examEngine.js";
import { TutorEngine, GeminiKeyManager, validateGeminiKey } from "./modules/tutor.js";
import { Analytics } from "./modules/analytics.js";
import { AdminStudio } from "./modules/admin.js";

// Global Router and UI State
let currentTab = "dashboard";
let currentLessonTopicId = "em-discrete-logic";
let currentLessonStep = 1;
let currentLessonLevel = 0;

export function initApp() {
  renderSidebar();
  renderTopNav();
  setupGlobalEvents();
  updateAiStatusUI();
  navigateTo("dashboard");
}

export function renderFormattedContent(text) {
  if (!text) return "";
  if (window.marked && typeof window.marked.parse === "function") {
    try {
      return window.marked.parse(String(text));
    } catch (e) {
      console.warn("Marked parse error:", e);
    }
  }
  let html = String(text)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\n\n/g, "<p></p>")
    .replace(/\n/g, "<br>");
  return html;
}

function updateAiStatusUI() {
  const hasKey = GeminiKeyManager.hasKey();
  const activeModel = GeminiKeyManager.getActiveModel();

  const topPill = document.getElementById("top-ai-status-pill");
  const topText = document.getElementById("top-ai-status-text");
  if (topPill && topText) {
    if (hasKey) {
      topPill.className = "ai-status-pill active";
      topText.textContent = `✨ AI Active (${activeModel})`;
      topPill.title = `Gemini AI Connected (${activeModel}). Click to configure.`;
    } else {
      topPill.className = "ai-status-pill offline";
      topText.textContent = "⚡ Offline Mode";
      topPill.title = "Click to connect Gemini API Key";
    }
  }

  const tutorBadge = document.getElementById("tutor-model-badge");
  if (tutorBadge) {
    if (hasKey) {
      tutorBadge.className = "tutor-model-badge active";
      tutorBadge.textContent = `AI: ${activeModel}`;
    } else {
      tutorBadge.className = "tutor-model-badge offline";
      tutorBadge.textContent = "Offline Mode";
    }
  }
}

export function openApiKeyModal() {
  const modal = document.getElementById("api-key-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.style.display = "flex";

  const keyInput = document.getElementById("gemini-api-key-input");
  const currentKey = GeminiKeyManager.getKey();
  if (keyInput) {
    keyInput.value = currentKey;
    keyInput.type = "password";
  }

  const feedback = document.getElementById("api-key-status-msg");
  if (feedback) {
    feedback.className = "api-status-feedback";
    feedback.style.display = "none";
    feedback.textContent = "";
  }
}

export function closeApiKeyModal() {
  const modal = document.getElementById("api-key-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.style.display = "none";
}

async function handleSaveApiKey() {
  const keyInput = document.getElementById("gemini-api-key-input");
  const saveBtn = document.getElementById("save-api-key-btn");
  const spinner = document.getElementById("save-key-spinner");
  const btnText = document.getElementById("save-key-text");
  const feedback = document.getElementById("api-key-status-msg");

  const key = keyInput ? keyInput.value.trim() : "";
  if (!key) {
    if (feedback) {
      feedback.className = "api-status-feedback error";
      feedback.style.display = "block";
      feedback.textContent = "Please enter a valid Gemini API key.";
    }
    return;
  }

  if (saveBtn) saveBtn.disabled = true;
  if (spinner) spinner.style.display = "inline-block";
  if (btnText) btnText.textContent = "Validating...";

  try {
    const isValid = await validateGeminiKey(key);
    if (isValid) {
      GeminiKeyManager.saveKey(key);
      const activeModel = GeminiKeyManager.getActiveModel();
      updateAiStatusUI();
      if (feedback) {
        feedback.className = "api-status-feedback success";
        feedback.style.display = "block";
        feedback.textContent = `✅ Successfully connected to Gemini! Active model: ${activeModel}`;
      }
      setTimeout(() => {
        closeApiKeyModal();
      }, 1200);
    } else {
      if (feedback) {
        feedback.className = "api-status-feedback error";
        feedback.style.display = "block";
        feedback.textContent = "❌ Invalid API key or model unreachable. Please verify your Google AI Studio key.";
      }
    }
  } catch (err) {
    if (feedback) {
      feedback.className = "api-status-feedback error";
      feedback.style.display = "block";
      feedback.textContent = `❌ Error: ${err.message}`;
    }
  } finally {
    if (saveBtn) saveBtn.disabled = false;
    if (spinner) spinner.style.display = "none";
    if (btnText) btnText.textContent = "Validate & Save";
  }
}

function handleClearApiKey() {
  GeminiKeyManager.clearKey();
  const keyInput = document.getElementById("gemini-api-key-input");
  if (keyInput) keyInput.value = "";
  const feedback = document.getElementById("api-key-status-msg");
  if (feedback) {
    feedback.className = "api-status-feedback success";
    feedback.style.display = "block";
    feedback.textContent = "API key removed. Running in offline knowledge base mode.";
  }
  updateAiStatusUI();
  setTimeout(() => {
    closeApiKeyModal();
  }, 900);
}

function showTutorTyping() {
  const container = document.getElementById("tutor-messages-body");
  if (!container) return null;
  const existing = document.getElementById("tutor-typing-indicator");
  if (existing) return existing;
  const typingDiv = document.createElement("div");
  typingDiv.className = "tutor-bubble bubble-tutor typing";
  typingDiv.id = "tutor-typing-indicator";
  typingDiv.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-label">Tutor is thinking...</span>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
  return typingDiv;
}

function removeTutorTyping() {
  const el = document.getElementById("tutor-typing-indicator");
  if (el) el.remove();
}

function appendTutorMessage(sender, content, meta = {}) {
  const container = document.getElementById("tutor-messages-body");
  if (!container) return;
  const msgDiv = document.createElement("div");
  msgDiv.className = `tutor-bubble bubble-${sender}`;

  if (sender === "user") {
    const raw = typeof content === "string" ? content : (content.text || "");
    msgDiv.textContent = raw;
  } else {
    const rawText = typeof content === "string" ? content : (content.text || "");
    const formatted = renderFormattedContent(rawText);
    const metaSource = (typeof content === "object" && content.source) || meta.source || (GeminiKeyManager.hasKey() ? "ai" : "offline");
    const metaModel = (typeof content === "object" && content.model) || meta.model || GeminiKeyManager.getActiveModel();

    let metaBadge = "";
    if (metaSource === "ai") {
      metaBadge = `<div class="bubble-meta meta-ai">✨ Powered by <strong>${metaModel}</strong></div>`;
    } else {
      metaBadge = `<div class="bubble-meta">⚡ Offline Knowledge Base</div>`;
    }
    msgDiv.innerHTML = formatted + metaBadge;
  }

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
  renderKaTeX(msgDiv);
}

function setupGlobalEvents() {
  window.router = (tabName, params) => navigateTo(tabName, params);
  window.openTopicLesson = (topicId, step = 1, level = 0) => {
    currentLessonTopicId = topicId;
    currentLessonStep = step;
    currentLessonLevel = level;
    navigateTo("learn");
  };

  window.openApiKeyModal = openApiKeyModal;
  window.closeApiKeyModal = closeApiKeyModal;

  const topPill = document.getElementById("top-ai-status-pill");
  if (topPill) topPill.onclick = openApiKeyModal;

  const tutorSettingsBtn = document.getElementById("tutor-settings-btn");
  if (tutorSettingsBtn) tutorSettingsBtn.onclick = openApiKeyModal;

  const closeKeyModal = document.getElementById("close-api-key-modal-btn");
  if (closeKeyModal) closeKeyModal.onclick = closeApiKeyModal;

  const cancelKeyBtn = document.getElementById("cancel-api-key-btn");
  if (cancelKeyBtn) cancelKeyBtn.onclick = closeApiKeyModal;

  const saveKeyBtn = document.getElementById("save-api-key-btn");
  if (saveKeyBtn) saveKeyBtn.onclick = handleSaveApiKey;

  const clearKeyBtn = document.getElementById("clear-api-key-btn");
  if (clearKeyBtn) clearKeyBtn.onclick = handleClearApiKey;

  const toggleKeyVisibilityBtn = document.getElementById("toggle-key-visibility-btn");
  if (toggleKeyVisibilityBtn) {
    toggleKeyVisibilityBtn.onclick = () => {
      const keyInput = document.getElementById("gemini-api-key-input");
      if (keyInput) {
        keyInput.type = keyInput.type === "password" ? "text" : "password";
      }
    };
  }

  // Close AI Tutor Modal
  const closeTutor = document.getElementById("close-tutor-btn");
  if (closeTutor) {
    closeTutor.onclick = () => {
      document.getElementById("ai-tutor-drawer").classList.toggle("tutor-open");
    };
  }

  const tutorToggle = document.getElementById("tutor-toggle-fab");
  if (tutorToggle) {
    tutorToggle.onclick = () => {
      document.getElementById("ai-tutor-drawer").classList.toggle("tutor-open");
    };
  }

  // Setup Tutor Send Button
  const tutorSend = document.getElementById("tutor-send-btn");
  const tutorInput = document.getElementById("tutor-chat-input");
  if (tutorSend && tutorInput) {
    const handleSend = async () => {
      const msg = tutorInput.value.trim();
      if (!msg) return;
      appendTutorMessage("user", msg);
      tutorInput.value = "";
      tutorInput.disabled = true;
      tutorSend.disabled = true;
      showTutorTyping();

      try {
        const reply = await TutorEngine.generateResponse(msg, currentLessonLevel, currentLessonTopicId);
        removeTutorTyping();
        appendTutorMessage("tutor", reply);
      } catch (err) {
        removeTutorTyping();
        appendTutorMessage("tutor", {
          text: `⚠️ **Connection Error:** Could not reach the AI tutor (${err.message}). Falling back to offline knowledge base.`,
          source: "offline"
        });
      } finally {
        tutorInput.disabled = false;
        tutorSend.disabled = false;
        tutorInput.focus();
      }
    };

    tutorSend.onclick = handleSend;
    tutorInput.onkeydown = (e) => {
      if (e.key === "Enter") handleSend();
    };
  }

  // Tutor Prompt Chips
  document.querySelectorAll(".tutor-chip").forEach(chip => {
    chip.onclick = () => {
      const prompt = chip.getAttribute("data-prompt");
      if (prompt && tutorInput) {
        tutorInput.value = prompt;
        document.getElementById("tutor-send-btn")?.click();
      }
    };
  });
}

function renderSidebar() {
  const navList = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "roadmap", label: "Roadmap 2027", icon: "🗺️" },
    { id: "learn", label: "Learn Concepts", icon: "📚" },
    { id: "pyqs", label: "GATE PYQs", icon: "🎯" },
    { id: "mockTests", label: "Mock Tests", icon: "🧪" },
    { id: "revision", label: "Revision System", icon: "🔄" },
    { id: "errorBook", label: "Error Notebook", icon: "📓" },
    { id: "formulaBook", label: "Formula Book", icon: "📖" },
    { id: "analytics", label: "Analytics", icon: "📈" },
    { id: "admin", label: "Content Studio", icon: "⚙️" }
  ];

  const sidebarEl = document.getElementById("sidebar-nav-list");
  if (!sidebarEl) return;
  sidebarEl.innerHTML = navList.map(item => `
    <li class="nav-item ${item.id === currentTab ? 'active' : ''}" data-nav="${item.id}">
      <span class="nav-icon">${item.icon}</span>
      <span class="nav-text">${item.label}</span>
    </li>
  `).join('');

  sidebarEl.querySelectorAll(".nav-item").forEach(item => {
    item.onclick = () => {
      const tab = item.getAttribute("data-nav");
      navigateTo(tab);
    };
  });
}

function renderTopNav() {
  const metrics = Analytics.getCountdownMetrics();
  const banner = document.getElementById("top-countdown-banner");
  if (banner) {
    banner.innerHTML = `
      <div class="countdown-badge">
        <span class="fire-icon">🔥</span>
        <strong>GATE CSE 2027 — ${metrics.daysRemaining} DAYS REMAINING</strong>
        <span class="badge-subtext">(Prep Day ${metrics.daysSinceStart} | Target: ${metrics.targetDateFormatted})</span>
      </div>
    `;
  }
}

function navigateTo(tabName, params = {}) {
  currentTab = tabName;
  document.querySelectorAll(".nav-item").forEach(el => {
    el.classList.toggle("active", el.getAttribute("data-nav") === tabName);
  });

  const appContent = document.getElementById("app-content");
  if (!appContent) return;

  switch (tabName) {
    case "dashboard":
      renderDashboardView(appContent);
      break;
    case "roadmap":
      renderRoadmapView(appContent);
      break;
    case "learn":
      renderLearnView(appContent);
      break;
    case "pyqs":
      renderPyqsView(appContent, params);
      break;
    case "mockTests":
      renderMockTestsView(appContent);
      break;
    case "revision":
      renderRevisionView(appContent);
      break;
    case "errorBook":
      renderErrorBookView(appContent);
      break;
    case "formulaBook":
      renderFormulaBookView(appContent);
      break;
    case "analytics":
      renderAnalyticsView(appContent);
      break;
    case "admin":
      AdminStudio.render("app-content");
      break;
    default:
      renderDashboardView(appContent);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  renderKaTeX(appContent);
}

// -------------------------------------------------------------
// 1. DASHBOARD VIEW
// -------------------------------------------------------------
function renderDashboardView(container) {
  const countdown = Analytics.getCountdownMetrics();
  const perf = Analytics.getOverallPerformance();
  const nextAction = Analytics.getNextBestAction();

  container.innerHTML = `
    <!-- Level 0 Beginner Welcome Banner (Section 26) -->
    <div class="welcome-card-level0">
      <div class="welcome-header">
        <span class="welcome-badge">Level 0: Absolute Beginner Path</span>
        <span class="welcome-date">Preparation Started: October 1, 2026</span>
      </div>
      <h2>Welcome to GATE CSE 2027</h2>
      <p class="welcome-tagline">"You are starting from zero. That's okay. We'll build your preparation one concept at a time."</p>
      
      <div class="welcome-action-box">
        <div class="welcome-action-info">
          <strong>Day 1 Milestone</strong>
          <span>Start with: Engineering Mathematics → Discrete Mathematics → Propositional Logic</span>
        </div>
        <button class="btn btn-primary btn-large" onclick="window.openTopicLesson('em-discrete-logic', 1, 0)">
          🚀 START DAY 1
        </button>
      </div>
    </div>

    <!-- Countdown & Next Best Action Cards Grid -->
    <div class="grid-2-col">
      <!-- Target Countdown Card -->
      <div class="dash-card">
        <div class="dash-card-header">
          <h3>Exam Countdown</h3>
          <span class="badge badge-accent">GATE CSE 2027</span>
        </div>
        <div class="countdown-hero">
          <div class="countdown-big-num">${countdown.daysRemaining}</div>
          <div class="countdown-sub">Days Remaining Until February 2027</div>
        </div>
        <div class="countdown-footer-stats">
          <span>🗓️ Start Date: <strong>Oct 1, 2026</strong></span>
          <span>📍 Current Day: <strong>Day ${countdown.daysSinceStart}</strong></span>
        </div>
      </div>

      <!-- Next Best Action Card (Section 21) -->
      <div class="dash-card">
        <div class="dash-card-header">
          <h3>Next Best Action</h3>
          <span class="badge badge-success">${nextAction.badge}</span>
        </div>
        <div class="next-action-body">
          <h4 class="next-action-title">${nextAction.actionText}</h4>
          <p class="text-secondary">Based on GATE syllabus prerequisites, topic weighting, and your current learning level.</p>
          <div class="next-action-meta">
            <span>Prerequisites: <strong class="text-success">None (Level 0)</strong></span>
            <span>Est. Time: <strong>35 mins</strong></span>
          </div>
          <button class="btn btn-primary" onclick="window.openTopicLesson('${nextAction.topicId}', ${nextAction.step}, ${nextAction.level})">
            ▶️ START LEARNING
          </button>
        </div>
      </div>
    </div>

    <!-- Performance & Consistency Metrics Bar -->
    <div class="stats-row">
      <div class="stat-pill">
        <span class="stat-icon">🔥</span>
        <div>
          <div class="stat-val">${perf.currentStreak} Days</div>
          <div class="stat-lbl">Study Streak</div>
        </div>
      </div>
      <div class="stat-pill">
        <span class="stat-icon">📚</span>
        <div>
          <div class="stat-val">${perf.syllabusPercent}%</div>
          <div class="stat-lbl">Syllabus Covered</div>
        </div>
      </div>
      <div class="stat-pill">
        <span class="stat-icon">🎯</span>
        <div>
          <div class="stat-val">${perf.pyqAccuracy}%</div>
          <div class="stat-lbl">PYQ Accuracy</div>
        </div>
      </div>
      <div class="stat-pill">
        <span class="stat-icon">⏱️</span>
        <div>
          <div class="stat-val">${perf.studyHours}h</div>
          <div class="stat-lbl">Study Time</div>
        </div>
      </div>
    </div>

    <!-- Today's Study Plan & Daily Checkout (Section 14) -->
    <div class="dash-card">
      <div class="dash-card-header">
        <div>
          <h3>Today's Study Plan</h3>
          <p class="text-secondary">Target: 3–4 Hours of Deep Focused Preparation</p>
        </div>
        <span class="badge badge-accent">Daily Protocol</span>
      </div>

      <div class="daily-plan-tasks">
        <div class="plan-task-item done">
          <span class="task-check">✓</span>
          <div class="task-details">
            <strong>1. Concept Learning (Level 0 Intuition & Rules)</strong>
            <span>Discrete Mathematics: Propositions, Truth Values & Connectives</span>
          </div>
          <span class="badge badge-success">Completed</span>
        </div>

        <div class="plan-task-item active-task">
          <span class="task-check">▶</span>
          <div class="task-details">
            <strong>2. Interactive Practice & Worked Examples</strong>
            <span>Truth Table Construction & Implication Equivalences</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.openTopicLesson('em-discrete-logic', 3, 0)">Resume</button>
        </div>

        <div class="plan-task-item">
          <span class="task-check">○</span>
          <div class="task-details">
            <strong>3. GATE Authentic PYQs Drill</strong>
            <span>Solve 5 authentic GATE CSE questions on Logic & Tautologies</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.router('pyqs', { topicId: 'em-discrete-logic' })">Open PYQs</button>
        </div>

        <div class="plan-task-item">
          <span class="task-check">○</span>
          <div class="task-details">
            <strong>4. Daily Checkout & Spaced Revision</strong>
            <span>Review formulas, log mistakes to Error Notebook, and close Day 1</span>
          </div>
          <button class="btn btn-secondary btn-sm" onclick="window.router('revision')">Review</button>
        </div>
      </div>
    </div>

    <!-- 10 Subject Syllabus Overview Grid -->
    <div class="dash-card">
      <div class="dash-card-header">
        <h3>GATE CSE 2027 Subjects & Priority Map</h3>
        <span class="text-secondary">${TOTAL_TOPICS_COUNT} Topics across 10 Subjects (${TOTAL_SYLLABUS_HOURS} Total Hours)</span>
      </div>

      <div class="subjects-grid">
        ${SYLLABUS_DATA.map(sub => `
          <div class="subject-card" onclick="window.router('learn', { subjectId: '${sub.id}' })">
            <div class="sub-header">
              <span class="sub-tag" style="background-color: ${sub.color}22; color: ${sub.color};">${sub.weightageMarks}</span>
              <span class="sub-priority badge-${sub.priority.toLowerCase()}">${sub.priority}</span>
            </div>
            <h4 class="sub-title">${sub.name}</h4>
            <p class="sub-desc">${sub.description}</p>
            <div class="sub-footer">
              <span>${sub.topics.length} Topics</span>
              <span class="text-accent">Explore ➔</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 2. ROADMAP VIEW (Section 20)
// -------------------------------------------------------------
function renderRoadmapView(container) {
  const phases = [
    {
      phase: "Phase 1: Foundation & Absolute Basics",
      period: "October 1, 2026 – November 15, 2026",
      status: "In Progress (Active)",
      focus: "Discrete Mathematics, Digital Logic, C Programming & Pointers",
      description: "Build rock-solid intuition from Level 0 without rushing. Cover Truth tables, Set theory, Boolean minimization, and C memory models."
    },
    {
      phase: "Phase 2: Core Computer Science Systems",
      period: "November 16, 2026 – December 31, 2026",
      status: "Upcoming",
      focus: "Data Structures, Algorithms, Computer Architecture (COA), Operating Systems",
      description: "Master Trees, Graphs, Master Theorem, Cache mapping, CPU scheduling, and Virtual memory. Complete Level 1 & 2 topics."
    },
    {
      phase: "Phase 3: Theoretical Computer Science & Full Syllabus",
      period: "January 1, 2027 – January 15, 2027",
      status: "Upcoming",
      focus: "Theory of Computation (TOC), Compiler Design, DBMS, Computer Networks",
      description: "DFA/NFA, Grammars, Parsing, Normalization, SQL, Sliding Window, and IP Subnetting. Achieve 100% syllabus coverage."
    },
    {
      phase: "Phase 4: High-Yield Authentic PYQs Mastery",
      period: "January 16, 2027 – January 25, 2027",
      status: "Upcoming",
      focus: "Topic Mocks, 10-Year GATE PYQs, Error Notebook Remediation",
      description: "Intense question solving under timed conditions. Resolve every mistake recorded in your Error Book."
    },
    {
      phase: "Phase 5: Full-Length Exam Simulation Series",
      period: "January 26, 2027 – February 3, 2027",
      status: "Upcoming",
      focus: "65-Question 180-Minute All-India Mock Tests with Virtual Calculator",
      description: "Practice exact 3-hour exam temperament. Train time allocation: 25 mins for Aptitude, 155 mins for CSE."
    },
    {
      phase: "Phase 6: Final Revision & Formula Drills",
      period: "February 4, 2027 – February 6, 2027",
      status: "Upcoming",
      focus: "Formula Book Drills, Short Notes, High-Yield Traps",
      description: "Final mental preparation and formula rapid recall right before the exam day."
    }
  ];

  container.innerHTML = `
    <div class="dash-card">
      <div class="dash-card-header">
        <div>
          <h2>GATE CSE 2027 Strategic Roadmap</h2>
          <p class="text-secondary">Structured preparation path from October 1, 2026 to GATE 2027 (February 2027)</p>
        </div>
        <span class="badge badge-accent">6-Phase Strategy</span>
      </div>

      <div class="timeline-container">
        ${phases.map((p, idx) => `
          <div class="timeline-card ${idx === 0 ? 'timeline-active' : ''}">
            <div class="timeline-marker">${idx + 1}</div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h3>${p.phase}</h3>
                <span class="badge ${idx === 0 ? 'badge-success' : 'badge-neutral'}">${p.status}</span>
              </div>
              <div class="timeline-period">📅 ${p.period}</div>
              <div class="timeline-focus"><strong>Core Focus:</strong> ${p.focus}</div>
              <p class="timeline-desc">${p.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// -------------------------------------------------------------
// 3. LEARN / TOPIC VIEW (Sections 4, 5, 6)
// -------------------------------------------------------------
function renderLearnView(container) {
  const lesson = LESSONS_DATABASE[currentLessonTopicId] || LESSONS_DATABASE["em-discrete-logic"];
  const levelData = lesson.levels[0]; // Level 0 beginner

  container.innerHTML = `
    <div class="lesson-layout">
      <!-- Left Subtopics & Subject Navigation -->
      <div class="lesson-sidebar">
        <h4>Syllabus Topics</h4>
        <div class="topic-picker-list">
          ${SYLLABUS_DATA.map(sub => `
            <div class="sub-group">
              <div class="sub-group-title">${sub.shortName}</div>
              ${sub.topics.map(top => `
                <div class="topic-picker-item ${top.id === currentLessonTopicId ? 'active' : ''}" 
                     onclick="window.openTopicLesson('${top.id}', 1, 0)">
                  <span>${top.title}</span>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Main Lesson Learning Panel -->
      <div class="lesson-main">
        <div class="lesson-header-card">
          <div class="lesson-breadcrumbs">
            <span>Learn</span> ➔ <span>${lesson.title}</span>
          </div>
          <h2>${lesson.title}</h2>
          <p class="text-secondary">${lesson.subtitle}</p>

          <!-- 4-Level Difficulty Bar (Section 4) -->
          <div class="level-selector-bar">
            <span class="level-lbl">Select Learning Level:</span>
            <button class="level-pill ${currentLessonLevel === 0 ? 'active' : ''}" onclick="window.setLevel(0)">Level 0: Absolute Beginner</button>
            <button class="level-pill ${currentLessonLevel === 1 ? 'active' : ''}" onclick="window.setLevel(1)">Level 1: Foundation</button>
            <button class="level-pill ${currentLessonLevel === 2 ? 'active' : ''}" onclick="window.setLevel(2)">Level 2: GATE Standard</button>
            <button class="level-pill ${currentLessonLevel === 3 ? 'active' : ''}" onclick="window.setLevel(3)">Level 3: Advanced GATE</button>
          </div>

          <!-- Progress Stepper (Steps 1 to 7) -->
          <div class="steps-stepper">
            ${[1, 2, 3, 4, 5, 6, 7].map(stepNum => `
              <div class="step-indicator ${stepNum === currentLessonStep ? 'step-current' : stepNum < currentLessonStep ? 'step-done' : ''}"
                   onclick="window.setStep(${stepNum})">
                <span class="step-num">${stepNum < currentLessonStep ? '✓' : stepNum}</span>
                <span class="step-text">Step ${stepNum}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Concept Body -->
        <div class="step-content-card" id="step-content-box">
          <!-- Step details injected below -->
        </div>

        <!-- Interactive Visualizers embedded when relevant (Section 6) -->
        <div id="lesson-visualizer-slot"></div>

        <!-- Navigation Controls between Steps -->
        <div class="step-footer-controls">
          <button class="btn btn-secondary" id="step-prev-btn">◀ Previous Step</button>
          <button class="btn btn-primary" id="step-next-btn">Next Step ▶</button>
        </div>
      </div>
    </div>
  `;

  window.setStep = (step) => {
    currentLessonStep = step;
    Storage.updateTopicProgress(currentLessonTopicId, step, currentLessonLevel);
    renderCurrentStep(levelData);
  };

  window.setLevel = (lvl) => {
    currentLessonLevel = lvl;
    renderCurrentStep(levelData);
  };

  renderCurrentStep(levelData);
}

function renderCurrentStep(levelData) {
  const container = document.getElementById("step-content-box");
  const vizSlot = document.getElementById("lesson-visualizer-slot");
  if (!container) return;

  const stepItem = levelData.steps.find(s => s.step === currentLessonStep) || levelData.steps[0];

  container.innerHTML = `
    <div class="step-header">
      <span class="badge badge-accent">Step ${stepItem.step} of 7</span>
      <h3>${stepItem.title}</h3>
    </div>
    <div class="step-body-text">
      ${stepItem.content ? renderFormattedContent(stepItem.content) : ''}
    </div>
  `;

  // Step 7: Quick Practice Quiz
  if (stepItem.quiz) {
    container.innerHTML += `
      <div class="quick-practice-box">
        <h4>🎯 Quick Concept Check (Score $\\ge 70\\%$ to unlock GATE PYQs)</h4>
        <div class="quiz-items-list">
          ${stepItem.quiz.map((q, qIdx) => `
            <div class="quiz-item-card" id="quiz-card-${q.id}">
              <div class="quiz-q-title"><strong>Q${qIdx + 1}:</strong> ${q.question}</div>
              <div class="quiz-options">
                ${q.options.map((opt, optIdx) => `
                  <button class="quiz-opt-btn" onclick="window.checkQuizAnswer('${q.id}', ${optIdx}, ${q.correctIndex}, '${encodeURIComponent(q.explanation)}')">
                    ${String.fromCharCode(65 + optIdx)}. ${opt}
                  </button>
                `).join('')}
              </div>
              <div class="quiz-feedback-box hidden" id="quiz-feedback-${q.id}"></div>
            </div>
          `).join('')}
        </div>

        <div class="unlock-pyq-banner">
          <button class="btn btn-success btn-large" onclick="window.router('pyqs', { topicId: currentLessonTopicId })">
            🔓 UNLOCK AUTHENTIC GATE PYQs ➔
          </button>
        </div>
      </div>
    `;
  }

  // Visualizer embedding based on topic
  if (vizSlot) {
    vizSlot.innerHTML = "";
    if (currentLessonTopicId === "algo-searching-sorting" && (currentLessonStep === 2 || currentLessonStep === 4)) {
      Visualizers.initSortingVisualizer("lesson-visualizer-slot");
    } else if (currentLessonTopicId === "pds-trees" && (currentLessonStep === 2 || currentLessonStep === 4)) {
      Visualizers.initBstVisualizer("lesson-visualizer-slot");
    } else if (currentLessonTopicId === "coa-memory-cache" && (currentLessonStep === 2 || currentLessonStep === 4)) {
      Visualizers.initCacheVisualizer("lesson-visualizer-slot");
    }
  }

  // Button handlers
  const prevBtn = document.getElementById("step-prev-btn");
  const nextBtn = document.getElementById("step-next-btn");
  if (prevBtn) {
    prevBtn.disabled = currentLessonStep === 1;
    prevBtn.onclick = () => window.setStep(currentLessonStep - 1);
  }
  if (nextBtn) {
    nextBtn.disabled = currentLessonStep === 7;
    nextBtn.onclick = () => window.setStep(currentLessonStep + 1);
  }

  // Quiz Checker
  window.checkQuizAnswer = (qId, selectedIdx, correctIdx, expEncoded) => {
    const card = document.getElementById(`quiz-card-${qId}`);
    const fb = document.getElementById(`quiz-feedback-${qId}`);
    if (!card || !fb) return;

    const explanation = decodeURIComponent(expEncoded);
    const buttons = card.querySelectorAll(".quiz-opt-btn");
    buttons.forEach((b, idx) => {
      b.disabled = true;
      if (idx === correctIdx) b.classList.add("quiz-opt-correct");
      if (idx === selectedIdx && selectedIdx !== correctIdx) b.classList.add("quiz-opt-wrong");
    });

    fb.classList.remove("hidden");
    if (selectedIdx === correctIdx) {
      fb.className = "quiz-feedback-box feedback-correct";
      fb.innerHTML = `✅ <strong>Correct!</strong> ${explanation}`;
    } else {
      fb.className = "quiz-feedback-box feedback-wrong";
      fb.innerHTML = `❌ <strong>Incorrect.</strong> ${explanation}`;
    }
    renderKaTeX(fb);
  };

  renderKaTeX(container);
}

// -------------------------------------------------------------
// 4. GATE PYQs VIEW (Sections 7, 8, 23)
// -------------------------------------------------------------
function renderPyqsView(container, params = {}) {
  let selectedSubject = params.subjectId || "all";
  let selectedYear = "all";
  let selectedType = "all";

  function filterAndRender() {
    let filtered = PYQ_DATABASE;
    if (selectedSubject !== "all") {
      filtered = filtered.filter(q => q.subjectId === selectedSubject);
    }
    if (selectedYear !== "all") {
      filtered = filtered.filter(q => q.year.toString() === selectedYear);
    }
    if (selectedType !== "all") {
      filtered = filtered.filter(q => q.type === selectedType);
    }

    const pyqListContainer = document.getElementById("pyq-cards-list");
    if (!pyqListContainer) return;

    if (filtered.length === 0) {
      pyqListContainer.innerHTML = `<div class="empty-state">No PYQs matching this filter. Try adjusting subject or year filters.</div>`;
      return;
    }

    pyqListContainer.innerHTML = filtered.map((q, idx) => {
      const attempt = Storage.getPyqAttempts()[q.id];
      return `
        <div class="pyq-card ${attempt ? (attempt.isCorrect ? 'border-success' : 'border-danger') : ''}" id="pyq-card-${q.id}">
          <div class="pyq-top-bar">
            <div>
              <span class="pyq-auth-tag">
                ${q.isAuthenticPYQ ? `🏛️ ${q.exam} (Official)` : `⚡ GATE-STYLE Practice Question`}
              </span>
              <span class="badge badge-neutral">${q.subjectName}</span>
              <span class="badge badge-accent">${q.type}</span>
            </div>
            <div class="pyq-meta-right">
              <span>+${q.marks} Mark${q.marks > 1 ? 's' : ''} | -${q.negativeMarks || 0} Neg</span>
              <span class="badge badge-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
            </div>
          </div>

          <div class="pyq-question-statement">
            ${q.question.replace(/\n/g, "<br>")}
          </div>

          <!-- Options / NAT Input -->
          <div class="pyq-interaction-box" id="pyq-interactive-${q.id}">
            ${q.type === 'MCQ' ? `
              <div class="options-vertical">
                ${q.options.map((opt, oIdx) => `
                  <label class="option-label">
                    <input type="radio" name="pyq_opt_${q.id}" value="${oIdx}" />
                    <span class="option-prefix">(${String.fromCharCode(65 + oIdx)})</span>
                    <span>${opt}</span>
                  </label>
                `).join('')}
              </div>
            ` : q.type === 'MSQ' ? `
              <div class="options-vertical">
                ${q.options.map((opt, oIdx) => `
                  <label class="option-label">
                    <input type="checkbox" name="pyq_msq_${q.id}" value="${oIdx}" />
                    <span class="option-prefix">(${String.fromCharCode(65 + oIdx)})</span>
                    <span>${opt}</span>
                  </label>
                `).join('')}
              </div>
            ` : `
              <div class="nat-box">
                <label>Enter Value:</label>
                <input type="number" step="any" id="pyq_nat_${q.id}" class="nat-input-field" placeholder="Numerical Answer" />
              </div>
            `}

            <!-- Learning Mode Buttons (Section 8) -->
            <div class="pyq-action-buttons">
              <button class="btn btn-secondary btn-sm" onclick="window.showPyqHint('${q.id}', 1)">💡 Hint 1</button>
              <button class="btn btn-secondary btn-sm" onclick="window.showPyqHint('${q.id}', 2)">🔍 Hint 2</button>
              <button class="btn btn-primary" onclick="window.submitPyq('${q.id}')">Submit Answer</button>
            </div>

            <!-- Hint Drawer -->
            <div class="hint-box hidden" id="hint-box-${q.id}"></div>
          </div>

          <!-- Detailed Solution & Mistake Classification Box -->
          <div class="pyq-solution-box ${attempt ? '' : 'hidden'}" id="pyq-sol-${q.id}">
            ${attempt ? renderPyqExplanationContent(q, attempt) : ''}
          </div>
        </div>
      `;
    }).join('');

    renderKaTeX(pyqListContainer);
  }

  container.innerHTML = `
    <div class="pyq-view-container">
      <div class="dash-card">
        <div class="dash-card-header">
          <div>
            <h2>Authentic GATE Previous Year Questions (PYQs)</h2>
            <p class="text-secondary">Official GATE questions with step-by-step mathematical reasoning, traps, and Socratic hints.</p>
          </div>
          <div class="pyq-accuracy-badge">
            <span>Overall PYQ Accuracy: <strong>${Analytics.getOverallPerformance().pyqAccuracy}%</strong></span>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="filter-controls-row">
          <div class="filter-group">
            <label>Subject:</label>
            <select id="pyq-filter-sub" class="form-control">
              <option value="all">All Subjects</option>
              ${SYLLABUS_DATA.map(s => `<option value="${s.id}" ${s.id === selectedSubject ? 'selected' : ''}>${s.name}</option>`).join('')}
            </select>
          </div>

          <div class="filter-group">
            <label>Exam Year:</label>
            <select id="pyq-filter-year" class="form-control">
              <option value="all">All Years</option>
              <option value="2024">GATE 2024</option>
              <option value="2023">GATE 2023</option>
              <option value="2022">GATE 2022</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Question Type:</label>
            <select id="pyq-filter-type" class="form-control">
              <option value="all">All Types</option>
              <option value="MCQ">MCQ (Multiple Choice)</option>
              <option value="MSQ">MSQ (Multiple Select)</option>
              <option value="NAT">NAT (Numerical)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- PYQs List -->
      <div id="pyq-cards-list" class="pyq-cards-stack"></div>
    </div>
  `;

  // Bind filter changes
  document.getElementById("pyq-filter-sub").onchange = (e) => {
    selectedSubject = e.target.value;
    filterAndRender();
  };
  document.getElementById("pyq-filter-year").onchange = (e) => {
    selectedYear = e.target.value;
    filterAndRender();
  };
  document.getElementById("pyq-filter-type").onchange = (e) => {
    selectedType = e.target.value;
    filterAndRender();
  };

  filterAndRender();

  // PYQ Hints & Submissions
  window.showPyqHint = (qId, hintNum) => {
    const q = PYQ_DATABASE.find(item => item.id === qId);
    const box = document.getElementById(`hint-box-${qId}`);
    if (!q || !box) return;
    box.classList.remove("hidden");
    const hintText = hintNum === 1 ? q.hint1 : q.hint2;
    box.innerHTML = `<strong>💡 Hint ${hintNum}:</strong> ${hintText || 'Break the problem down to definitions.'}`;
    renderKaTeX(box);
  };

  window.submitPyq = (qId) => {
    const q = PYQ_DATABASE.find(item => item.id === qId);
    if (!q) return;

    let userAns = null;
    let isCorrect = false;

    if (q.type === "MCQ") {
      const checked = document.querySelector(`input[name="pyq_opt_${q.id}"]:checked`);
      if (!checked) return alert("Please select an option first!");
      userAns = parseInt(checked.value);
      isCorrect = userAns === q.correctAnswer;
    } else if (q.type === "MSQ") {
      const checked = Array.from(document.querySelectorAll(`input[name="pyq_msq_${q.id}"]:checked`));
      if (checked.length === 0) return alert("Please select at least one option!");
      userAns = checked.map(cb => parseInt(cb.value));
      const sortedUser = [...userAns].sort();
      const sortedCorrect = [...q.correctAnswer].sort();
      isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
    } else if (q.type === "NAT") {
      const input = document.getElementById(`pyq_nat_${q.id}`);
      if (!input || input.value === "") return alert("Please enter your numerical answer!");
      userAns = parseFloat(input.value);
      isCorrect = userAns >= q.correctRange[0] && userAns <= q.correctRange[1];
    }

    const attempt = {
      questionId: q.id,
      subjectId: q.subjectId,
      subjectName: q.subjectName,
      topicName: q.topicName,
      question: q.question,
      userAnswer: userAns,
      correctAnswer: q.type === "MCQ" ? String.fromCharCode(65 + q.correctAnswer) : (q.officialAnswerText || JSON.stringify(q.correctAnswer)),
      isCorrect,
      conceptTested: q.explanation.conceptTested
    };

    Storage.savePyqAttempt(attempt);

    const solBox = document.getElementById(`pyq-sol-${q.id}`);
    if (solBox) {
      solBox.classList.remove("hidden");
      solBox.innerHTML = renderPyqExplanationContent(q, attempt);
      renderKaTeX(solBox);
    }
  };

  window.classifyMistake = (qId, reason) => {
    const attempts = Storage.getPyqAttempts();
    if (attempts[qId]) {
      attempts[qId].mistakeReason = reason;
      Storage.savePyqAttempt(attempts[qId]);
      alert(`Mistake classified as "${reason}". Added to Error Notebook for spaced revision!`);
      const classifyBox = document.getElementById(`classify-box-${qId}`);
      if (classifyBox) classifyBox.innerHTML = `<em>Classified: <strong>${reason}</strong></em>`;
    }
  };
}

function renderPyqExplanationContent(q, attempt) {
  const isCorrect = attempt.isCorrect;
  return `
    <div class="explanation-hero ${isCorrect ? 'sol-correct' : 'sol-wrong'}">
      <h4>${isCorrect ? '🎉 Correct Answer!' : '❌ Incorrect Attempt'}</h4>
      <div class="ans-summary">
        <span>Your Answer: <strong>${q.type === 'MCQ' ? String.fromCharCode(65 + attempt.userAnswer) : JSON.stringify(attempt.userAnswer)}</strong></span>
        <span>Official Correct Answer: <strong class="text-success">${q.type === 'MCQ' ? String.fromCharCode(65 + q.correctAnswer) : (q.officialAnswerText || JSON.stringify(q.correctAnswer))}</strong></span>
      </div>
    </div>

    ${!isCorrect ? `
      <!-- Mistake Classification Prompt (Section 8) -->
      <div class="mistake-classifier-box" id="classify-box-${q.id}">
        <strong>You got this wrong because:</strong>
        <div class="mistake-chips">
          <button class="m-chip" onclick="window.classifyMistake('${q.id}', 'Conceptual mistake')">🧠 Conceptual mistake</button>
          <button class="m-chip" onclick="window.classifyMistake('${q.id}', 'Calculation mistake')">🧮 Calculation mistake</button>
          <button class="m-chip" onclick="window.classifyMistake('${q.id}', 'Misread question')">👀 Misread question</button>
          <button class="m-chip" onclick="window.classifyMistake('${q.id}', 'Formula mistake')">📐 Formula mistake</button>
          <button class="m-chip" onclick="window.classifyMistake('${q.id}', 'Guess')">🎲 Pure Guess</button>
        </div>
      </div>
    ` : ''}

    <div class="sol-details">
      <h5>Step-by-Step Official Solution:</h5>
      <p>${renderFormattedContent(q.explanation.stepByStep)}</p>
      
      <h5>Concept Tested:</h5>
      <p><strong>${q.explanation.conceptTested}</strong></p>

      <h5>⚠️ Common GATE Trap:</h5>
      <p class="text-warning">${q.explanation.commonTrap || 'Be cautious of edge cases.'}</p>
    </div>
  `;
}

// -------------------------------------------------------------
// 5. MOCK TESTS VIEW (Sections 9, 10)
// -------------------------------------------------------------
function renderMockTestsView(container) {
  container.innerHTML = `
    <div class="mock-tests-view">
      <div class="dash-card">
        <div class="dash-card-header">
          <div>
            <h2>GATE CSE Official Mock Tests</h2>
            <p class="text-secondary">Simulate authentic exam pressure with exact GATE negative marking, question palettes, and scientific calculator.</p>
          </div>
          <span class="badge badge-accent">Exam Simulation</span>
        </div>

        <div class="mock-cards-grid">
          ${MOCK_TESTS_DATABASE.map(test => `
            <div class="mock-test-card">
              <div class="mock-card-top">
                <span class="badge badge-accent">${test.type}</span>
                <span class="mock-duration">⏱️ ${test.durationMinutes} Minutes</span>
              </div>
              <h3 class="mock-card-title">${test.title}</h3>
              <p class="mock-card-desc">${test.description}</p>
              
              <div class="mock-card-stats">
                <span>📝 ${test.totalQuestions} Questions</span>
                <span>🏆 ${test.totalMarks} Marks</span>
                <span>📉 Negative Marking</span>
              </div>

              <button class="btn btn-primary btn-block" onclick="window.startMockExam('${test.id}')">
                ▶ START MOCK EXAM
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  window.startMockExam = (testId) => {
    const test = MOCK_TESTS_DATABASE.find(t => t.id === testId);
    if (!test) return;
    const engine = new ExamEngine(test, (result) => {
      console.log("Exam finished:", result);
    });
    engine.start();
  };
}

// -------------------------------------------------------------
// 6. REVISION SYSTEM VIEW (Section 16)
// -------------------------------------------------------------
function renderRevisionView(container) {
  const schedule = Storage.getRevisionSchedule();

  container.innerHTML = `
    <div class="dash-card">
      <div class="dash-card-header">
        <div>
          <h2>Spaced Repetition & Revision System</h2>
          <p class="text-secondary">Automated scientifically scheduled revision intervals: 1 Day → 3 Days → 7 Days → 14 Days → 30 Days.</p>
        </div>
        <span class="badge badge-accent">Retention Optimizer</span>
      </div>

      <div class="revision-schedule-list">
        ${schedule.map(item => `
          <div class="rev-item-card ${item.completed ? 'rev-done' : ''}">
            <div class="rev-left">
              <span class="rev-check ${item.completed ? 'rev-checked' : ''}" onclick="window.toggleRevisionDone('${item.id}')">
                ${item.completed ? '✓' : '○'}
              </span>
              <div>
                <strong class="rev-title">${item.type}</strong>
                <div class="rev-meta">Topic: <code>${item.topicId}</code> | Due: <strong>${item.dueDate}</strong></div>
              </div>
            </div>
            <div class="rev-actions">
              ${item.completed ? `
                <span class="badge badge-success">Completed</span>
              ` : `
                <button class="btn btn-secondary btn-sm" onclick="window.openTopicLesson('${item.topicId}', 1, 0)">Revise Now ➔</button>
              `}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  window.toggleRevisionDone = (revId) => {
    Storage.markRevisionDone(revId);
    renderRevisionView(container);
  };
}

// -------------------------------------------------------------
// 7. GATE ERROR BOOK VIEW (Section 17)
// -------------------------------------------------------------
function renderErrorBookView(container) {
  const errors = Storage.getErrorBook();

  container.innerHTML = `
    <div class="dash-card">
      <div class="dash-card-header">
        <div>
          <h2>GATE Error Notebook</h2>
          <p class="text-secondary">Your personal weak-area repository. Automatically records every question you get wrong for focused correction.</p>
        </div>
        <span class="badge badge-danger">${errors.length} Mistakes Recorded</span>
      </div>

      ${errors.length === 0 ? `
        <div class="empty-state">
          🎉 Fantastic! No mistakes recorded yet. Attempt GATE PYQs and topic tests to diagnose any weaknesses.
        </div>
      ` : `
        <div class="error-items-stack">
          ${errors.map(err => `
            <div class="error-card ${err.resolved ? 'error-resolved' : ''}">
              <div class="error-card-top">
                <span class="badge badge-accent">${err.subjectName}</span>
                <span class="badge badge-danger">${err.mistakeReason}</span>
                <span class="error-date">Added: ${err.addedAt}</span>
              </div>
              <div class="error-q-statement">${err.question.replace(/\n/g, "<br>")}</div>
              <div class="error-comparison">
                <span>Your Answer: <strong class="text-danger">${err.userAnswer}</strong></span>
                <span>Correct Answer: <strong class="text-success">${err.correctAnswer}</strong></span>
              </div>
              <div class="error-footer-bar">
                <span>Concept: <em>${err.conceptTested}</em></span>
                <button class="btn btn-secondary btn-sm" onclick="window.router('pyqs')">Re-attempt in PYQs</button>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// -------------------------------------------------------------
// 8. FORMULA BOOK VIEW (Section 18)
// -------------------------------------------------------------
function renderFormulaBookView(container) {
  const formState = Storage.getFormulasState();

  container.innerHTML = `
    <div class="dash-card">
      <div class="dash-card-header">
        <div>
          <h2>GATE CSE Formula & Theorem Book</h2>
          <p class="text-secondary">High-yield formulas, variable definitions, application scenarios, and common GATE traps.</p>
        </div>
        <span class="badge badge-accent">${FORMULA_DATABASE.length} Formulas</span>
      </div>

      <div class="formula-search-bar">
        <input type="text" id="formula-search-input" class="form-control" placeholder="Search formulas by topic, theorem name, or subject..." />
      </div>

      <div class="formulas-grid" id="formulas-grid-container">
        ${renderFormulasList(FORMULA_DATABASE, formState)}
      </div>
    </div>
  `;

  document.getElementById("formula-search-input").oninput = (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = FORMULA_DATABASE.filter(f => 
      f.title.toLowerCase().includes(q) || 
      f.subjectName.toLowerCase().includes(q) || 
      f.topic.toLowerCase().includes(q)
    );
    const grid = document.getElementById("formulas-grid-container");
    if (grid) {
      grid.innerHTML = renderFormulasList(filtered, Storage.getFormulasState());
      renderKaTeX(grid);
    }
  };

  window.toggleBookmarkFormula = (fId) => {
    Storage.toggleFormulaBookmark(fId);
    renderFormulaBookView(container);
  };
}

function renderFormulasList(list, state) {
  return list.map(f => {
    const isBookmarked = state.bookmarked?.[f.id];
    return `
      <div class="formula-card">
        <div class="formula-card-top">
          <span class="badge badge-neutral">${f.subjectName}</span>
          <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" onclick="window.toggleBookmarkFormula('${f.id}')">
            ${isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
          </button>
        </div>
        <h4 class="formula-title">${f.title}</h4>
        <div class="formula-math-display">
          $$${f.formula}$$
        </div>
        
        <div class="formula-variables">
          <strong>Variables:</strong>
          <ul>
            ${f.variables.map(v => `<li><code>$${v.name}$</code>: ${v.meaning}</li>`).join('')}
          </ul>
        </div>

        <div class="formula-usage">
          <strong>When to use:</strong> ${f.whenToUse}
        </div>

        <div class="formula-trap">
          ⚠️ <strong>Common GATE Trap:</strong> ${f.commonTrap}
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// 9. PERFORMANCE ANALYTICS VIEW (Section 11)
// -------------------------------------------------------------
function renderAnalyticsView(container) {
  const perf = Analytics.getOverallPerformance();
  const subStats = Analytics.getSubjectAccuracyMap();

  container.innerHTML = `
    <div class="analytics-view">
      <!-- Accuracy & High Level Gauges -->
      <div class="grid-3-col">
        <div class="dash-card text-center">
          <h4 class="text-secondary">Overall Accuracy</h4>
          <div class="big-metric-text text-success">${perf.overallAccuracy}%</div>
          <p class="text-secondary">PYQs + Mock Tests Combined</p>
        </div>
        <div class="dash-card text-center">
          <h4 class="text-secondary">Study Streak</h4>
          <div class="big-metric-text text-accent">🔥 ${perf.currentStreak} Days</div>
          <p class="text-secondary">Best Consistency: ${perf.bestStreak} Days</p>
        </div>
        <div class="dash-card text-center">
          <h4 class="text-secondary">Syllabus Progress</h4>
          <div class="big-metric-text text-primary">${perf.syllabusPercent}%</div>
          <p class="text-secondary">${perf.completedTopicsCount} of ${perf.totalTopicsCount} Topics Mastered</p>
        </div>
      </div>

      <!-- Subject Accuracy Bars -->
      <div class="dash-card">
        <div class="dash-card-header">
          <h3>Subject-Wise Performance & Accuracy</h3>
          <span class="badge badge-accent">Accuracy Tracking</span>
        </div>

        <div class="subject-bars-list">
          ${Object.values(subStats).map(s => `
            <div class="subj-bar-row">
              <div class="subj-bar-meta">
                <span>${s.name}</span>
                <strong>${s.accuracy}%</strong>
              </div>
              <div class="progress-track">
                <div class="progress-fill ${s.accuracy >= 75 ? 'fill-green' : s.accuracy >= 50 ? 'fill-yellow' : 'fill-red'}" style="width: ${s.accuracy}%"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Mistake Analysis & Topic Heatmap -->
      <div class="grid-2-col">
        <div class="dash-card">
          <div class="dash-card-header">
            <h3>Mistake Distribution</h3>
            <span class="badge badge-danger">Error Breakdown</span>
          </div>
          <div class="mistake-analysis-list">
            ${Object.entries(perf.mistakeBreakdown).map(([reason, count]) => `
              <div class="mistake-row">
                <span>${reason}</span>
                <span class="badge ${count > 0 ? 'badge-danger' : 'badge-neutral'}">${count}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="dash-card">
          <div class="dash-card-header">
            <h3>Topic Heatmap</h3>
            <span class="badge badge-success">Readiness Matrix</span>
          </div>
          <div class="heatmap-legend">
            <span>🟢 Strong ($\\ge 80\\%$)</span>
            <span>🟡 Needs Revision ($50-79\\%$)</span>
            <span>🔴 Weak ($<50\\%$)</span>
          </div>
          <div class="heatmap-grid">
            <div class="heatmap-cell cell-green">Logic</div>
            <div class="heatmap-cell cell-green">K-Maps</div>
            <div class="heatmap-cell cell-yellow">Pipelining</div>
            <div class="heatmap-cell cell-yellow">CPU Scheduling</div>
            <div class="heatmap-cell cell-green">Binary Search</div>
            <div class="heatmap-cell cell-red">AVL Trees</div>
            <div class="heatmap-cell cell-yellow">Cache Mapping</div>
            <div class="heatmap-cell cell-red">B+ Trees</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// KaTeX Helper
function renderKaTeX(domElement) {
  if (window.renderMathInElement && domElement) {
    window.renderMathInElement(domElement, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ],
      throwOnError: false
    });
  }
}

// Launch on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});
