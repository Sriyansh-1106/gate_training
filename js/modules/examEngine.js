/**
 * GATE CSE Official Exam Simulation Engine
 * Handles Question Palette, Virtual Scientific Calculator, Timer, and Comprehensive Analytics
 */

import { Storage } from "./storage.js";

export class ExamEngine {
  constructor(testData, onFinishCallback) {
    this.testData = testData;
    this.onFinish = onFinishCallback;
    this.currentIndex = 0;
    this.answers = {}; // qId -> answer (number, array, or string)
    this.status = {};  // qId -> 'answered' | 'not-answered' | 'marked' | 'marked-answered' | 'not-visited'
    this.startTime = Date.now();
    this.durationSeconds = testData.durationMinutes * 60;
    this.remainingSeconds = this.durationSeconds;
    this.timerInterval = null;

    // Initialize all as not-visited except first as not-answered
    testData.questions.forEach((q, idx) => {
      this.status[q.id] = idx === 0 ? "not-answered" : "not-visited";
    });
  }

  start() {
    this.renderExamInterface();
    this.startTimer();
    this.loadQuestion(0);
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.remainingSeconds--;
      this.updateTimerDisplay();

      if (this.remainingSeconds <= 0) {
        clearInterval(this.timerInterval);
        alert("Time is up! Submitting exam automatically.");
        this.submitExam();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const el = document.getElementById("exam-timer-text");
    if (!el) return;
    const hrs = Math.floor(this.remainingSeconds / 3600);
    const mins = Math.floor((this.remainingSeconds % 3600) / 60);
    const secs = this.remainingSeconds % 60;
    const str = `${hrs > 0 ? hrs + ":" : ""}${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    el.textContent = str;
    if (this.remainingSeconds < 300) {
      el.style.color = "#ef4444";
    }
  }

  renderExamInterface() {
    const mainContainer = document.getElementById("app-content");
    mainContainer.innerHTML = `
      <div class="exam-container">
        <!-- Exam Top Header -->
        <header class="exam-header">
          <div class="exam-meta">
            <h2 class="exam-title">${this.testData.title}</h2>
            <span class="badge badge-accent">${this.testData.type}</span>
          </div>
          <div class="exam-actions">
            <button id="exam-calc-trigger" class="btn btn-secondary">
              🧮 GATE Scientific Calculator
            </button>
            <div class="exam-timer">
              <span>Time Left: </span>
              <strong id="exam-timer-text">--:--</strong>
            </div>
            <button id="exam-submit-btn" class="btn btn-danger">
              Submit Test
            </button>
          </div>
        </header>

        <!-- Exam Workspace: Question Area + Palette -->
        <div class="exam-grid">
          <!-- Main Question Area -->
          <div class="exam-main-panel">
            <div class="question-header-bar">
              <span id="exam-q-number" class="q-badge">Question 1</span>
              <span id="exam-q-marks" class="q-marks-badge">+1 Mark | -0.33 Neg</span>
              <span id="exam-q-type" class="q-type-badge">MCQ</span>
            </div>

            <div class="question-body" id="exam-q-body">
              <!-- Rendered Question Text -->
            </div>

            <div class="question-options" id="exam-q-options">
              <!-- Rendered Options -->
            </div>

            <!-- Bottom Question Controls -->
            <div class="exam-footer-controls">
              <div>
                <button id="exam-mark-btn" class="btn btn-warning">Mark for Review & Next</button>
                <button id="exam-clear-btn" class="btn btn-secondary">Clear Response</button>
              </div>
              <div>
                <button id="exam-prev-btn" class="btn btn-secondary">Previous</button>
                <button id="exam-next-btn" class="btn btn-primary">Save & Next</button>
              </div>
            </div>
          </div>

          <!-- Right Sidebar: Question Palette & Legend -->
          <div class="exam-sidebar">
            <div class="palette-legend">
              <div class="legend-item"><span class="legend-dot dot-answered"></span> Answered</div>
              <div class="legend-item"><span class="legend-dot dot-not-answered"></span> Not Answered</div>
              <div class="legend-item"><span class="legend-dot dot-not-visited"></span> Not Visited</div>
              <div class="legend-item"><span class="legend-dot dot-marked"></span> Marked for Review</div>
              <div class="legend-item"><span class="legend-dot dot-marked-answered"></span> Ans & Marked</div>
            </div>

            <h4 class="palette-heading">Question Palette (${this.testData.questions.length} Questions)</h4>
            <div class="palette-grid" id="exam-palette-grid">
              <!-- Question Bubbles -->
            </div>
          </div>
        </div>
      </div>

      <!-- GATE Scientific Calculator Modal -->
      <div id="gate-calc-modal" class="modal-overlay hidden">
        <div class="calc-modal-box">
          <div class="calc-header">
            <h4>Official GATE Scientific Calculator</h4>
            <button id="close-calc-modal" class="close-btn">&times;</button>
          </div>
          <div class="calc-body">
            <input type="text" id="calc-display" class="calc-input" readonly value="0" />
            <div class="calc-keys-grid">
              <button class="c-key" onclick="window.calcOp('deg')">Deg</button>
              <button class="c-key" onclick="window.calcOp('sin')">sin</button>
              <button class="c-key" onclick="window.calcOp('cos')">cos</button>
              <button class="c-key" onclick="window.calcOp('tan')">tan</button>
              <button class="c-key c-fn" onclick="window.calcOp('clear')">C</button>
              
              <button class="c-key" onclick="window.calcOp('ln')">ln</button>
              <button class="c-key" onclick="window.calcOp('log')">log10</button>
              <button class="c-key" onclick="window.calcOp('sqrt')">√x</button>
              <button class="c-key" onclick="window.calcOp('pow')">x^y</button>
              <button class="c-key c-fn" onclick="window.calcOp('back')">⌫</button>

              <button class="c-key" onclick="window.calcNum('7')">7</button>
              <button class="c-key" onclick="window.calcNum('8')">8</button>
              <button class="c-key" onclick="window.calcNum('9')">9</button>
              <button class="c-key" onclick="window.calcOp('/')">÷</button>
              <button class="c-key" onclick="window.calcOp('pi')">π</button>

              <button class="c-key" onclick="window.calcNum('4')">4</button>
              <button class="c-key" onclick="window.calcNum('5')">5</button>
              <button class="c-key" onclick="window.calcNum('6')">6</button>
              <button class="c-key" onclick="window.calcOp('*')">×</button>
              <button class="c-key" onclick="window.calcOp('fact')">n!</button>

              <button class="c-key" onclick="window.calcNum('1')">1</button>
              <button class="c-key" onclick="window.calcNum('2')">2</button>
              <button class="c-key" onclick="window.calcNum('3')">3</button>
              <button class="c-key" onclick="window.calcOp('-')">-</button>
              <button class="c-key" onclick="window.calcOp('1/x')">1/x</button>

              <button class="c-key" onclick="window.calcNum('0')">0</button>
              <button class="c-key" onclick="window.calcNum('.')">.</button>
              <button class="c-key" onclick="window.calcOp('+')">+</button>
              <button class="c-key c-equal" onclick="window.calcEquals()">=</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.renderPalette();
  }

  bindEvents() {
    document.getElementById("exam-calc-trigger").onclick = () => {
      document.getElementById("gate-calc-modal").classList.remove("hidden");
    };
    document.getElementById("close-calc-modal").onclick = () => {
      document.getElementById("gate-calc-modal").classList.add("hidden");
    };

    document.getElementById("exam-submit-btn").onclick = () => {
      if (confirm("Are you sure you want to submit the exam?")) {
        clearInterval(this.timerInterval);
        this.submitExam();
      }
    };

    document.getElementById("exam-next-btn").onclick = () => {
      this.saveCurrentResponse();
      if (this.currentIndex < this.testData.questions.length - 1) {
        this.loadQuestion(this.currentIndex + 1);
      }
    };

    document.getElementById("exam-prev-btn").onclick = () => {
      this.saveCurrentResponse();
      if (this.currentIndex > 0) {
        this.loadQuestion(this.currentIndex - 1);
      }
    };

    document.getElementById("exam-clear-btn").onclick = () => {
      const q = this.testData.questions[this.currentIndex];
      delete this.answers[q.id];
      this.status[q.id] = "not-answered";
      this.loadQuestion(this.currentIndex);
      this.renderPalette();
    };

    document.getElementById("exam-mark-btn").onclick = () => {
      this.saveCurrentResponse();
      const q = this.testData.questions[this.currentIndex];
      const hasAnswer = this.answers[q.id] !== undefined && this.answers[q.id] !== "";
      this.status[q.id] = hasAnswer ? "marked-answered" : "marked";
      this.renderPalette();
      if (this.currentIndex < this.testData.questions.length - 1) {
        this.loadQuestion(this.currentIndex + 1);
      }
    };

    // Global Calculator Logic
    window.calcDisplayVal = "0";
    window.calcNum = (num) => {
      if (window.calcDisplayVal === "0") window.calcDisplayVal = num;
      else window.calcDisplayVal += num;
      document.getElementById("calc-display").value = window.calcDisplayVal;
    };
    window.calcOp = (op) => {
      if (op === "clear") window.calcDisplayVal = "0";
      else if (op === "back") window.calcDisplayVal = window.calcDisplayVal.slice(0, -1) || "0";
      else if (op === "sqrt") window.calcDisplayVal = Math.sqrt(eval(window.calcDisplayVal)).toString();
      else if (op === "sin") window.calcDisplayVal = Math.sin(eval(window.calcDisplayVal) * Math.PI / 180).toFixed(6).toString();
      else if (op === "cos") window.calcDisplayVal = Math.cos(eval(window.calcDisplayVal) * Math.PI / 180).toFixed(6).toString();
      else if (op === "tan") window.calcDisplayVal = Math.tan(eval(window.calcDisplayVal) * Math.PI / 180).toFixed(6).toString();
      else if (op === "ln") window.calcDisplayVal = Math.log(eval(window.calcDisplayVal)).toFixed(6).toString();
      else if (op === "log") window.calcDisplayVal = Math.log10(eval(window.calcDisplayVal)).toFixed(6).toString();
      else if (op === "pi") window.calcDisplayVal = Math.PI.toString();
      else window.calcDisplayVal += " " + op + " ";
      document.getElementById("calc-display").value = window.calcDisplayVal;
    };
    window.calcEquals = () => {
      try {
        window.calcDisplayVal = eval(window.calcDisplayVal).toString();
      } catch (e) {
        window.calcDisplayVal = "Error";
      }
      document.getElementById("calc-display").value = window.calcDisplayVal;
    };
  }

  saveCurrentResponse() {
    const q = this.testData.questions[this.currentIndex];
    if (q.type === "MCQ") {
      const selected = document.querySelector(`input[name="q_option"]:checked`);
      if (selected) {
        this.answers[q.id] = parseInt(selected.value);
        if (this.status[q.id] !== "marked") this.status[q.id] = "answered";
      }
    } else if (q.type === "MSQ") {
      const checkedBoxes = Array.from(document.querySelectorAll(`input[name="q_option_msq"]:checked`));
      if (checkedBoxes.length > 0) {
        this.answers[q.id] = checkedBoxes.map(cb => parseInt(cb.value));
        if (this.status[q.id] !== "marked") this.status[q.id] = "answered";
      }
    } else if (q.type === "NAT") {
      const val = document.getElementById("nat-input")?.value?.trim();
      if (val !== undefined && val !== "") {
        this.answers[q.id] = parseFloat(val);
        if (this.status[q.id] !== "marked") this.status[q.id] = "answered";
      }
    }
    this.renderPalette();
  }

  loadQuestion(index) {
    this.currentIndex = index;
    const q = this.testData.questions[index];

    if (this.status[q.id] === "not-visited") {
      this.status[q.id] = "not-answered";
    }

    document.getElementById("exam-q-number").textContent = `Question ${index + 1} of ${this.testData.questions.length}`;
    document.getElementById("exam-q-marks").textContent = `+${q.marks} Mark${q.marks > 1 ? "s" : ""} | -${q.negativeMarks || 0} Neg`;
    document.getElementById("exam-q-type").textContent = q.type;

    // Body
    document.getElementById("exam-q-body").innerHTML = `
      <div class="q-text-content">${this.formatMathAndText(q.question)}</div>
    `;

    // Options
    const optContainer = document.getElementById("exam-q-options");
    optContainer.innerHTML = "";

    const userAns = this.answers[q.id];

    if (q.type === "MCQ") {
      q.options.forEach((opt, optIdx) => {
        const isChecked = userAns === optIdx;
        optContainer.innerHTML += `
          <label class="option-label ${isChecked ? 'option-selected' : ''}">
            <input type="radio" name="q_option" value="${optIdx}" ${isChecked ? 'checked' : ''} />
            <span class="option-prefix">(${String.fromCharCode(65 + optIdx)})</span>
            <span class="option-text">${this.formatMathAndText(opt)}</span>
          </label>
        `;
      });
    } else if (q.type === "MSQ") {
      const checkedArr = Array.isArray(userAns) ? userAns : [];
      q.options.forEach((opt, optIdx) => {
        const isChecked = checkedArr.includes(optIdx);
        optContainer.innerHTML += `
          <label class="option-label ${isChecked ? 'option-selected' : ''}">
            <input type="checkbox" name="q_option_msq" value="${optIdx}" ${isChecked ? 'checked' : ''} />
            <span class="option-prefix">(${String.fromCharCode(65 + optIdx)})</span>
            <span class="option-text">${this.formatMathAndText(opt)}</span>
          </label>
        `;
      });
    } else if (q.type === "NAT") {
      optContainer.innerHTML = `
        <div class="nat-box">
          <label>Enter Numerical Answer:</label>
          <input type="number" step="any" id="nat-input" class="nat-input-field" value="${userAns !== undefined ? userAns : ''}" placeholder="e.g. 42.5" />
        </div>
      `;
    }

    // Prev / Next button state
    document.getElementById("exam-prev-btn").disabled = index === 0;
    this.renderPalette();
    this.renderMath();
  }

  renderPalette() {
    const grid = document.getElementById("exam-palette-grid");
    if (!grid) return;
    grid.innerHTML = "";
    this.testData.questions.forEach((q, idx) => {
      const bubble = document.createElement("button");
      bubble.className = `palette-bubble bubble-${this.status[q.id] || 'not-visited'} ${idx === this.currentIndex ? 'bubble-current' : ''}`;
      bubble.textContent = idx + 1;
      bubble.onclick = () => {
        this.saveCurrentResponse();
        this.loadQuestion(idx);
      };
      grid.appendChild(bubble);
    });
  }

  submitExam() {
    this.saveCurrentResponse();
    const timeSpentSeconds = this.durationSeconds - this.remainingSeconds;

    let totalScore = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    const weakTopicsMap = {};
    const strongTopicsMap = {};

    const evaluatedQuestions = this.testData.questions.map(q => {
      const userAns = this.answers[q.id];
      let isCorrect = false;
      let scoreAwarded = 0;

      if (userAns === undefined || userAns === "") {
        unattemptedCount++;
      } else {
        if (q.type === "MCQ") {
          isCorrect = userAns === q.correctAnswer;
        } else if (q.type === "MSQ") {
          const sortedUser = Array.isArray(userAns) ? [...userAns].sort() : [];
          const sortedCorrect = [...q.correctAnswer].sort();
          isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
        } else if (q.type === "NAT") {
          const [min, max] = q.correctRange;
          isCorrect = userAns >= min && userAns <= max;
        }

        if (isCorrect) {
          correctCount++;
          scoreAwarded = q.marks;
          totalScore += scoreAwarded;
          strongTopicsMap[q.topic || "Core"] = (strongTopicsMap[q.topic || "Core"] || 0) + 1;
        } else {
          incorrectCount++;
          scoreAwarded = -(q.negativeMarks || 0);
          totalScore += scoreAwarded;
          weakTopicsMap[q.topic || "Core"] = (weakTopicsMap[q.topic || "Core"] || 0) + 1;
        }
      }

      return {
        ...q,
        userAns,
        isCorrect,
        scoreAwarded
      };
    });

    const attemptedCount = correctCount + incorrectCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    totalScore = Math.max(0, Math.round(totalScore * 100) / 100);

    const result = {
      testId: this.testData.id,
      testTitle: this.testData.title,
      totalScore,
      maxMarks: this.testData.totalMarks,
      totalQuestions: this.testData.questions.length,
      correctCount,
      incorrectCount,
      unattemptedCount,
      accuracy,
      timeSpentSeconds,
      weakTopics: Object.keys(weakTopicsMap),
      strongTopics: Object.keys(strongTopicsMap),
      evaluatedQuestions
    };

    Storage.saveMockResult(result);
    this.renderResultScreen(result);
    if (this.onFinish) this.onFinish(result);
  }

  renderResultScreen(res) {
    const mainContainer = document.getElementById("app-content");
    const mins = Math.floor(res.timeSpentSeconds / 60);
    const secs = res.timeSpentSeconds % 60;

    mainContainer.innerHTML = `
      <div class="result-report-card">
        <div class="result-hero">
          <div class="result-hero-text">
            <h2>Mock Test Analysis Report</h2>
            <p class="text-secondary">${res.testTitle}</p>
          </div>
          <div class="result-badge-container">
            <div class="score-circle">
              <span class="score-num">${res.totalScore}</span>
              <span class="score-total">/ ${res.maxMarks}</span>
            </div>
          </div>
        </div>

        <div class="result-metrics-grid">
          <div class="metric-card">
            <span class="metric-label">Accuracy</span>
            <span class="metric-val text-success">${res.accuracy}%</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Time Taken</span>
            <span class="metric-val">${mins}m ${secs}s</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Correct</span>
            <span class="metric-val text-success">${res.correctCount}</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Incorrect</span>
            <span class="metric-val text-danger">${res.incorrectCount}</span>
          </div>
          <div class="metric-card">
            <span class="metric-label">Unattempted</span>
            <span class="metric-val text-neutral">${res.unattemptedCount}</span>
          </div>
        </div>

        <div class="recommendations-box">
          <h4>🎯 AI Tutor Diagnostic & Next Steps</h4>
          ${res.weakTopics.length > 0 ? `
            <p><strong>Identified Weak Concepts:</strong> ${res.weakTopics.join(", ")}</p>
            <p class="text-warning">👉 <em>Recommendation:</em> Revise these topics and check your <strong>Error Notebook</strong> before taking the next test.</p>
          ` : `
            <p class="text-success">🎉 Excellent conceptual clarity! No critical weak areas detected. You are ready to advance to higher difficulty levels.</p>
          `}
        </div>

        <div class="solutions-review-header">
          <h3>Question-by-Question Detailed Solutions</h3>
        </div>

        <div class="review-questions-list">
          ${res.evaluatedQuestions.map((q, idx) => `
            <div class="review-q-card ${q.isCorrect ? 'border-success' : q.userAns !== undefined ? 'border-danger' : 'border-neutral'}">
              <div class="review-q-meta">
                <span>Q${idx + 1} (${q.type} - ${q.marks} Marks)</span>
                <span class="badge ${q.isCorrect ? 'badge-success' : q.userAns !== undefined ? 'badge-danger' : 'badge-neutral'}">
                  ${q.isCorrect ? 'Correct (+'+q.marks+')' : q.userAns !== undefined ? 'Incorrect (-'+q.negativeMarks+')' : 'Not Attempted (0)'}
                </span>
              </div>
              <div class="review-q-text">${this.formatMathAndText(q.question)}</div>
              <div class="review-ans-row">
                <span>Your Answer: <strong>${q.userAns !== undefined ? (typeof q.userAns === 'number' && q.type === 'MCQ' ? String.fromCharCode(65 + q.userAns) : JSON.stringify(q.userAns)) : 'None'}</strong></span>
                <span>Correct Answer: <strong class="text-success">${q.type === 'MCQ' ? String.fromCharCode(65 + q.correctAnswer) : (q.officialAnswerText || JSON.stringify(q.correctAnswer))}</strong></span>
              </div>
              <div class="review-explanation-box">
                <h5>Detailed Official Explanation:</h5>
                <p>${q.explanation || 'Refer to standard syllabus definition.'}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="result-actions-footer">
          <button class="btn btn-primary" onclick="window.router('dashboard')">Back to Dashboard</button>
          <button class="btn btn-secondary" onclick="window.router('errorBook')">Review in Error Book</button>
        </div>
      </div>
    `;

    this.renderMath();
  }

  formatMathAndText(text) {
    if (!text) return "";
    return text.replace(/\n/g, "<br>");
  }

  renderMath() {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ]
      });
    }
  }
}
