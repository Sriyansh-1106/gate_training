/**
 * GATE CSE 2027 Storage & State Manager
 * Persistent state across sessions via localStorage with export/import capabilities
 */

const STORAGE_KEYS = {
  USER_PROFILE: "gate2027_profile",
  PROGRESS: "gate2027_progress",
  PYQ_ATTEMPTS: "gate2027_pyq_attempts",
  MOCK_RESULTS: "gate2027_mock_results",
  ERROR_BOOK: "gate2027_error_book",
  FORMULA_STATE: "gate2027_formulas",
  REVISION_SCHEDULE: "gate2027_revision",
  DAILY_LOGS: "gate2027_daily_logs",
  CUSTOM_CONTENT: "gate2027_custom_content"
};

export const START_DATE = new Date("2026-10-01T00:00:00");
export const GATE_2027_DATE = new Date("2027-02-06T09:30:00");

export const Storage = {
  getProfile() {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!raw) {
      const defaultProfile = {
        name: "GATE Aspirant",
        targetExam: "GATE CSE 2027",
        startDate: "2026-10-01",
        targetDate: "2027-02-06",
        currentStreak: 1,
        bestStreak: 1,
        lastStudyDate: new Date().toISOString().split("T")[0],
        totalStudyMinutes: 192, // ~3.2 hours initial Day 1 progress
        level: "Level 0: Absolute Beginner",
        onboarded: true
      };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(defaultProfile));
      return defaultProfile;
    }
    return JSON.parse(raw);
  },

  saveProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  },

  getProgress() {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) {
      // Initialize with Day 1 initial step in Discrete Mathematics Logic
      const initialProgress = {
        completedTopics: {},
        unlockedTopics: { "em-discrete-logic": true },
        topicLevels: { "em-discrete-logic": 0 },
        topicSteps: { "em-discrete-logic": 3 }, // In progress on Step 3
        activeTopicId: "em-discrete-logic"
      };
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(initialProgress));
      return initialProgress;
    }
    return JSON.parse(raw);
  },

  saveProgress(progress) {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },

  updateTopicProgress(topicId, stepIndex, level = 0) {
    const progress = this.getProgress();
    if (!progress.topicSteps) progress.topicSteps = {};
    if (!progress.topicLevels) progress.topicLevels = {};
    if (!progress.completedTopics) progress.completedTopics = {};

    progress.topicSteps[topicId] = Math.max(progress.topicSteps[topicId] || 0, stepIndex);
    progress.topicLevels[topicId] = Math.max(progress.topicLevels[topicId] || 0, level);

    if (stepIndex >= 6) {
      progress.completedTopics[topicId] = true;
      // Schedule spaced revision
      this.scheduleRevision(topicId);
    }
    this.saveProgress(progress);
    this.recordActivity();
  },

  getPyqAttempts() {
    const raw = localStorage.getItem(STORAGE_KEYS.PYQ_ATTEMPTS);
    return raw ? JSON.parse(raw) : {};
  },

  savePyqAttempt(attempt) {
    const attempts = this.getPyqAttempts();
    attempts[attempt.questionId] = {
      ...attempt,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.PYQ_ATTEMPTS, JSON.stringify(attempts));

    // If incorrect, automatically add to Error Book
    if (!attempt.isCorrect) {
      this.addToErrorBook({
        questionId: attempt.questionId,
        subjectId: attempt.subjectId,
        subjectName: attempt.subjectName,
        topicName: attempt.topicName,
        question: attempt.question,
        userAnswer: attempt.userAnswer,
        correctAnswer: attempt.correctAnswer,
        mistakeReason: attempt.mistakeReason || "Conceptual mistake",
        conceptTested: attempt.conceptTested || "Core concept",
        date: new Date().toLocaleDateString()
      });
    }

    this.recordActivity();
  },

  getErrorBook() {
    const raw = localStorage.getItem(STORAGE_KEYS.ERROR_BOOK);
    return raw ? JSON.parse(raw) : [];
  },

  addToErrorBook(errorEntry) {
    const book = this.getErrorBook();
    const existingIndex = book.findIndex(e => e.questionId === errorEntry.questionId);
    if (existingIndex >= 0) {
      book[existingIndex].repeatCount = (book[existingIndex].repeatCount || 1) + 1;
      book[existingIndex].lastAttemptDate = new Date().toLocaleDateString();
      book[existingIndex].mistakeReason = errorEntry.mistakeReason;
    } else {
      book.unshift({
        ...errorEntry,
        repeatCount: 1,
        resolved: false,
        addedAt: new Date().toLocaleDateString()
      });
    }
    localStorage.setItem(STORAGE_KEYS.ERROR_BOOK, JSON.stringify(book));
  },

  resolveError(questionId) {
    const book = this.getErrorBook();
    const item = book.find(e => e.questionId === questionId);
    if (item) {
      item.resolved = true;
      localStorage.setItem(STORAGE_KEYS.ERROR_BOOK, JSON.stringify(book));
    }
  },

  getMockResults() {
    const raw = localStorage.getItem(STORAGE_KEYS.MOCK_RESULTS);
    return raw ? JSON.parse(raw) : [];
  },

  saveMockResult(result) {
    const results = this.getMockResults();
    results.unshift({
      ...result,
      id: "res-" + Date.now(),
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(STORAGE_KEYS.MOCK_RESULTS, JSON.stringify(results));
    this.recordActivity();
  },

  getFormulasState() {
    const raw = localStorage.getItem(STORAGE_KEYS.FORMULA_STATE);
    return raw ? JSON.parse(raw) : { bookmarked: {}, learned: {} };
  },

  toggleFormulaBookmark(formulaId) {
    const state = this.getFormulasState();
    state.bookmarked[formulaId] = !state.bookmarked[formulaId];
    localStorage.setItem(STORAGE_KEYS.FORMULA_STATE, JSON.stringify(state));
    return state.bookmarked[formulaId];
  },

  toggleFormulaLearned(formulaId) {
    const state = this.getFormulasState();
    state.learned[formulaId] = !state.learned[formulaId];
    localStorage.setItem(STORAGE_KEYS.FORMULA_STATE, JSON.stringify(state));
    return state.learned[formulaId];
  },

  scheduleRevision(topicId) {
    const raw = localStorage.getItem(STORAGE_KEYS.REVISION_SCHEDULE);
    const schedule = raw ? JSON.parse(raw) : [];
    const now = new Date();
    
    // Spaced intervals: 1d -> 3d -> 7d -> 14d -> 30d
    const intervals = [
      { days: 1, type: "Quick Revision (Key Concepts)" },
      { days: 3, type: "Practice 5 Target Questions" },
      { days: 7, type: "10-Question High-Yield Drill" },
      { days: 14, type: "Topic Mini-Mock Review" },
      { days: 30, type: "Mixed GATE PYQ Retention Test" }
    ];

    intervals.forEach(inv => {
      const revDate = new Date(now.getTime() + inv.days * 24 * 60 * 60 * 1000);
      schedule.push({
        id: `rev-${topicId}-${inv.days}`,
        topicId,
        days: inv.days,
        type: inv.type,
        dueDate: revDate.toISOString().split("T")[0],
        completed: false
      });
    });

    localStorage.setItem(STORAGE_KEYS.REVISION_SCHEDULE, JSON.stringify(schedule));
  },

  getRevisionSchedule() {
    const raw = localStorage.getItem(STORAGE_KEYS.REVISION_SCHEDULE);
    return raw ? JSON.parse(raw) : [
      {
        id: "rev-init-1",
        topicId: "em-discrete-logic",
        type: "Day 1 Logic Review: Implication and Truth Tables",
        dueDate: new Date().toISOString().split("T")[0],
        completed: false
      }
    ];
  },

  markRevisionDone(revId) {
    const schedule = this.getRevisionSchedule();
    const item = schedule.find(s => s.id === revId);
    if (item) {
      item.completed = true;
      localStorage.setItem(STORAGE_KEYS.REVISION_SCHEDULE, JSON.stringify(schedule));
    }
  },

  recordActivity() {
    const profile = this.getProfile();
    const today = new Date().toISOString().split("T")[0];
    if (profile.lastStudyDate !== today) {
      profile.currentStreak += 1;
      profile.bestStreak = Math.max(profile.bestStreak, profile.currentStreak);
      profile.lastStudyDate = today;
      this.saveProfile(profile);
    }
  },

  exportDatabaseJSON() {
    const fullBackup = {};
    for (const [key, storageKey] of Object.entries(STORAGE_KEYS)) {
      fullBackup[key] = localStorage.getItem(storageKey);
    }
    return JSON.stringify(fullBackup, null, 2);
  },

  importDatabaseJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      for (const [key, storageKey] of Object.entries(STORAGE_KEYS)) {
        if (data[key]) {
          localStorage.setItem(storageKey, data[key]);
        }
      }
      return true;
    } catch (e) {
      console.error("Failed to import database:", e);
      return false;
    }
  }
};
